/**
 * Utilities for handling database data
 */

/**
 * Parse JSON string from database
 * @param jsonString JSON string from database or default empty array/object
 * @returns Parsed JSON object or array
 */
export function parseDbJson<T>(jsonString: string, defaultValue: T): T {
  if (!jsonString) return defaultValue;
  
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error('Error parsing JSON from database:', error);
    return defaultValue;
  }
}

/**
 * Stringify JSON for database storage
 * @param data Data to stringify
 * @returns JSON string
 */
export function stringifyForDb(data: any): string {
  if (!data) return '{}';
  
  try {
    return JSON.stringify(data);
  } catch (error) {
    console.error('Error stringifying data for database:', error);
    return '{}';
  }
}

/**
 * Safely gets the first image URL from a product's images array
 * Works with both string JSON representation and direct array
 */
export function getFirstImageUrl(images: string | any[] | null | undefined, fallback: string = ''): string {
  if (!images) return fallback;
  
  try {
    // If it's a string (from SQLite), parse it
    if (typeof images === 'string') {
      const parsed = JSON.parse(images);
      
      // Check if it's an array of objects with url property
      if (Array.isArray(parsed) && parsed.length > 0) {
        if (typeof parsed[0] === 'object' && parsed[0]?.url) {
          return parsed[0].url;
        }
        // It might be an array of strings
        if (typeof parsed[0] === 'string') {
          return parsed[0];
        }
      }
    }
    // If it's already an array
    else if (Array.isArray(images) && images.length > 0) {
      // Array of objects with url
      if (typeof images[0] === 'object' && images[0]?.url) {
        return images[0].url;
      }
      // Array of strings
      if (typeof images[0] === 'string') {
        return images[0];
      }
    }
    
    return fallback;
  } catch (error) {
    console.error('Error getting first image URL:', error);
    return fallback;
  }
} 