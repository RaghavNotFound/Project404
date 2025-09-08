import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { CollegeSelection } from "./components/CollegeSelection";
import { Login, UserRole } from "./components/Login";

// Lazy load dashboard components for code splitting
const StudentDashboard = lazy(() => import("./components/StudentDashboard").then(module => ({ default: module.StudentDashboard })));
const ParentDashboard = lazy(() => import("./components/ParentDashboard").then(module => ({ default: module.ParentDashboard })));
const FacultyDashboard = lazy(() => import("./components/FacultyDashboard").then(module => ({ default: module.FacultyDashboard })));
const AdminDashboard = lazy(() => import("./components/AdminDashboard").then(module => ({ default: module.AdminDashboard })));

// Lazy load feature pages
const FeaturesPage = lazy(() => import("./components/FeaturesPage").then(module => ({ default: module.FeaturesPage })));
const SolutionsPage = lazy(() => import("./components/SolutionsPage").then(module => ({ default: module.SolutionsPage })));
const SupportPage = lazy(() => import("./components/SupportPage").then(module => ({ default: module.SupportPage })));

export interface UserData {
  email: string;
  role: UserRole;
  college: string;
  name: string;
  id: string;
}

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

// Wrapper components for routing
const LandingPageWrapper = () => {
  const navigate = useNavigate();
  
  const handleNavigate = (page: string) => {
    switch (page) {
      case "college-selection":
        navigate("/college-selection");
        break;
      case "features":
        navigate("/features");
        break;
      case "solutions":
        navigate("/solutions");
        break;
      case "support":
        navigate("/support");
        break;
      default:
        console.log(`Navigation to ${page} not implemented`);
    }
  };

  return <LandingPage onNavigate={handleNavigate} />;
};

const CollegeSelectionWrapper = () => {
  const navigate = useNavigate();
  
  const handleCollegeSelect = (college: string) => {
    navigate(`/login/${encodeURIComponent(college)}`);
  };

  return <CollegeSelection onCollegeSelect={handleCollegeSelect} />;
};

const LoginWrapper = () => {
  const navigate = useNavigate();
  const { college } = useParams<{ college: string }>();
  
  const handleLogin = (role: UserRole, user: UserData) => {
    // Store user data in sessionStorage for persistence
    sessionStorage.setItem('userData', JSON.stringify(user));
    navigate(`/dashboard/${role}/${user.id}`);
  };

  const handleBack = () => {
    navigate("/college-selection");
  };

  return (
    <Login 
      college={college ? decodeURIComponent(college) : ""} 
      onLogin={handleLogin} 
      onBack={handleBack}
    />
  );
};

const FeaturesPageWrapper = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate("/");
  };

  return <FeaturesPage onBack={handleBack} />;
};

const SolutionsPageWrapper = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate("/");
  };

  return <SolutionsPage onBack={handleBack} />;
};

const SupportPageWrapper = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate("/");
  };

  return <SupportPage onBack={handleBack} />;
};

// Dashboard wrapper components
const StudentDashboardWrapper = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  
  // Get user data from sessionStorage or redirect to login
  const userDataStr = sessionStorage.getItem('userData');
  if (!userDataStr) {
    navigate('/college-selection');
    return null;
  }
  
  const userData: UserData = JSON.parse(userDataStr);
  
  const handleLogout = () => {
    sessionStorage.removeItem('userData');
    navigate("/");
  };

  return <StudentDashboard userData={userData} onLogout={handleLogout} />;
};

const ParentDashboardWrapper = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  
  const userDataStr = sessionStorage.getItem('userData');
  if (!userDataStr) {
    navigate('/college-selection');
    return null;
  }
  
  const userData: UserData = JSON.parse(userDataStr);
  
  const handleLogout = () => {
    sessionStorage.removeItem('userData');
    navigate("/");
  };

  return <ParentDashboard userData={userData} onLogout={handleLogout} />;
};

const FacultyDashboardWrapper = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  
  const userDataStr = sessionStorage.getItem('userData');
  if (!userDataStr) {
    navigate('/college-selection');
    return null;
  }
  
  const userData: UserData = JSON.parse(userDataStr);
  
  const handleLogout = () => {
    sessionStorage.removeItem('userData');
    navigate("/");
  };

  return <FacultyDashboard userData={userData} onLogout={handleLogout} />;
};

const AdminDashboardWrapper = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  
  const userDataStr = sessionStorage.getItem('userData');
  if (!userDataStr) {
    navigate('/college-selection');
    return null;
  }
  
  const userData: UserData = JSON.parse(userDataStr);
  
  const handleLogout = () => {
    sessionStorage.removeItem('userData');
    navigate("/");
  };

  return <AdminDashboard userData={userData} onLogout={handleLogout} />;
};

export default function App() {
  return (
    <Router>
      <div className="size-full">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Landing page route */}
            <Route path="/" element={<LandingPageWrapper />} />
            
            {/* College selection route */}
            <Route path="/college-selection" element={<CollegeSelectionWrapper />} />
            
            {/* Login route with college parameter */}
            <Route path="/login/:college?" element={<LoginWrapper />} />
            
            {/* Feature pages routes */}
            <Route path="/features" element={<FeaturesPageWrapper />} />
            <Route path="/solutions" element={<SolutionsPageWrapper />} />
            <Route path="/support" element={<SupportPageWrapper />} />
            
            {/* Dashboard routes with role-based routing */}
            <Route path="/dashboard/student/:userId?" element={<StudentDashboardWrapper />} />
            <Route path="/dashboard/parent/:userId?" element={<ParentDashboardWrapper />} />
            <Route path="/dashboard/faculty/:userId?" element={<FacultyDashboardWrapper />} />
            <Route path="/dashboard/admin/:userId?" element={<AdminDashboardWrapper />} />
            
            {/* Fallback route */}
            <Route path="*" element={<LandingPageWrapper />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}