// src/lib/utils/analytics.ts

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

/**
 * Track Google Analytics 4 (GA4) events
 * @param eventName - The name of the event to track
 * @param parameters - Additional parameters for the event
 */
export function trackGAEvent(eventName: string, parameters: Record<string, any>): void {
  // Check if gtag is available (Google Analytics 4)
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, parameters);
  }
  
  // Log to console for development/debugging
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.log(`GA Event: ${eventName}`, parameters);
  }
}

/**
 * Check if a URL points to a downloadable file
 * @param url - The URL to check
 * @returns boolean indicating if the URL is a download link
 */
export function isDownloadLink(url: string): boolean {
  const extensions = [
    '.pdf', '.zip', '.doc', '.docx', '.xlsx', '.csv', '.ppt', '.pptx',
    '.mp3', '.mp4', '.avi', '.mov', '.wav', '.png', '.jpg', '.jpeg',
    '.gif', '.svg', '.txt', '.rtf', '.odt', '.ods', '.odp'
  ];
  const lowerUrl = url.toLowerCase();
  return extensions.some(ext => lowerUrl.endsWith(ext));
}

/**
 * Extract file name from URL
 * @param url - The URL to extract file name from
 * @returns The file name or 'unknown_file' if extraction fails
 */
export function getFileName(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const fileName = pathParts.pop() || 'unknown_file';
    // Remove query parameters
    return fileName.split('?')[0];
  } catch {
    // Fallback for relative URLs or invalid URLs
    const parts = url.split('/');
    const fileName = parts.pop()?.split('?')[0] || 'unknown_file';
    return fileName;
  }
}

/**
 * Check if a URL points to the media subdomain
 * @param url - The URL to check
 * @returns boolean indicating if the URL is from media.amga.co.uk
 */
export function isMediaSubdomain(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === 'media.amga.co.uk';
  } catch {
    // For relative URLs, check if they contain the media subdomain path
    return url.includes('media.amga.co.uk');
  }
}
