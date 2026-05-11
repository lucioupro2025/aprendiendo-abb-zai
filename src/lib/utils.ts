import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAssetPath(path: string) {
  // En Next.js, process.env.NODE_ENV está disponible. 
  // También chequeamos si estamos en localhost para estar seguros.
  const isLocal = typeof window !== 'undefined' && 
                 (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  
  const isProd = process.env.NODE_ENV === 'production' && !isLocal;
  const basePath = isProd ? '/aprendiendo-abb-zai' : '';
  
  return `${basePath}${path.startsWith('/') ? '' : '/'}${path}`;
}
