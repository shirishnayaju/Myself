import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const skills = [
  { name: "Figma", level: 90, icon: "🎨", color: "#F24E1E" },
  { name: "React", level: 60, icon: "⚛️", color: "#61DAFB" },
  { name: "GSAP", level: 50, icon: "✨", color: "#88CE02" },
  { name: "HTML/CSS", level: 80, icon: "🌐", color: "#E44D26" },
  { name: "JavaScript", level: 65, icon: "⚡", color: "#F7DF1E" },
  { name: "UI/UX Design", level: 85, icon: "🖌️", color: "#FF7262" },
];

const projects = [
  {
    title: "Design System UI/UX",
    desc: "A comprehensive Figma design system with components, variables, and documentation for scalable UI.",
    tags: ["Figma", "UI/UX", "Design"],
    gradient: "from-pink-500 to-rose-600",
    image: "/image1.png",
    link: "https://www.figma.com/design/JUbiGBafhwW46n255xvGtY/fitness-website?node-id=0-1&t=W3rjiWWvwoX8rC1L-1",
    emoji: "🎨",
  },
  {
    title: "Prototype Animations UI/UX",
    desc: "Crafted a sleek portfolio UI prototype in Figma with smooth micro-interactions and transitions.",
    tags: ["Figma", "Prototype", "Animation"],
    gradient: "from-violet-500 to-purple-700",
    image: "/image.png",
    link: "https://www.figma.com/proto/JUbiGBafhwW46n255xvGtY/fitness-website?node-id=74-376&p=f&t=iIR501vAkQCUjVkM-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=74%3A376",
    emoji: "🖼️",
  },
  {
    title: "React Dashboard",
    desc: "An interactive dashboard with dynamic data visualization built while learning React and GSAP.",
    tags: ["React", "GSAP", "JavaScript"],
    gradient: "from-cyan-500 to-blue-600",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    link: "https://github.com/shirishnayaju",
    emoji: "📊",
  },
];

const socialLinks = {
  github: "https://github.com/shirishnayaju",
  linkedin: "https://www.linkedin.com/in/shirish-nayaju-95065626a/",
  instagram: "https://www.instagram.com/shirish_nayaju",
  facebook: "https://www.facebook.com/shirish.nayaju.52",
  gmail: "mailto:shirishnayaju@gmail.com?subject=Portfolio%20Inquiry&body=Hi%20Shirish%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20get%20in%20touch%20with%20you.%0A%0ABest%2C",
  whatsapp: "https://wa.me/9779869602962?text=Hi%20Shirish%2C%20I%20saw%20your%20portfolio",
};

