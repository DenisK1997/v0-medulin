interface SofaBedIconProps {
  className?: string
}

export function SofaBedIcon({ className = "h-4 w-4" }: SofaBedIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Sofa base */}
      <rect x="2" y="12" width="20" height="6" rx="1" />
      {/* Sofa back */}
      <rect x="3" y="8" width="18" height="4" rx="1" />
      {/* Left armrest */}
      <rect x="2" y="8" width="2" height="8" rx="1" />
      {/* Right armrest */}
      <rect x="20" y="8" width="2" height="8" rx="1" />
      {/* Sofa legs */}
      <line x1="5" y1="18" x2="5" y2="20" />
      <line x1="19" y1="18" x2="19" y2="20" />
      {/* Bed indicator (dotted line showing it extends) */}
      <line x1="8" y1="6" x2="16" y2="6" strokeDasharray="2,2" />
      <path d="M7 6 L9 4 L9 6" strokeWidth="1.5" />
      <path d="M17 6 L15 4 L15 6" strokeWidth="1.5" />
    </svg>
  )
}
