interface PhotoMetadata {
  date: string;
  size: number;
  tags: string[];
}

export function formatPhotoMetadata(metadata: PhotoMetadata): string {
  const date = new Date(metadata.date + 'T00:00:00');
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  let formattedSize: string;
  if (metadata.size >= 1048576) {
    formattedSize = `${(metadata.size / 1048576).toFixed(1)} MB`;
  } else {
    formattedSize = `${Math.round(metadata.size / 1024)} KB`;
  }

  const formattedTags = metadata.tags.join(', ');

  return `${formattedDate} • ${formattedSize} • ${formattedTags}`;
}
