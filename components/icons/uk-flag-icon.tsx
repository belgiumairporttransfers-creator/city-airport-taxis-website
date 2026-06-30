import React from "react";

export const UKFlagIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 480"
    className={className}
  >
    <path fill="#012169" d="M0 0h640v480H0z" />
    <path
      fill="#fff"
      d="m75 0 244 181L562 0h78v62L400 210l240 178v92h-78L320 300 75 480H0v-92l240-178L0 62V0h75z"
    />
    <path
      fill="#C8102E"
      d="m424 281 216 159v40L369 281h55zM216 281 0 440v40l271-199h-55zm-55-81L0 40V0l216 159v41h-55zm314 0L640 40V0L369 199h106z"
    />
    <path fill="#fff" d="M255 0v480h130V0H255zM0 175v130h640V175H0z" />
    <path fill="#C8102E" d="M285 0v480h70V0h-70zM0 205v70h640v-70H0z" />
  </svg>
);
