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
    
    // Colors matching the screenshot (Cyan, Purple, Pink, Orange/Slate)
    const colors = [
      { color: '#00F0FF', weight: 0.25 }, // Neon Cyan
      { color: '#4F46E5', weight: 0.25 }, // Indigo/Blue
      { color: '#EC4899', weight: 0.25 }, // Neon Pink
      { color: '#F97316', weight: 0.25 }, // Orange/Red
    ];
    
    const getRandomColor = () => {
      const rand = Math.random();
      let cumulativeWeight = 0;
      for (const c of colors) {
        cumulativeWeight += c.weight;
        if (rand <= cumulativeWeight) return c.color;
      }
      return colors[0].color;
    };

    class Particle {
      constructor(x, y, centerX, centerY) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.color = getRandomColor();
        this.baseThickness = 1.5 + Math.random(); // 1.5px to 2.5px
        this.thickness = this.baseThickness;
        this.baseLength = 6 + Math.random() * 8; // 6px to 14px long
        this.length = this.baseLength;
        
        // Always invisible by default — only revealed near cursor
        this.baseOpacity = 0.0;
        this.opacity = 0.0;
        this.friction = 0.08 + Math.random() * 0.04;
        
        // Random angle so dashes point in different directions (not forced radial)
        this.angle = Math.random() * Math.PI * 2;
      }

      draw() {
        ctx.beginPath();
        const endX = this.x + Math.cos(this.angle) * this.length;
        const endY = this.y + Math.sin(this.angle) * this.length;
        
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(endX, endY);
        
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.thickness;
        ctx.lineCap = "round";
        ctx.globalAlpha = this.opacity;
        ctx.stroke();
      }

      update() {
        // Distance to cursor using CURRENT (possibly displaced) position
        const dxBase = mouse.x - this.baseX;
        const dyBase = mouse.y - this.baseY;
        const distToBase = Math.sqrt(dxBase * dxBase + dyBase * dyBase);

        // Only reveal (and interact with) particles near cursor
        if (distToBase < REVEAL_RADIUS) {
          // Smooth fade-in at edge, bright in the centre
          const revealFactor = 1 - (distToBase / REVEAL_RADIUS);
          const targetOpacity = 0.3 + revealFactor * 0.7; // 0.3 → 1.0

          if (distToBase < PUSH_RADIUS) {
            // --- Physics zone: push + swirl ---
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy) || 0.001;
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (PUSH_RADIUS - Math.min(distance, PUSH_RADIUS)) / PUSH_RADIUS;

            this.x += forceDirectionX * force * -10 + forceDirectionY * force * 5;
            this.y += forceDirectionY * force * -10 + (-forceDirectionX) * force * 5;

            this.thickness = this.baseThickness * 1.5;
            this.length = this.baseLength * 1.8;
          } else {
            // Spring back when outside push zone but still in reveal zone
            this.x += (this.baseX - this.x) * this.friction;
            this.y += (this.baseY - this.y) * this.friction;
            this.thickness += (this.baseThickness - this.thickness) * this.friction;
            this.length += (this.baseLength - this.length) * this.friction;
          }

          this.opacity += (targetOpacity - this.opacity) * 0.12;
        } else {
          // Outside reveal radius — fade out and spring back silently
          const targetOpacity = 0.0;
          this.opacity += (targetOpacity - this.opacity) * 0.08;
          this.x += (this.baseX - this.x) * this.friction;
          this.y += (this.baseY - this.y) * this.friction;
          this.thickness += (this.baseThickness - this.thickness) * this.friction;
          this.length += (this.baseLength - this.length) * this.friction;
        }

        // Only draw if visible enough
        if (this.opacity > 0.01) this.draw();
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
          particles.push(new Particle(x, y, canvas.width / 2, canvas.height / 2));
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
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
