import type { LucideIcon } from "lucide-react";

export interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

export interface Requirement {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image?: string;
  rating?: number;
}

export interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Reason {
  title: string,
  description: string
}