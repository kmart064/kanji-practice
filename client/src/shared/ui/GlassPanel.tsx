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
        w-full p-6 panel-surface
        panel-surface
        ${className}
      `}
    >
      {children}
    </div>
  );
}
