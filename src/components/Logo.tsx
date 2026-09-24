export default function Logo({ className = "h-8" }: { className?: string }) {
  return (
    <img 
      src="/logo.png" 
      alt="CMDEV Logo" 
      className={`w-auto object-contain ${className}`}
    />
  );
}
