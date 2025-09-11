import React, { useState, useEffect, useRef } from 'react';
import {
    ArrowLeft,
    Users,
    GraduationCap,
    BarChart3,
    Shield,
    Zap,
    CheckCircle,
    Sparkles,
    Star,
    Brain,
    Target
} from 'lucide-react';

interface SolutionsPageProps {
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
    const x = (e.clientX - left - width / 2) / 20; // Reduced sensitivity
    const y = (e.clientY - top - height / 2) / 20;
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
    <h3 className={`text-2xl font-bold text-slate-100 mb-2 ${className}`}>{children}</h3>
);

const CardDescription = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <p className={`text-slate-400 leading-relaxed ${className}`}>{children}</p>
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
// Main Solutions Page Component
// ============================================================================
export function SolutionsPage({ onBack }: SolutionsPageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const solutions = [
    {
        icon: Users,
        title: "For Students",
        description: "Personalized dashboards, real-time tracking, and AI-powered tools to enhance your educational journey.",
        features: ["Personal academic metrics", "Real-time attendance & grades", "AI-powered study recommendations", "Career guidance insights"],
        color: "text-sky-400",
        glow: "shadow-sky-500/50"
    },
    {
        icon: GraduationCap,
        title: "For Educators",
        description: "Comprehensive tools for student management, performance analytics, and streamlined administrative workflows.",
        features: ["Student progress monitoring", "Automated attendance tracking", "Performance analytics", "Parent communication portal"],
        color: "text-purple-400",
        glow: "shadow-purple-500/50"
    },
    {
        icon: BarChart3,
        title: "For Administrators",
        description: "Advanced analytics and reporting to make data-driven decisions and optimize institutional performance.",
        features: ["Institution-wide analytics", "Student retention insights", "Resource optimization", "Compliance & strategic reporting"],
        color: "text-emerald-400",
        glow: "shadow-emerald-500/50"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#020418] text-white relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      
      <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)] opacity-30"></div>
      </div>

      <div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{ background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)` }}
      ></div>

      <div className="relative z-10 container w-full">
        <header className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2 mb-12">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-slate-100 to-slate-400 mb-6">
              Solutions for Every Role
            </h1>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
              Our platform is engineered to empower every member of your educational community, from students to administrators.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-20 [perspective:1000px]">
          {solutions.map((solution, index) => (
            <Card
              key={index}
              delay={150 * index}
              className={`animate-fadeInUp flex flex-col ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ animationDelay: `${300 + index * 150}ms` }}
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-slate-800 shadow-inner-lg ${solution.glow}`}>
                  <solution.icon className={`h-8 w-8 ${solution.color}`} />
                </div>
                <CardTitle>{solution.title}</CardTitle>
                <CardDescription>{solution.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-t border-slate-700/50 my-4"></div>
                <div className="space-y-4">
                  {solution.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        
      </div>

      <style>{`.shadow-inner-lg { box-shadow: inset 0 2px 4px 0 rgba(0,0,0,0.2), 0 1px 2px 0 rgba(255,255,255,0.05); }`}</style>
    </div>
  );
}