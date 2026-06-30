import React from "react";

type IconVariant = "filled" | "outline";

export const FacebookIcon = ({
  className,
  variant = "filled",
}: {
  className?: string;
  variant?: IconVariant;
}) => {
  if (variant === "outline") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.101 24v-11.063H5.09V8.313h4.01V5.502c0-3.946 2.41-6.1 5.932-6.1 1.687 0 3.138.126 3.56.182v4.128h-2.443c-1.915 0-2.286.91-2.286 2.247v2.953h4.569l-.594 4.624h-3.975V24H9.101z" />
    </svg>
  );
};
