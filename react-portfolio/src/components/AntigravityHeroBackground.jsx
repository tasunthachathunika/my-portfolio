import React, { useRef, useEffect } from 'react';

const AntigravityHeroBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    let particles = [];
    const SPACING = 28; // grid spacing
    const REVEAL_RADIUS = 160; // how far around cursor to show dashes
    const PUSH_RADIUS = 120;   // how far around cursor to push dashes
    const mouse = { x: -1000, y: -1000 };
    
    // Theme accent gradient stops — matches gradient-text, timeline, skill-card borders
    // Purple (#a855f7) → Pink (#ff2d7b) → Cyan (#00d4ff)
    const accentGradient = [
      { r: 168, g: 85,  b: 247 }, // accent-1: Purple
      { r: 255, g: 45,  b: 123 }, // accent-2: Pink
      { r: 0,   g: 212, b: 255 }, // accent-3: Cyan
    ];

    // Interpolate between gradient stops based on a 0–1 factor
    const lerpColor = (t) => {
      const clamped = Math.max(0, Math.min(1, t));
      let idx, frac;
      if (clamped < 0.5) {
        idx = 0; frac = clamped * 2;           // Purple → Pink
      } else {
        idx = 1; frac = (clamped - 0.5) * 2;   // Pink → Cyan
      }
      const a = accentGradient[idx];
      const b = accentGradient[idx + 1];
      const r = Math.round(a.r + (b.r - a.r) * frac);
      const g = Math.round(a.g + (b.g - a.g) * frac);
      const bl = Math.round(a.b + (b.b - a.b) * frac);
      return { r, g, b: bl };
    };

    class Particle {
      constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        // Each particle picks a random position on the accent gradient
        this.colorT = Math.random();
        this.baseThickness = 1.6 + Math.random() * 0.8; // 1.6–2.4px
        this.thickness = this.baseThickness;
        this.baseLength = 7 + Math.random() * 9; // 7–16px
        this.length = this.baseLength;
        
        this.baseOpacity = 0.0;
        this.opacity = 0.0;
        this.friction = 0.08 + Math.random() * 0.04;
        
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.008;
      }

      draw(canvasW, canvasH) {
        const endX = this.x + Math.cos(this.angle) * this.length;
        const endY = this.y + Math.sin(this.angle) * this.length;

        // Dynamic color based on position + particle's own gradient offset
        // Mimics CursorGlow's position-based hue shift
        const xRatio = this.x / canvasW;
        const yRatio = this.y / canvasH;
        const dynamicT = (this.colorT * 0.5 + xRatio * 0.3 + yRatio * 0.2) % 1.0;
        const { r, g, b } = lerpColor(dynamicT);
        
        const strokeColor = `rgb(${r}, ${g}, ${b})`;
        const glowColor = `rgba(${r}, ${g}, ${b}, 0.5)`;

        ctx.save();
        
        // Soft neon glow — matches neon-border intensity
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 6 + this.opacity * 8;
        
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(endX, endY);
        
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = this.thickness;
        ctx.lineCap = "round";
        ctx.globalAlpha = this.opacity * 0.85; // Slightly toned down for subtlety
        ctx.stroke();
        
        ctx.restore();
      }

      update(canvasW, canvasH) {
        const dxBase = mouse.x - this.baseX;
        const dyBase = mouse.y - this.baseY;
        const distToBase = Math.sqrt(dxBase * dxBase + dyBase * dyBase);

        if (distToBase < REVEAL_RADIUS) {
          const revealFactor = 1 - (distToBase / REVEAL_RADIUS);
          const targetOpacity = 0.2 + revealFactor * 0.8; // 0.2 → 1.0

          // Gentle organic rotation
          this.angle += this.rotationSpeed * revealFactor;

          if (distToBase < PUSH_RADIUS) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy) || 0.001;
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (PUSH_RADIUS - Math.min(distance, PUSH_RADIUS)) / PUSH_RADIUS;

            this.x += forceDirectionX * force * -10 + forceDirectionY * force * 5;
            this.y += forceDirectionY * force * -10 + (-forceDirectionX) * force * 5;

            this.thickness = this.baseThickness * 1.5;
            this.length = this.baseLength * 1.7;
          } else {
            this.x += (this.baseX - this.x) * this.friction;
            this.y += (this.baseY - this.y) * this.friction;
            this.thickness += (this.baseThickness - this.thickness) * this.friction;
            this.length += (this.baseLength - this.length) * this.friction;
          }

          this.opacity += (targetOpacity - this.opacity) * 0.12;
        } else {
          this.opacity += (0.0 - this.opacity) * 0.08;
          this.x += (this.baseX - this.x) * this.friction;
          this.y += (this.baseY - this.y) * this.friction;
          this.thickness += (this.baseThickness - this.thickness) * this.friction;
          this.length += (this.baseLength - this.length) * this.friction;
        }

        if (this.opacity > 0.01) this.draw(canvasW, canvasH);
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];

      // Use a dense uniform grid so cursor always finds nearby particles
      const cols = Math.ceil(canvas.width / SPACING) + 1;
      const rows = Math.ceil(canvas.height / SPACING) + 1;
      const offsetX = (canvas.width - (cols - 1) * SPACING) / 2;
      const offsetY = (canvas.height - (rows - 1) * SPACING) / 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = offsetX + i * SPACING;
          const y = offsetY + j * SPACING;
          particles.push(new Particle(x, y));
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cw = canvas.width;
      const ch = canvas.height;
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(cw, ch);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      init();
    };

    init();
    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 pointer-events-auto"
      style={{ backgroundColor: 'transparent', width: '100%', height: '100%' }}
    />
  );
};

export default AntigravityHeroBackground;
