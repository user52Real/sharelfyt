import { motion } from 'framer-motion';
import Image from 'next/image';

// Define the tech stack items with proper dimensions
const techStack = [
  { 
    name: "React", 
    icon: "/react-logo.svg",
    width: 40,
    height: 40 
  },
  { 
    name: "Next.js", 
    icon: "/next-logo.svg",
    width: 40,
    height: 40
  },
  { 
    name: "TypeScript", 
    icon: "/typescript-logo.svg",
    width: 40,
    height: 40
  },
  { 
    name: "Node.js", 
    icon: "/node-logo.svg",
    width: 40,
    height: 40
  },
];

export function TechStackGrid() {
  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
      {techStack.map((tech, i) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
          whileHover={{ y: -5 }}
          className="group relative overflow-hidden rounded-lg border border-gray-800 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative flex flex-col items-center justify-center">
            <div className="relative h-10 w-10">
              <Image
                src={tech.icon}
                alt={`${tech.name} logo`}
                fill
                sizes="40px"
                className="object-contain transition-transform group-hover:scale-110"
                priority={i < 2} // Prioritize loading first two images
              />
            </div>
            <span className="mt-3 text-sm font-medium">{tech.name}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Individual tech logo component for reuse
interface TechLogoProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function TechLogo({ src, alt, width = 40, height = 40, className = "" }: TechLogoProps) {
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${Math.max(width, height)}px`}
        className="object-contain"
      />
    </div>
  );
}