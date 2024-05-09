import React from "react";

/**
 * @param {Object} props0
 * @param {string} props0.className
 */
export default function DashIcon({ className, ...props }) {
  return (
    <span className={className} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 12 2"
        fill="currentColor"
        className="w-full h-full"
      >
        <rect width="12" height="2" rx="1"/>
      </svg>
    </span>
  );
}
