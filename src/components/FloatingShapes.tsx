import { motion } from 'motion/react';

export default function FloatingShapes() {
  const shapes = [
    { size: 300, x: '85%', y: '20%', delay: 0, duration: 20, opacity: 0.04 },
    { size: 200, x: '75%', y: '60%', delay: 2, duration: 25, opacity: 0.03 },
    { size: 150, x: '90%', y: '40%', delay: 4, duration: 18, opacity: 0.05 },
    { size: 100, x: '70%', y: '30%', delay: 1, duration: 22, opacity: 0.04 },
    { size: 80, x: '95%', y: '70%', delay: 3, duration: 28, opacity: 0.03 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            background: `radial-gradient(circle, var(--accent) 0%, transparent 70%)`,
            opacity: shape.opacity,
            filter: 'blur(40px)',
          }}
          animate={{
            y: [0, -30, 20, -10, 0],
            x: [0, 15, -10, 20, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Geometric shapes */}
      <motion.div
        className="absolute top-[15%] right-[8%] w-16 h-16 border border-[var(--accent)]/10 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-[45%] right-[15%] w-8 h-8 border border-[var(--accent)]/10 rotate-45"
        animate={{ rotate: [45, 135, 45] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[25%] right-[5%] w-12 h-12 border border-[var(--border)] rounded-full"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
