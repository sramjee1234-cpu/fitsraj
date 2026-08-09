export interface AITool {
  id: string;
  name: string;
  nameNe: string;
  description: string;
  descriptionNe: string;
  category: AIToolCategory;
  level: "beginner" | "advanced" | "intermediate";
  levelNe: string;
  url: string;
  icon: string;
  isExternal: boolean;
  learnUrl?: string;
}

export type AIToolCategory =
  | "all"
  | "assistant"
  | "image"
  | "video"
  | "voice"
  | "research"
  | "writing"
  | "productivity";

export interface Course {
  id: string;
  title: string;
  titleNe: string;
  description: string;
  descriptionNe: string;
  category: CourseCategory;
  duration: string;
  videoUrl: string;
  thumbnail: string;
}

export type CourseCategory = "ai" | "video-editing" | "fitness" | "trading";

export interface Ebook {
  id: string;
  title: string;
  titleNe: string;
  description: string;
  descriptionNe: string;
  coverImage: string;
  pdfUrl: string;
  category: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  titleNe: string;
  description: string;
  descriptionNe: string;
  category: string;
  duration: string;
  date: string;
  audioUrl?: string;
}

export interface Lesson {
  id: string;
  title: string;
  titleNe: string;
  description: string;
  descriptionNe: string;
  videoPlaceholder?: string;
  readingSection: string;
  readingSectionNe: string;
  practiceTask: string;
  practiceTaskNe: string;
  relatedToolUrl?: string;
}

export interface FitnessChallenge {
  id: string;
  title: string;
  titleNe: string;
  description: string;
  descriptionNe: string;
  icon: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface FounderInfo {
  name: string;
  nameNe: string;
  bio: string;
  bioNe: string;
  photoUrl: string;
}

export interface NewsItem {
  id: string;
  title: string;
  titleNe: string;
  category: string;
  date: string;
  isDemo: boolean;
}

export type Language = "ne" | "en";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
