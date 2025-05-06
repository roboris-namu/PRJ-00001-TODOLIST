import React from 'react';

/**
 * Type definition for React Icon components to fix TS2786 error
 * with React 19 and recent TypeScript versions
 */
export type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/**
 * Helper function to type-cast any icon component imported from react-icons
 * to be safely used in JSX without TypeScript errors
 * 
 * @param IconComponent - The imported icon component from react-icons
 * @returns The same component with proper TypeScript typing for JSX usage
 */
export const withIconType = <T extends {}>(IconComponent: T): IconType => {
  return IconComponent as unknown as IconType;
}; 