"use client";

import { useState } from "react";
import { PlayCircle } from "lucide-react";

interface LessonCoverImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export default function LessonCoverImage({ src, alt, className, fallbackSrc }: LessonCoverImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (currentSrc.includes("hq720.jpg")) {
      setCurrentSrc(currentSrc.replace("hq720.jpg", "hqdefault.jpg"));
    } else if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  if (hasError && !fallbackSrc) {
    return (
      <div className={`bg-gradient-to-br from-purple-900 to-black w-full h-full flex items-center justify-center opacity-60 transition-all duration-700 ${className}`}>
        <PlayCircle className="w-16 h-16 text-white/10" />
      </div>
    );
  }

  return (
    <img 
      src={currentSrc} 
      alt={alt}
      onError={handleError}
      className={className}
    />
  );
}
