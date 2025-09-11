import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, BarChart3, Clock, Users, Shield, Zap, CheckCircle, 
  BookOpen, Brain, Target, Sparkles 
} from 'lucide-react';

interface FeaturesPageProps {
  onBack: () => void;
}

// ============================================================================
// Enhanced UI Components
// ============================================================================

// --- Interactive 3D Card ---
const Card = ({ children, className = "", delay = 0, ...props }: { children: React.ReactNode; className?: string; delay?: number; [key: string]: any }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    cardRef.current.style.setProperty('--rotate-x', `${-y}deg`);
    cardRef.current.style.setProperty('--rotate-y', `${x}deg`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--rotate-x', '0deg');
    cardRef.current.style.setProperty('--rotate-y', '0deg');
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`bg-slate-800/40 backdrop-blur-lg border border-slate-700/80 rounded-2xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300 [transform-style:preserve-3d] [transform:rotateX(var(--rotate-x,0))_rotateY(var(--rotate-y,0))] relative overflow-hidden group ${className}`} 
      style={{ animationDelay: `${delay}ms` }}
      {...props}
    >
      {/* Subtle shine effect on hover */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pb-4 ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-4 flex-grow ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-xl font-bold text-slate-100 mb-2 ${className}`}>{children}</h3>
);

const CardDescription = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-slate-400 leading-relaxed text-sm ${className}`}>{children}</p>
);

// --- Polished Button ---
const Button = ({ onClick, children, variant = "default", className = "" }: { onClick?: () => void; children: React.ReactNode; variant?: "default" | "outline"; className?: string; }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-semibold text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-blue-500 relative overflow-hidden group h-11 px-6";
  const variants = {
    default: "bg-blue-600 text-white shadow-lg hover:bg-blue-500 hover:shadow-blue-500/40 hover:-translate-y-0.5",
    outline: "border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600"
  };

  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`}>
      <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white/20 rounded-full group-hover:w-56 group-hover:h-56"></span>
      <span className="relative">{children}</span>
    </button>
  );
};

// ============================================================================
// Main Features Page Component
// ============================================================================
export function FeaturesPage({ onBack }: FeaturesPageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    // Data remains the same, but now includes a unique color for each icon
    { icon: BarChart3, title: "Advanced Analytics", description: "Transform raw data into actionable insights with comprehensive dashboards.", highlights: ["Real-time data visualization", "Predictive analytics", "Custom reports"], color: "text-purple-400", glow: "shadow-purple-500/50" },
    { icon: Clock, title: "Real-time Monitoring", description: "Stay connected with live updates on attendance, performance, and engagement.", highlights: ["Live attendance tracking", "Performance alerts", "Instant notifications"], color: "text-sky-400", glow: "shadow-sky-500/50" },
    { icon: Users, title: "Collaborative Learning", description: "Foster meaningful connections with integrated communication and project tools.", highlights: ["Team collaboration", "Discussion forums", "Peer-to-peer learning"], color: "text-emerald-400", glow: "shadow-emerald-500/50" },
    { icon: Brain, title: "AI-Powered Insights", description: "Leverage machine learning for personalized learning paths and recommendations.", highlights: ["Personalized recommendations", "Learning pattern analysis", "Smart content"], color: "text-rose-400", glow: "shadow-rose-500/50" },
    { icon: Shield, title: "Enterprise Security", description: "Bank-level encryption and compliance standards to protect your sensitive data.", highlights: ["End-to-end encryption", "FERPA compliance", "2FA enabled"], color: "text-red-400", glow: "shadow-red-500/50" },
    { icon: Zap, title: "Lightning Performance", description: "Experience blazing-fast load times with our optimized cloud infrastructure.", highlights: ["Sub-second responses", "99.9% uptime guarantee", "Global CDN"], color: "text-amber-400", glow: "shadow-amber-500/50" }
  ];

  return (
    <div className="min-h-screen w-full bg-[#020418] text-white relative overflow-hidden">
      {/* Aurora Mouse Follower */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
        }}
      ></div>

      {/* Background Blobs & Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)] opacity-30"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <header className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2 mb-12">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-slate-100 to-slate-400 mb-6">
              The Future of Education, Evolved.
            </h1>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
              Discover the comprehensive suite of tools designed to enhance learning, 
              streamline administration, and drive student success.
            </p>
          </div>
        </header>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-20 [perspective:1000px]">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              delay={150 * index}
              className={`animate-fadeInUp ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ animationDelay: `${300 + index * 150}ms` }}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-slate-800 shadow-inner-lg ${feature.glow}`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
                <div className="mt-6 space-y-3">
                  {feature.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        
      </div>

      {/* Embedded CSS for custom styles if not using a config file */}
      <style>{`
        .shadow-inner-lg {
          box-shadow: inset 0 2px 4px 0 rgba(0,0,0,0.2), 0 1px 2px 0 rgba(255,255,255,0.05);
        }
      `}</style>
    </div>
  );
}