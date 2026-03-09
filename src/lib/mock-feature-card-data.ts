import { Upload, Users, Eye, LucideIcon } from "lucide-react";

export interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
  badge?: string;
}

/** Feature highlights displayed on the landing page to showcase key application capabilities */
export const featureCardsData: FeatureCard[] = [
  {
    icon: Upload,
    title: "Smart Upload",
    description: "Drag & drop with automatic resizing and optimization",
    iconColor: "text-blue-600"
  },
  {
    icon: Eye,
    title: "Client Proofing",
    description: "Share galleries with clients for review and approval",
    iconColor: "text-green-600"
  },
  {
    icon: Users,
    title: "Public Sharing",
    description: "Create public portfolios with custom URLs",
    iconColor: "text-purple-600"
  }
];