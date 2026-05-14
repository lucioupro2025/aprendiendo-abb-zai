import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAssetPath(path: string) {
  // En desarrollo (localhost), no usamos basePath.
  // Solo aplicamos el basePath en producción para GitHub Pages.
  const isProd = process.env.NODE_ENV === 'production';
  const basePath = isProd ? '/aprendiendo-abb-zai' : '';
  
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
