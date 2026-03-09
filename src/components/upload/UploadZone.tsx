'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
}

interface UploadZoneProps {
  onUpload?: (files: File[]) => void;
  maxFiles?: number;
  className?: string;
}

export function UploadZone({ onUpload, maxFiles = 10, className = "" }: UploadZoneProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const timersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  // Clean up timers and object URLs on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach(id => clearTimeout(id));
      timersRef.current.forEach(id => clearInterval(id));
      uploadedFiles.forEach(f => URL.revokeObjectURL(f.preview));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDrop = useCallback((acceptedFiles: File[], rejections: FileRejection[]) => {
    setErrorMessage(null);

    // Handle rejected files
    if (rejections.length > 0) {
      const reasons = rejections.map(r => {
        const name = r.file.name;
        const codes = r.errors.map(e => e.code);
        if (codes.includes('file-too-large')) return `${name}: exceeds 10MB limit`;
        if (codes.includes('file-invalid-type')) return `${name}: unsupported file type`;
        return `${name}: rejected`;
      });
      setErrorMessage(reasons.join('. '));
    }

    // Enforce cumulative maxFiles limit
    const slotsAvailable = maxFiles - uploadedFiles.length;
    if (slotsAvailable <= 0) {
      setErrorMessage(`Maximum of ${maxFiles} files reached. Remove some files first.`);
      return;
    }
    const filesToAdd = acceptedFiles.slice(0, slotsAvailable);
    if (filesToAdd.length < acceptedFiles.length) {
      setErrorMessage(prev => 
        [prev, `Only ${filesToAdd.length} of ${acceptedFiles.length} files added (limit: ${maxFiles}).`].filter(Boolean).join(' ')
      );
    }

    const newFiles = filesToAdd.map(file => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      status: 'uploading' as const,
      progress: 0,
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach(fileObj => {
      const interval = setInterval(() => {
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === fileObj.id 
              ? { ...f, progress: Math.min(f.progress + 10, 100) }
              : f
          )
        );
      }, 200);
      timersRef.current.add(interval);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        timersRef.current.delete(interval);
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === fileObj.id 
              ? { ...f, status: 'success', progress: 100 }
              : f
          )
        );
      }, 2000);
      timersRef.current.add(timeout);
    });

    onUpload?.(filesToAdd);
  }, [onUpload, maxFiles, uploadedFiles.length]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles,
    maxSize: MAX_FILE_SIZE,
    multiple: true,
  });

  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`
          drop-zone hover-lift
          ${isDragActive 
            ? 'drop-zone-active' 
            : 'drop-zone-inactive'
          }
        `}
      >
        <input {...getInputProps()} />
          <div className="space-y-4">
            <div className={`transform transition-transform ${isDragActive ? 'scale-110' : 'scale-100'}`}>
              <Upload className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">
              {isDragActive ? 'Drop your images here!' : 'Upload your photos'}
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Drag and drop your images here, or click to browse
            </p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">
              Supports JPEG, PNG, GIF, WebP up to 10MB each
            </p>
            </div>
          </div>
        </div>

      {/* Error Message */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 flex items-start gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          >
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-700 dark:text-red-400">{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-400 hover:text-red-600 dark:hover:text-red-300"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Progress */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 space-y-4"
          >
            <h4 className="text-lg font-semibold">Uploading Files</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedFiles.map((fileObj) => (                  <motion.div
                  key={fileObj.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative card-base p-4"
                >
                  <button
                    onClick={() => removeFile(fileObj.id)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors z-10"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  
                  <div className="relative aspect-square mb-3 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
                    <Image 
                      src={fileObj.preview} 
                      alt={fileObj.file.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    {fileObj.status === 'success' && (
                      <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      </div>
                    )}
                    {fileObj.status === 'error' && (
                      <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                        <AlertCircle className="h-8 w-8 text-red-500" />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium truncate">
                        {fileObj.file.name}
                      </span>
                      <span className="text-xs text-slate-500">
                        {(fileObj.file.size / 1024 / 1024).toFixed(1)}MB
                      </span>
                    </div>
                    
                    {fileObj.status === 'uploading' && (
                      <div className="progress-bar">
                        <motion.div
                          className="progress-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${fileObj.progress}%` }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    )}
                    
                    {fileObj.status === 'success' && (
                      <div className="flex items-center gap-2 text-green-600 text-sm">
                        <CheckCircle className="h-4 w-4" />
                        <span>Upload complete</span>
                      </div>
                    )}
                    {fileObj.status === 'error' && (
                      <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>Upload failed</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
