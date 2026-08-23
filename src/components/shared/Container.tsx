import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function Container({
  children,
  className,
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-1 sm:px-2 lg:px-3 ${className}`}
    >
      {children}
    </div>
  );
}
