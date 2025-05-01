import * as React from 'react';
import type { SVGProps } from 'react';

/**
 * Custom SVG Icon for Aishu's Handcraft Logo.
 * Combines stylized 'A' and 'H' with a subtle craft element.
 */
const AishuLogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Stylized 'A' */}
    <path d="M4 20 L10 4 L16 20" />
    <path d="M6.5 14 L13.5 14" />

    {/* Stylized 'H' integrated with 'A' */}
    <path d="M16 20 L16 4" /> {/* Right vertical bar of H */}
    <path d="M13.5 14 L19 14" /> {/* Crossbar of H, extending */}

    {/* Simple Heart element integrated */}
    <path d="M19 14 a 2.5 2.5 0 0 1 0 5 a 2.5 2.5 0 0 1 0 -5 Z" fill="currentColor"/>


  </svg>
);

export default AishuLogoIcon;
