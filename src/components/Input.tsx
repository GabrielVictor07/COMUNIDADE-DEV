"use client";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full bg-white/5 backdrop-blur-md border ${error ? "border-red-500/50" : "border-white/10"} rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 focus:ring-1 focus:ring-purple-500 transition-all ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
