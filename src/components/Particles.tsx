import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const Particles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Reduce particles on mobile for performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 3 : 5;
    const interval = isMobile ? 3000 : 2000;

    const createParticle = () => {
      const newParticle: Particle = {
        id: Date.now() + Math.random(),
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 20,
        size: Math.random() * 10 + 5,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      };
      return newParticle;
    };

    const generateParticles = () => {
      const newParticles = Array.from({ length: particleCount }, createParticle);
      setParticles((prev) => [...prev, ...newParticles]);
    };

    generateParticles();
    const particleInterval = setInterval(generateParticles, interval);

    const cleanup = setInterval(() => {
      setParticles((prev) => prev.filter((p) => Date.now() - p.id < 10000));
    }, 1000);

    return () => {
      clearInterval(particleInterval);
      clearInterval(cleanup);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, rgba(255,105,180,0.8), rgba(255,182,193,0.4))`,
          }}
          initial={{ y: window.innerHeight + 20, opacity: 0.8 }}
          animate={{
            y: -100,
            x: particle.x + (Math.random() - 0.5) * 200,
            opacity: 0,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
