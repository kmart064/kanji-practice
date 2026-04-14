import { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

export default function GlassPanel({
  children,
  className = "",
}: GlassPanelProps) {
  return (
    <div
      className={`
        w-full max-w-md p-6 text-center space-y-6
        glass
        ${className}
      `}
    >
      {children}
    </div>
  );
}
