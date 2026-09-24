interface ProgressBarProps {
  progress: number;
  className?: string;
}

export default function ProgressBar({ progress, className = "" }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div className={`bg-gray-700 rounded-full h-2 ${className}`}>
      <div
        className="bg-blue-600 rounded-full h-2 transition-all duration-300"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
