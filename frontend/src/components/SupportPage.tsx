import React, { useState, useEffect, useRef } from 'react';
import {
    ArrowLeft, Phone, Mail, MessageSquare, Clock, Send, CheckCircle, FileText,
    Video, Users, Headphones, HelpCircle, Sparkles
} from 'lucide-react';

interface SupportPageProps {
  onBack: () => void;
}

// ============================================================================
// Enhanced UI Components
// ============================================================================

// --- Interactive 3D Card ---
const Card = ({ children, className = "", ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => {
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
            {...props}
        >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 h-full flex flex-col">
                {children}
            </div>
        </div>
    );
};

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`p-6 flex-grow ${className}`}>{children}</div>
);

// --- Polished Button ---
const Button = ({ onClick, children, variant = "default", className = "", type = "button" }: { onClick?: () => void; children: React.ReactNode; variant?: "default" | "outline"; className?: string; type?: "button" | "submit" }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-lg font-semibold text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-blue-500 relative overflow-hidden group h-11 px-6";
    const variants = {
        default: "bg-blue-600 text-white shadow-lg hover:bg-blue-500 hover:shadow-blue-500/40 hover:-translate-y-0.5",
        outline: "border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600"
    };
    return (
        <button type={type} onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`}>
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white/20 rounded-full group-hover:w-56 group-hover:h-56"></span>
            <span className="relative">{children}</span>
        </button>
    );
};

// --- Styled Form Components ---
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} className={`flex h-11 w-full rounded-md border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors ${props.className}`} />
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea {...props} className={`flex min-h-[120px] w-full rounded-md border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors resize-y ${props.className}`} />
);

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
     <select {...props} className={`flex h-11 w-full rounded-md border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors ${props.className}`} />
);

const Label = (props: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label {...props} className={`text-sm font-medium text-slate-300 ${props.className}`} />
);


// ============================================================================
// Main Support Page Component
// ============================================================================
export function SupportPage({ onBack }: SupportPageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', priority: 'medium' });

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Support ticket submitted successfully!');
    setFormData({ name: '', email: '', subject: '', message: '', priority: 'medium' });
  };

  const supportChannels = [
    { icon: Phone, title: "Phone Support", contact: "+1 (555) 123-4567", availability: "24/7 Support", color: "text-sky-400" },
    { icon: Mail, title: "Email Support", contact: "support@evolved.edu", availability: "Response within 24hrs", color: "text-purple-400" },
    { icon: MessageSquare, title: "Live Chat", contact: "Available on platform", availability: "Mon-Fri 9AM-6PM", color: "text-emerald-400" }
  ];

  return (
    <div className="min-h-screen w-full bg-[#020418] text-white relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)] opacity-30"></div>
      </div>
      <div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{ background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)` }}
      ></div>

      {/* Back Button - Moved to the top-left corner of the page */}
       <Button
    variant="outline"
    onClick={onBack}
    className="fixed top-4 left-4 z-50 flex items-center gap-2"
  >
    <ArrowLeft className="h-4 w-4" />
    Back to Home
  </Button>

      <div className="relative z-10 container w-full">
        <header className="text-center transition-opacity duration-1000 animate-fadeInUp">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-slate-100 to-slate-400 mb-4">
            Support Center
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            Get the help you need, when you need it. Our dedicated team is here to ensure your success.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-5 gap-8 py-16">
          {/* Left Column: Support Channels */}
          <div className="lg:col-span-2 space-y-6">
            {supportChannels.map((channel, index) => (
              <Card key={index} className="animate-fadeInUp" style={{ animationDelay: `${200 + index * 150}ms` }}>
                <CardContent className="flex items-center gap-4">
                  <channel.icon className={`h-8 w-8 ${channel.color} flex-shrink-0`} />
                  <div>
                    <h3 className="font-semibold text-slate-100">{channel.title}</h3>
                    <p className="text-sm text-slate-300">{channel.contact}</p>
                    <p className="text-xs text-slate-400 mt-1">{channel.availability}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-3">
            <Card className="animate-fadeInUp" style={{ animationDelay: '600ms' }}>
              <CardContent>
                <h2 className="text-2xl font-bold mb-6 text-slate-100">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" value={formData.subject} onChange={handleInputChange} placeholder="Briefly describe your issue" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" value={formData.message} onChange={handleInputChange} placeholder="Please provide details about your issue..." required />
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    <Send className="h-4 w-4" />
                    Submit Ticket
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}