export default function LandingPage() {
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const navRef = useRef(null);
  const skillsRef = useRef([]);
  const cardsRef = useRef([]);
  const heroImageRef = useRef(null);
  const aboutImageRef = useRef(null);
  const floatingCardRef = useRef(null);
  const particleContainerRef = useRef(null);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Particles animation
  useEffect(() => {
    if (isMobile || !particleContainerRef.current) return;
    
    const container = particleContainerRef.current;
    const particles = [];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: rgba(167, 139, 250, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `;
      container.appendChild(particle);
      
      gsap.to(particle, {
        x: `${(Math.random() - 0.5) * 200}px`,
        y: `${(Math.random() - 0.5) * 200}px`,
        opacity: Math.random() * 0.3,
        duration: Math.random() * 5 + 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      });
      
      particles.push(particle);
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, [isMobile]);

  // Custom cursor
  useEffect(() => {
    if (isMobile) return;
    
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    let mouseX = 0, mouseY = 0;
    let curX = 0, curY = 0;

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(dot, { x: mouseX - 4, y: mouseY - 4, duration: 0 });
    };

    const animate = () => {
      curX += (mouseX - curX) * 0.1;
      curY += (mouseY - curY) * 0.1;
      gsap.set(cursor, { x: curX - 20, y: curY - 20 });
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move);
    animate();

    const links = document.querySelectorAll("a, button, .hoverable");
    links.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(cursor, { scale: 2, opacity: 0.5, duration: 0.3 });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
      });
    });

    return () => window.removeEventListener("mousemove", move);
  }, [isMobile]);

  // Hero entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        ".hero-tag",
        { y: 30, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.3"
      )
      .fromTo(
        nameRef.current,
        { y: 80, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, duration: 1, ease: "power4.out" },
        "-=0.2"
      )
      .fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        ".hero-desc",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.4"
      )
      .fromTo(
        ".hero-cta",
        { y: 20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.5)" },
        "-=0.3"
      )
      .fromTo(
        ".floating-badge",
        { scale: 0, opacity: 0, rotation: 180 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.5, stagger: 0.1, ease: "back.out(2)" },
        "-=0.4"
      );

    if (heroImageRef.current && !isMobile) {
      tl.fromTo(
        heroImageRef.current,
        { x: 100, opacity: 0, scale: 0.8, rotation: 5 },
        { x: 0, opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: "power4.out" },
        "-=0.8"
      );
    } else if (heroImageRef.current && isMobile) {
      tl.fromTo(
        heroImageRef.current,
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power4.out" },
        "-=0.6"
      );
    }

    gsap.to(".floating-badge", {
      y: -10,
      rotation: 3,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: { each: 0.2, from: "random" },
    });

    const speedMultiplier = isMobile ? 1.5 : 1;
    gsap.to(".orb-1", {
      x: 60,
      y: -40,
      scale: 1.2,
      duration: 8 * speedMultiplier,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(".orb-2", {
      x: -50,
      y: 50,
      scale: 0.8,
      duration: 10 * speedMultiplier,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(".orb-3", {
      x: 30,
      y: 30,
      scale: 1.1,
      duration: 7 * speedMultiplier,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    if (heroImageRef.current && !isMobile) {
      gsap.to(heroImageRef.current, {
        y: -20,
        rotation: 2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, [isMobile]);

  // Scroll animations
  useEffect(() => {
    ScrollTrigger.getAll().forEach((t) => t.kill());

    skillsRef.current.forEach((el, i) => {
      if (!el) return;
      const bar = el.querySelector(".skill-bar-fill");
      const counter = el.querySelector(".skill-counter");
      const width = skills[i].level + "%";
      
      gsap.fromTo(
        bar,
        { width: "0%" },
        {
          width,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
      
      if (counter) {
        gsap.fromTo(
          counter,
          { textContent: 0 },
          {
            duration: 1.5,
            textContent: skills[i].level,
            snap: { textContent: 1 },
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      }
      
      gsap.fromTo(
        el,
        { x: isMobile ? -20 : -60, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        }
      );
    });

    cardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { y: 80, opacity: 0, scale: 0.85, rotationX: isMobile ? 0 : 15 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 0.9,
          delay: i * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
          },
        }
      );
    });

    gsap.utils.toArray(".section-title").forEach((el) => {
      const line = el.querySelector(".title-line");
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        }
      );
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      }
    });

    gsap.fromTo(
      ".about-content",
      { x: isMobile ? 0 : -80, y: isMobile ? 30 : 0, opacity: 0 },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".about-content", start: "top 85%" },
      }
    );

    gsap.utils.toArray(".stat-number").forEach((el) => {
      gsap.fromTo(
        el,
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: el, start: "top 90%" },
        }
      );
    });

    if (aboutImageRef.current) {
      gsap.fromTo(
        aboutImageRef.current,
        { x: isMobile ? 0 : 80, y: isMobile ? 50 : 0, opacity: 0, scale: 0.8, rotation: -5 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { 
            trigger: aboutImageRef.current, 
            start: "top 85%",
          },
        }
      );

      if (!isMobile) {
        ScrollTrigger.create({
          trigger: aboutImageRef.current,
          start: "top 85%",
          onEnter: () => {
            gsap.to(aboutImageRef.current, {
              y: -15,
              rotation: 1,
              duration: 4,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: 1.2,
            });
          },
        });
      }
    }

    if (floatingCardRef.current) {
      gsap.fromTo(
        floatingCardRef.current,
        { x: isMobile ? 0 : -80, y: 40, opacity: 0, scale: 0.3, rotation: -10 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.9,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: floatingCardRef.current,
            start: "top 95%",
          },
        }
      );
    }
  }, [isMobile]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  const handleHeroImageMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    gsap.to(e.currentTarget.querySelector("img"), {
      scale: 1.08,
      rotationX: rotateX,
      rotationY: rotateY,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleHeroImageMouseLeave = (e) => {
    if (isMobile) return;
    gsap.to(e.currentTarget.querySelector("img"), {
      scale: 1,
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleAboutImageMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    gsap.to(e.currentTarget.querySelector("img"), {
      scale: 1.05,
      rotationX: rotateX,
      rotationY: rotateY,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleAboutImageMouseLeave = (e) => {
    if (isMobile) return;
    gsap.to(e.currentTarget.querySelector("img"), {
      scale: 1,
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "3px",
          background: "linear-gradient(90deg, #7c3aed, #a78bfa, #60a5fa)",
          width: `${scrollProgress}%`,
          zIndex: 1001,
          transition: "width 0.1s ease",
        }}
      />

      {/* Custom Cursor */}
      {!isMobile && (
        <>
          <div
            ref={cursorRef}
            style={{
              position: "fixed",
              width: 40,
              height: 40,
              border: "2px solid #a78bfa",
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 9999,
              mixBlendMode: "difference",
              transition: "opacity 0.3s",
            }}
          />
          <div
            ref={cursorDotRef}
            style={{
              position: "fixed",
              width: 8,
              height: 8,
              background: "#a78bfa",
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 9999,
            }}
          />
        </>
      )}

      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          background: "#080810",
          color: "#f0f0ff",
          minHeight: "100vh",
          overflowX: "hidden",
          cursor: isMobile ? "auto" : "none",
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:ital@0;1&display=swap');
          
          * { box-sizing: border-box; margin: 0; padding: 0; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: #080810; }
          ::-webkit-scrollbar-thumb { background: #a78bfa; border-radius: 2px; }
          html { scroll-behavior: smooth; }
          
          .skill-bar-fill { transition: none; }
          
          .nav-link { position: relative; }
          .nav-link::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: #a78bfa;
            transition: width 0.3s ease;
          }
          .nav-link:hover::after { width: 100%; }
          
          .card-hover {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .card-hover:hover {
            transform: translateY(-12px);
            box-shadow: 0 40px 80px rgba(167, 139, 250, 0.2);
          }
          
          .btn-primary {
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          .btn-primary::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
          }
          .btn-primary:hover::before {
            width: 300px;
            height: 300px;
          }
          .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 20px 50px rgba(124, 58, 237, 0.5);
          }
          
          .btn-outline {
            transition: all 0.3s ease;
          }
          .btn-outline:hover {
            background: rgba(167, 139, 250, 0.15);
            transform: translateY(-3px);
            border-color: rgba(167, 139, 250, 0.8);
          }
          
          .image-container {
            perspective: 1000px;
          }
          
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          @keyframes borderGlow {
            0%, 100% { border-color: rgba(167,139,250,0.3); box-shadow: 0 0 20px rgba(167,139,250,0.1); }
            50% { border-color: rgba(167,139,250,0.8); box-shadow: 0 0 40px rgba(167,139,250,0.3); }
          }
          @keyframes scrollLine {
            0% { transform: scaleY(0); transform-origin: top; }
            50% { transform: scaleY(1); transform-origin: top; }
            51% { transform: scaleY(1); transform-origin: bottom; }
            100% { transform: scaleY(0); transform-origin: bottom; }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.1); }
          }
          @keyframes floatUpDown {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes slideInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .shimmer-effect {
            background: linear-gradient(90deg, transparent, rgba(167,139,250,0.1), transparent);
            background-size: 200% 100%;
            animation: shimmer 3s infinite;
          }
          .glow-border {
            animation: borderGlow 3s infinite;
          }
          .gradient-text {
            background: linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #f472b6 100%);
            background-size: 200% 200%;
            animation: gradientShift 3s ease infinite;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .project-image-container {
            position: relative;
            overflow: hidden;
          }
          .project-image-container .project-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(124,58,237,0.9), rgba(0,0,0,0.3));
            opacity: 0;
            transition: all 0.4s ease;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            padding: 20px;
          }
          .project-image-container:hover .project-overlay { opacity: 1; }
          .project-image-container:hover img { transform: scale(1.15); }
          .project-image-container img { transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
          
          .social-link {
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .social-link:hover {
            color: #a78bfa !important;
            transform: translateY(-3px);
          }
          
          .whatsapp-btn {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          .whatsapp-btn::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
          }
          .whatsapp-btn:hover::before {
            width: 400px;
            height: 400px;
          }
          .whatsapp-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 25px 60px rgba(37, 211, 102, 0.5) !important;
          }
          
          /* DESKTOP - Show desktop nav, hide mobile nav */
          .nav-desktop { display: flex !important; }
          .nav-mobile { display: none !important; }
          
          /* MOBILE - Hide desktop nav, show mobile nav */
          @media (max-width: 768px) {
            .nav-desktop { display: none !important; }
            .nav-mobile { display: flex !important; align-items: center !important; }
            
            .hero-flex-container { flex-direction: column !important; gap: 40px !important; text-align: center; padding-top: 40px; }
            .hero-text-content { max-width: 100% !important; align-items: center !important; }
            .hero-desc { max-width: 100% !important; text-align: center !important; }
            .hero-image-container { max-width: 350px !important; margin: 0 auto; }
            .hero-title { font-size: clamp(42px, 10vw, 64px) !important; text-align: center !important; }
            .section-title-text { font-size: clamp(32px, 7vw, 42px) !important; }
            .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            .about-image-wrapper { order: -1; max-width: 400px !important; margin: 0 auto !important; }
            .projects-grid { grid-template-columns: 1fr !important; }
            .skills-grid { grid-template-columns: 1fr !important; }
            .floating-badge-container { justify-content: center !important; }
            .hero-cta-container { justify-content: center !important; flex-direction: column; align-items: center; }
            .stats-container { justify-content: center !important; }
            .contact-links { flex-wrap: wrap; justify-content: center; gap: 16px !important; }
          }
          
          @media (max-width: 480px) {
            .hero-flex-container { padding: 80px 4% 40px !important; }
            section { padding: 60px 4% !important; }
            .hero-image-container { max-width: 280px !important; }
            .hero-tag { font-size: 11px !important; padding: 4px 12px !important; }
            .hero-title { font-size: clamp(36px, 12vw, 52px) !important; }
            .section-title-text { font-size: clamp(28px, 8vw, 36px) !important; }
            .btn-primary, .btn-outline { padding: 12px 24px !important; font-size: 14px !important; width: 100%; text-align: center; }
            .floating-badge { font-size: 11px !important; padding: 6px 12px !important; }
            .whatsapp-btn { padding: 14px 32px !important; font-size: 15px !important; width: 100%; justify-content: center; }
          }
          
          @media (min-width: 1025px) {
            .projects-grid { grid-template-columns: repeat(3, 1fr) !important; }
          }
          @media (min-width: 769px) and (max-width: 1024px) {
            .hero-flex-container { flex-direction: column !important; gap: 40px !important; text-align: center; }
            .hero-text-content { max-width: 100% !important; align-items: center; }
            .hero-desc { max-width: 100% !important; }
            .hero-image-container { max-width: 350px !important; margin: 0 auto; }
            .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            .about-image-wrapper { order: -1; }
            .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .skills-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {/* Particle Container */}
        <div
          ref={particleContainerRef}
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* NAV */}
        <nav
          ref={navRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            padding: "16px 6%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backdropFilter: "blur(20px)",
            background: "rgba(8,8,16,0.8)",
            borderBottom: "1px solid rgba(167,139,250,0.1)",
          }}
        >
          <div
            style={{
              fontWeight: 800,
              fontSize: isMobile ? 20 : 22,
              letterSpacing: "-0.5px",
              color: "#a78bfa",
            }}
          >
            Shirish Nayaju<span style={{ color: "#f0f0ff" }}>.</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="nav-desktop">
            {["home", "about", "skills", "projects", "contact"].map((s) => (
              <button
                key={s}
                className="nav-link"
                onClick={() => scrollTo(s)}
                style={{
                  background: "none",
                  border: "none",
                  color: activeSection === s ? "#f2f2f4" : "#9090b0",
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  letterSpacing: "0.5px",
                  textTransform: "capitalize",
                  padding: "4px 0",
                  marginLeft: "36px",
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger - Only visible on mobile */}
          <div className="nav-mobile">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              style={{
                background: "none",
                border: "none",
                color: "#f0f0ff",
                cursor: "pointer",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: 44,
                height: 44,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ 
                width: 26, 
                height: 2, 
                background: mobileMenuOpen ? "#a78bfa" : "#f0f0ff", 
                transition: "all 0.3s ease",
                transform: mobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none"
              }} />
              <div style={{ 
                width: 26, 
                height: 2, 
                background: mobileMenuOpen ? "transparent" : "#f0f0ff", 
                transition: "all 0.3s ease"
              }} />
              <div style={{ 
                width: 26, 
                height: 2, 
                background: mobileMenuOpen ? "#a78bfa" : "#f0f0ff", 
                transition: "all 0.3s ease",
                transform: mobileMenuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none"
              }} />
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(8,8,16,0.98)",
              backdropFilter: "blur(20px)",
              zIndex: 99,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 32,
            }}
          >
            {["home", "about", "skills", "projects", "contact"].map((s, i) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                style={{
                  background: "none",
                  border: "none",
                  color: activeSection === s ? "#a78bfa" : "#f0f0ff",
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 30,
                  fontWeight: 700,
                  cursor: "pointer",
                  textTransform: "capitalize",
                  letterSpacing: "2px",
                  opacity: 0,
                  animation: `slideInUp 0.5s ${i * 0.1}s forwards`,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* HERO */}
        <section
          id="home"
          ref={heroRef}
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            position: "relative",
            padding: isMobile ? "100px 4% 60px" : "120px 6% 80px",
            overflow: "hidden",
          }}
        >
          <div className="orb-1" style={{ position: "absolute", top: "10%", right: "5%", width: isMobile ? 200 : 500, height: isMobile ? 200 : 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.2) 0%, rgba(96,165,250,0.1) 40%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="orb-2" style={{ position: "absolute", bottom: "15%", left: "3%", width: isMobile ? 150 : 400, height: isMobile ? 150 : 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(244,114,182,0.15) 0%, rgba(167,139,250,0.1) 40%, transparent 70%)", filter: "blur(50px)" }} />
          <div className="orb-3" style={{ position: "absolute", top: "40%", left: "40%", width: isMobile ? 100 : 300, height: isMobile ? 100 : 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(167,139,250,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.03) 1px, transparent 1px)", backgroundSize: isMobile ? "40px 40px" : "60px 60px" }} />

          <div className="hero-flex-container" style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: isMobile ? 30 : 80, width: "100%", maxWidth: 1200, margin: "0 auto", flexDirection: isMobile ? "column-reverse" : "row" }}>
            <div className="hero-text-content" style={{ flex: 1, maxWidth: isMobile ? "100%" : 600, display: "flex", flexDirection: "column", alignItems: isMobile ? "center" : "flex-start" }}>
              <div className="hero-tag" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(239, 234, 234, 0.08)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: 100, padding: isMobile ? "4px 12px" : "6px 16px", fontSize: isMobile ? 11 : 13, color: "#f4f3f7", fontFamily: "'Space Mono', monospace", marginBottom: isMobile ? 20 : 28, letterSpacing: "0.5px", backdropFilter: "blur(10px)" }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#00ff11", display: "inline-block", boxShadow: "0 0 10px rgba(0, 255, 17, 0.5)", animation: "pulse 2s infinite" }} />
                Available for opportunities
              </div>

              <h1 ref={nameRef} className="hero-title" style={{ fontSize: isMobile ? "clamp(42px, 10vw, 64px)" : "clamp(52px, 8vw, 96px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-3px", marginBottom: isMobile ? 16 : 20, textAlign: isMobile ? "center" : "left" }}>
                Shirish
                <span className="gradient-text" style={{ display: "block" }}>Nayaju</span>
              </h1>

              <div ref={subtitleRef} style={{ fontFamily: "'Space Mono', monospace", fontSize: isMobile ? "clamp(12px, 3vw, 16px)" : "clamp(14px, 2vw, 18px)", color: "#f9f9fb", marginBottom: isMobile ? 16 : 20, letterSpacing: "2px", textAlign: isMobile ? "center" : "left" }}>
                BIT Graduate · UI/UX Designer · React Developer
              </div>

              <p className="hero-desc" style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.9, color: "#a0a0c0", maxWidth: isMobile ? "100%" : 560, marginBottom: isMobile ? 30 : 40, textAlign: isMobile ? "center" : "left" }}>
                I bridge the gap between design and development — crafting beautiful interfaces in Figma and bringing them to life with React & GSAP animations.
              </p>

            <div 
                className="hero-cta-container"
                style={{ 
                  display: "flex", 
                  gap: 16, 
                  flexWrap: "wrap", 
                  marginBottom: isMobile ? 40 : 60,
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                <button
                  className="hero-cta btn-primary"
                  onClick={() => scrollTo("projects")}
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                    border: "none",
                    borderRadius: 12,
                    padding: isMobile ? "14px 28px" : "16px 36px",
                    color: "#fff",
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: isMobile ? 14 : 16,
                    cursor: isMobile ? "pointer" : "none",
                    letterSpacing: "0.3px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  View My Work →
                </button>
                <button
                  className="hero-cta btn-outline"
                  onClick={() => scrollTo("contact")}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(167,139,250,0.5)",
                    borderRadius: 12,
                    padding: isMobile ? "14px 28px" : "16px 36px",
                    color: "#f9f9f9",
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 600,
                    fontSize: isMobile ? 14 : 16,
                    cursor: isMobile ? "pointer" : "none",
                  }}
                >
                  Get In Touch
                </button>
              </div>


              <div className="floating-badge-container" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: isMobile ? "center" : "flex-start" }}>
                {["🎨 Figma Pro", "⚛️ React", "✨ GSAP", "🎓 BIT"].map((b) => (
                  <div key={b} className="floating-badge hoverable" style={{ background: "rgba(133, 92, 246, 0.15)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: 8, padding: isMobile ? "8px 14px" : "10px 18px", fontSize: isMobile ? 11 : 13, color: "#e0d0ff", fontFamily: "'Space Mono', monospace", backdropFilter: "blur(10px)" }}>
                    {b}
                  </div>
                ))}
              </div>
            </div>

            <div ref={heroImageRef} className="hero-image-container" style={{ flex: isMobile ? "0 0 auto" : 1, display: "flex", justifyContent: "center", alignItems: "center", position: "relative", width: isMobile ? "100%" : "auto", maxWidth: isMobile ? 350 : "none" }}>
              <div className="image-container glow-border" onMouseMove={handleHeroImageMouseMove} onMouseLeave={handleHeroImageMouseLeave} style={{ width: "100%", maxWidth: isMobile ? 300 : 480, aspectRatio: "1/1", borderRadius: 24, overflow: "hidden", border: "2px solid rgba(167,139,250,0.4)", boxShadow: "0 40px 80px rgba(167,139,250,0.3), 0 0 60px rgba(167,139,250,0.1)", position: "relative", background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(96,165,250,0.1))" }}>
                <img src="/4bd84e4d-1e73-47ac-897c-2f83121c4528.jpg" alt="Shirish Nayaju" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;text-align:center;padding:20px"><div><div style="font-size:${isMobile?'60px':'80px'};margin-bottom:16px">👨‍💻</div><div style="font-family:'Space Mono',monospace;color:#a78bfa;font-size:14px">Your Photo</div></div></div>`; }} />
                <div className="shimmer-effect" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
                <div style={{ position: "absolute", inset: -30, borderRadius: 24, background: "radial-gradient(circle, rgba(167,139,250,0.3) 0%, transparent 60%)", filter: "blur(30px)", zIndex: -1, pointerEvents: "none", animation: "pulse 3s infinite" }} />
              </div>
            </div>
          </div>

          {!isMobile && (
            <div style={{ position: "absolute", bottom: 40, right: "6%", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#ffffff", letterSpacing: "3px" }}>SCROLL</div>
              <div style={{ width: 2, height: 60, background: "linear-gradient(to bottom, #a78bfa, transparent)", animation: "scrollLine 2s infinite" }} />
            </div>
          )}
        </section>

        {/* ABOUT */}
        <section id="about" style={{ padding: isMobile ? "60px 4%" : "100px 6%", position: "relative" }}>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems: "center", maxWidth: 1100, margin: "0 auto" }}>
            <div className="about-content">
              <div style={{ fontFamily: "'Space Mono', monospace", color: "#a78bfa", fontSize: isMobile ? 12 : 13, letterSpacing: "3px", marginBottom: 16 }}>01 / ABOUT ME</div>
              <h2 className="section-title section-title-text" style={{ fontSize: isMobile ? "clamp(32px, 7vw, 42px)" : "clamp(36px, 5vw, 52px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.1, marginBottom: 24 }}>
                Designer who
                <span className="gradient-text" style={{ display: "block" }}>codes.</span>
              </h2>
              <p style={{ fontSize: isMobile ? 15 : 16, lineHeight: 1.9, color: "#8080a0", marginBottom: 20 }}>I'm a fresh BIT graduate passionate about creating digital experiences that are both visually stunning and functionally excellent. My journey started with design — I fell in love with Figma and the craft of UI/UX.</p>
              <p style={{ fontSize: isMobile ? 15 : 16, lineHeight: 1.9, color: "#8080a0", marginBottom: 32 }}>Now I'm bridging that design knowledge into development, learning React and GSAP to bring my own designs to life. I believe the best products come from people who understand both sides.</p>
              <div className="stats-container" style={{ display: "flex", gap: 40, justifyContent: isMobile ? "center" : "flex-start" }}>
                {[["2+", "Years Figma"], ["10+", "UI Projects"], ["∞", "Curiosity"]].map(([num, label]) => (
                  <div key={label} style={{ textAlign: "center" }}>
                    <div className="stat-number" style={{ fontSize: isMobile ? 32 : 40, fontWeight: 800, color: "#a78bfa", letterSpacing: "-1px", marginBottom: 4 }}>{num}</div>
                    <div style={{ fontSize: isMobile ? 11 : 12, fontFamily: "'Space Mono', monospace", color: "#606080" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div ref={aboutImageRef} className="about-image about-image-wrapper" style={{ position: "relative", maxWidth: isMobile ? 400 : "none", margin: isMobile ? "0 auto" : 0 }}>
              <div className="image-container glow-border" onMouseMove={handleAboutImageMouseMove} onMouseLeave={handleAboutImageMouseLeave} style={{ position: "relative", width: "100%", aspectRatio: "4/5", borderRadius: 24, overflow: "hidden", background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(96,165,250,0.1))", border: "2px solid rgba(167,139,250,0.3)", boxShadow: "0 30px 60px rgba(167,139,250,0.2)" }}>
                <img src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&h=750&fit=crop" alt="About Me" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;text-align:center;padding:20px"><div><div style="font-size:80px;margin-bottom:16px">👨‍💻</div><div style="font-family:'Space Mono',monospace;color:#505080;font-size:14px">My Photo</div></div></div>`; }} />
                <div className="shimmer-effect" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: -30, right: -30, width: isMobile ? 120 : 180, height: isMobile ? 120 : 180, borderRadius: "50%", background: "rgba(167,139,250,0.15)", filter: "blur(40px)", animation: "pulse 4s infinite" }} />
              </div>
              <div ref={floatingCardRef} style={{ position: "absolute", bottom: isMobile ? 20 : 40, left: isMobile ? "50%" : -30, transform: isMobile ? "translateX(-50%)" : "none", background: "rgba(8,8,16,0.95)", border: "1px solid rgba(167,139,250,0.5)", borderRadius: 16, padding: isMobile ? "14px 18px" : "18px 24px", backdropFilter: "blur(20px)", boxShadow: "0 15px 40px rgba(167,139,250,0.2)", whiteSpace: "nowrap", zIndex: 2, animation: "floatUpDown 3s ease-in-out infinite" }}>
                <div style={{ fontSize: isMobile ? 11 : 12, color: "#a78bfa", fontFamily: "'Space Mono', monospace", marginBottom: 6 }}>Currently Learning</div>
                <div style={{ fontWeight: 700, fontSize: isMobile ? 14 : 16 }}>React + GSAP ✨</div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" style={{ padding: isMobile ? "60px 4%" : "100px 6%", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", position: "relative" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", color: "#a78bfa", fontSize: isMobile ? 12 : 13, letterSpacing: "3px", marginBottom: 16 }}>02 / SKILLS</div>
            <h2 className="section-title section-title-text" style={{ fontSize: isMobile ? "clamp(32px, 7vw, 42px)" : "clamp(36px, 5vw, 52px)", fontWeight: 800, letterSpacing: "-2px", marginBottom: isMobile ? 40 : 64, display: "flex", alignItems: "center", gap: 16 }}>
              My Toolkit
              <span className="title-line" style={{ flex: 1, height: 2, background: "linear-gradient(90deg, #a78bfa, transparent)", display: isMobile ? "none" : "block", transformOrigin: "left" }} />
            </h2>
            <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 16 : 24 }}>
              {skills.map((skill, i) => (
                <div key={skill.name} ref={(el) => (skillsRef.current[i] = el)} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: isMobile ? "20px" : "28px 32px", transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => { if(!isMobile) gsap.to(e.currentTarget,{background:"rgba(167,139,250,0.08)",borderColor:"rgba(167,139,250,0.3)",scale:1.02,duration:0.3}); }}
                  onMouseLeave={(e) => { if(!isMobile) gsap.to(e.currentTarget,{background:"rgba(255,255,255,0.03)",borderColor:"rgba(255,255,255,0.08)",scale:1,duration:0.3}); }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: isMobile ? 20 : 26 }}>{skill.icon}</span>
                      <span style={{ fontWeight: 700, fontSize: isMobile ? 15 : 17 }}>{skill.name}</span>
                    </div>
                    <span className="skill-counter" style={{ fontFamily: "'Space Mono', monospace", fontSize: isMobile ? 12 : 14, color: skill.color, fontWeight: 700 }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: isMobile ? 6 : 8, background: "rgba(255,255,255,0.05)", borderRadius: 100, overflow: "hidden" }}>
                    <div className="skill-bar-fill" style={{ height: "100%", width: "0%", borderRadius: 100, background: `linear-gradient(90deg, ${skill.color}66, ${skill.color})`, boxShadow: `0 0 10px ${skill.color}44` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" style={{ padding: isMobile ? "60px 4%" : "100px 6%" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", color: "#a78bfa", fontSize: isMobile ? 12 : 13, letterSpacing: "3px", marginBottom: 16 }}>03 / PROJECTS</div>
            <h2 className="section-title section-title-text" style={{ fontSize: isMobile ? "clamp(32px, 7vw, 42px)" : "clamp(36px, 5vw, 52px)", fontWeight: 800, letterSpacing: "-2px", marginBottom: isMobile ? 40 : 64, display: "flex", alignItems: "center", gap: 16 }}>
              Selected Work
              <span className="title-line" style={{ flex: 1, height: 2, background: "linear-gradient(90deg, #a78bfa, transparent)", display: isMobile ? "none" : "block", transformOrigin: "left" }} />
            </h2>
            <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 24 : 28 }}>
              {projects.map((p, i) => (
                <a key={p.title} ref={(el) => (cardsRef.current[i] = el)} href={p.link} target="_blank" rel="noopener noreferrer" className="card-hover hoverable" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden", cursor: "pointer", textDecoration: "none", color: "inherit", display: "block" }}>
                  <div className="project-image-container" style={{ height: isMobile ? 200 : 240, position: "relative", overflow: "hidden" }}>
                    <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { e.target.style.display='none'; e.target.parentElement.style.background=`linear-gradient(135deg,${p.gradient.includes("pink")?"#ec4899,#e11d48":p.gradient.includes("violet")?"#8b5cf6,#6d28d9":"#06b6d4,#2563eb"})`; e.target.parentElement.innerHTML+=`<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:64px">${p.emoji}</div>`; }} />
                    <div className="project-overlay" onMouseEnter={(e) => { if(!isMobile) gsap.to(e.currentTarget,{opacity:1,duration:0.3}); }} onMouseLeave={(e) => { if(!isMobile) gsap.to(e.currentTarget,{opacity:0,duration:0.3}); }}>
                      <span style={{ background: "rgba(255,255,255,0.95)", color: "#7c3aed", padding: "10px 24px", borderRadius: 8, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "0.5px" }}>View Project →</span>
                    </div>
                  </div>
                  <div style={{ padding: isMobile ? "20px" : "28px" }}>
                    <h3 style={{ fontSize: isMobile ? 18 : 21, fontWeight: 700, marginBottom: 12, letterSpacing: "-0.5px", color: "#f0f0ff" }}>{p.title}</h3>
                    <p style={{ fontSize: isMobile ? 13 : 14, color: "#7070a0", lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {p.tags.map((tag) => (
                        <span key={tag} style={{ background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.2)", borderRadius: 6, padding: "5px 12px", fontSize: isMobile ? 11 : 12, color: "#c0b0ff", fontFamily: "'Space Mono', monospace" }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ padding: isMobile ? "60px 4% 50px" : "120px 6% 100px", borderTop: "1px solid rgba(255,255,255,0.05)", position: "relative" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", color: "#a78bfa", fontSize: isMobile ? 12 : 13, letterSpacing: "3px", marginBottom: 16 }}>04 / CONTACT</div>
            <h2 className="section-title section-title-text" style={{ fontSize: isMobile ? "clamp(32px, 7vw, 48px)" : "clamp(40px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.1, marginBottom: 24 }}>
              Let's build something
              <span className="gradient-text" style={{ display: "block" }}>great together.</span>
            </h2>
            <p style={{ fontSize: isMobile ? 15 : 18, color: "#8080a0", lineHeight: 1.8, marginBottom: 56 }}>I'm open to internships, freelance projects, and full-time opportunities. Let's talk on WhatsApp!</p>

            <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="whatsapp-btn" style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "linear-gradient(135deg, #25D366, #128C7E)", border: "none", borderRadius: 16, padding: isMobile ? "16px 40px" : "20px 56px", color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: isMobile ? 16 : 18, textDecoration: "none", marginBottom: 56, width: isMobile ? "100%" : "auto", justifyContent: "center" }}
              onMouseEnter={(e) => gsap.to(e.currentTarget,{scale:1.05,boxShadow:"0 25px 60px rgba(37,211,102,0.5)",duration:0.3})}
              onMouseLeave={(e) => gsap.to(e.currentTarget,{scale:1,boxShadow:"none",duration:0.3})}>
              <span style={{ fontSize: "1.4em" }}>💬</span> Say Hello on WhatsApp →
            </a>

            <div className="contact-links" style={{ display: "flex", justifyContent: "center", gap: isMobile ? 20 : 36, flexWrap: "wrap", marginBottom: 32 }}>
              {[{ name: "GitHub", icon: "💻", link: socialLinks.github },{ name: "LinkedIn", icon: "💼", link: socialLinks.linkedin },{ name: "Instagram", icon: "📸", link: socialLinks.instagram },{ name: "Facebook", icon: "👥", link: socialLinks.facebook },{ name: "Gmail", icon: "📧", link: socialLinks.gmail }].map((social) => (
                <a key={social.name} href={social.link} target="_blank" rel="noopener noreferrer" className="social-link" style={{ fontFamily: "'Space Mono', monospace", fontSize: isMobile ? 13 : 14, color: "#8080b0", textDecoration: "none", letterSpacing: "1px" }}
                  onMouseEnter={(e) => gsap.to(e.currentTarget,{color:"#a78bfa",y:-3,duration:0.3})}
                  onMouseLeave={(e) => gsap.to(e.currentTarget,{color:"#8080b0",y:0,duration:0.3})}>
                  <span style={{ fontSize: "1.2em" }}>{social.icon}</span> {social.name}
                </a>
              ))}
            </div>

            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: isMobile ? 12 : 13, color: "#606080", marginTop: 16 }}>
              Or email me at{" "}
              <a href={socialLinks.gmail} style={{ color: "#a78bfa", textDecoration: "none", borderBottom: "1px dashed rgba(167,139,250,0.5)" }}>Shirishnayaju@gmail.com</a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ padding: isMobile ? "24px 4%" : "32px 6%", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 16 : 0 }}>
          <div style={{ fontWeight: 800, fontSize: isMobile ? 16 : 18, background: "linear-gradient(135deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Shirish Nayaju.</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: isMobile ? 11 : 12, color: "#505070" }}>Built with ❤️ using React + GSAP · {new Date().getFullYear()}</div>
        </footer>
      </div>
    </>
  );
}