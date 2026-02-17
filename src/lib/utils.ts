import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function prefix(path: string) {
  const basePath = process.env.NODE_ENV === 'production' ? '/Portfolio' : '';
  return `${basePath}${path}`;
}
