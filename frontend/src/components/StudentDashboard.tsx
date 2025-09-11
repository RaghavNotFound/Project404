import React, { useState } from "react";
import { 
  ArrowLeft, 
  User, 
  BookOpen, 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Save,
  Calendar,
  Award,
  TrendingUp,
  AlertTriangle,
  FileText,
  Eye,
  Edit,
  X,
  ChevronRight,
  ChevronLeft,
  Check
} from "lucide-react";

interface StudentFormData {
  // Personal Information
  studentId: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  studentEmail: string;
  phoneNumber: string;
  address: string;
  fatherName: string;
  motherName: string;
  guardianName: string;
  guardianPhoneNumber: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  nationality: string;
  religion: string;
  caste: string;
  category: string;
  aadharNumber: string;
  
  // Academic Information
  currentCGPA: string;
  previousSemesterCGPA: string;
  semester: string;
  batch: string;
  department: string;
  internalAssessmentMarks: string;
  midSemResults: string;
  backlogs: string;
  attendancePercentage: string;
  subjectWiseAttendance: string;
  
  // Other Information
  extracurricularParticipation: string;
  academicRiskScore: string;
  financialRiskScore: string;
  psychologicalRiskScore: string;
  disciplinaryActions: string;
}

interface StudentFormProps {
  onBack: () => void;
  userRole?: "student" | "parent" | "faculty";
  initialData?: Partial<StudentFormData>;
}

// Professional UI Components
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-6 py-4 bg-gray-50 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const Button = ({ 
  onClick, 
  children, 
  variant = "primary", 
  size = "md",
  className = "",
  type = "button",
  disabled = false
}: { 
  onClick?: () => void; 
  children: React.ReactNode; 
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 shadow-sm",
    outline: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

const Input = ({ 
  id, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  required = false,
  disabled = false,
  className = "",
  error,
  step,
  min,
  max
}: { 
  id?: string; 
  type?: string; 
  placeholder?: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
  step?: string;
  min?: string;
  max?: string;
}) => (
  <div>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      step={step}
      min={min}
      max={max}
      className={`block w-full px-3 py-2 border rounded-md shadow-sm text-sm placeholder-gray-500 focus:outline-none focus:ring-1 transition-colors ${
        error 
          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
      } ${disabled ? 'bg-gray-50 text-gray-500' : 'bg-white'} ${className}`}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);const Select = ({ 
  id, 
  value, 
  onChange, 
  children, 
  required = false,
  disabled = false,
  className = "",
  error
}: { 
  id?: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; 
  children: React.ReactNode; 
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
}) => (
  <div>
    <select
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className={`block w-full px-3 py-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 transition-colors ${
        error 
          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
      } ${disabled ? 'bg-gray-50 text-gray-500' : 'bg-white'} ${className}`}
    >
      {children}
    </select>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const Textarea = ({ 
  id, 
  placeholder, 
  value, 
  onChange, 
  required = false,
  disabled = false,
  rows = 3,
  className = "",
  error
}: { 
  id?: string; 
  placeholder?: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; 
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
  error?: string;
}) => (
  <div>
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      rows={rows}
      className={`block w-full px-3 py-2 border rounded-md shadow-sm text-sm placeholder-gray-500 focus:outline-none focus:ring-1 transition-colors resize-none ${
        error 
          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
      } ${disabled ? 'bg-gray-50 text-gray-500' : 'bg-white'} ${className}`}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const Label = ({ htmlFor, children, className = "", required = false }: { 
  htmlFor?: string; 
  children: React.ReactNode; 
  className?: string;
  required?: boolean;
}) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}>
    {children}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
);

const ProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div 
      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
      style={{ width: `${(current / total) * 100}%` }}
    />
  </div>
);

export function StudentForm({ onBack, userRole = "student", initialData }: StudentFormProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof StudentFormData, string>>>({});
  const [formData, setFormData] = useState<StudentFormData>({
    // Personal Information
    studentId: initialData?.studentId || "",
    fullName: initialData?.fullName || "",
    dateOfBirth: initialData?.dateOfBirth || "",
    gender: initialData?.gender || "",
    studentEmail: initialData?.studentEmail || "",
    phoneNumber: initialData?.phoneNumber || "",
    address: initialData?.address || "",
    fatherName: initialData?.fatherName || "",
    motherName: initialData?.motherName || "",
    guardianName: initialData?.guardianName || "",
    guardianPhoneNumber: initialData?.guardianPhoneNumber || "",
    emergencyContactName: initialData?.emergencyContactName || "",
    emergencyContactNumber: initialData?.emergencyContactNumber || "",
    nationality: initialData?.nationality || "Indian",
    religion: initialData?.religion || "",
    caste: initialData?.caste || "",
    category: initialData?.category || "",
    aadharNumber: initialData?.aadharNumber || "",
    
    // Academic Information
    currentCGPA: initialData?.currentCGPA || "",
    previousSemesterCGPA: initialData?.previousSemesterCGPA || "",
    semester: initialData?.semester || "",
    batch: initialData?.batch || "",
    department: initialData?.department || "",
    internalAssessmentMarks: initialData?.internalAssessmentMarks || "",
    midSemResults: initialData?.midSemResults || "",
    backlogs: initialData?.backlogs || "0",
    attendancePercentage: initialData?.attendancePercentage || "",
    subjectWiseAttendance: initialData?.subjectWiseAttendance || "",
    
    // Other Information
    extracurricularParticipation: initialData?.extracurricularParticipation || "",
    academicRiskScore: initialData?.academicRiskScore || "",
    financialRiskScore: initialData?.financialRiskScore || "",
    psychologicalRiskScore: initialData?.psychologicalRiskScore || "",
    disciplinaryActions: initialData?.disciplinaryActions || "",
  });

  const steps = [
    {
      id: "personal",
      title: "Personal Information",
      icon: User,
      description: "Basic details and contact information"
    },
    {
      id: "academic",
      title: "Academic Records",
      icon: BookOpen,
      description: "Performance and attendance data"
    },
    {
      id: "additional",
      title: "Additional Information",
      icon: FileText,
      description: "Risk assessment and activities"
    }
  ];

  const validateField = (field: keyof StudentFormData, value: string): string => {
    switch (field) {
      case 'studentEmail':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        break;
      case 'phoneNumber':
      case 'guardianPhoneNumber':
      case 'emergencyContactNumber':
        if (value && !/^[+]?[\d\s-()]{10,}$/.test(value)) {
          return 'Please enter a valid phone number';
        }
        break;
      case 'currentCGPA':
      case 'previousSemesterCGPA':
        if (value && (parseFloat(value) < 0 || parseFloat(value) > 10)) {
          return 'CGPA must be between 0 and 10';
        }
        break;
      case 'attendancePercentage':
        if (value && (parseFloat(value) < 0 || parseFloat(value) > 100)) {
          return 'Attendance must be between 0 and 100%';
        }
        break;
      case 'aadharNumber':
        if (value && !/^\d{12}$/.test(value.replace(/\s/g, ''))) {
          return 'Aadhar number must be 12 digits';
        }
        break;
    }
    return '';
  };

  const handleInputChange = (field: keyof StudentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    const error = validateField(field, value);
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const validateStep = (stepIndex: number): boolean => {
    const newErrors: Partial<Record<keyof StudentFormData, string>> = {};
    
    if (stepIndex === 0) {
      // Personal information validation
      const requiredFields = ['studentId', 'fullName', 'dateOfBirth', 'gender', 'studentEmail', 'phoneNumber', 'address'];
      requiredFields.forEach(field => {
        if (!formData[field as keyof StudentFormData]) {
          newErrors[field as keyof StudentFormData] = 'This field is required';
        }
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setActiveStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Student form submitted:", formData);
    alert("Student information saved successfully!");
    setIsSubmitting(false);
  };

  const isReadOnly = userRole === "parent" || (userRole === "faculty" && activeStep !== 1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={onBack}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <div className="h-6 border-l border-gray-300" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Student Information Form</h1>
                <p className="text-sm text-gray-600">Complete your profile information</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Step {activeStep + 1} of {steps.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= activeStep 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index < activeStep ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      index <= activeStep ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 mx-4 h-px ${
                    index < activeStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <ProgressBar current={activeStep + 1} total={steps.length} />
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Information */}
          {activeStep === 0 && (
            <div className="space-y-6">
              {/* Basic Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-blue-600" />
                    <span>Basic Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="studentId" required>Student ID</Label>
                      <Input
                        id="studentId"
                        value={formData.studentId}
                        onChange={(e) => handleInputChange("studentId", e.target.value)}
                        placeholder="UPES2024001"
                        required
                        disabled={isReadOnly}
                        error={errors.studentId}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="fullName" required>Full Name</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        placeholder="Enter your full name"
                        required
                        disabled={isReadOnly}
                        error={errors.fullName}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="dateOfBirth" required>Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        required
                        disabled={isReadOnly}
                        error={errors.dateOfBirth}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="gender" required>Gender</Label>
                      <Select
                        id="gender"
                        value={formData.gender}
                        onChange={(e) => handleInputChange("gender", e.target.value)}
                        required
                        disabled={isReadOnly}
                        error={errors.gender}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="nationality" required>Nationality</Label>
                      <Input
                        id="nationality"
                        value={formData.nationality}
                        onChange={(e) => handleInputChange("nationality", e.target.value)}
                        placeholder="Indian"
                        required
                        disabled={isReadOnly}
                        error={errors.nationality}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        id="category"
                        value={formData.category}
                        onChange={(e) => handleInputChange("category", e.target.value)}
                        disabled={isReadOnly}
                        error={errors.category}
                      >
                        <option value="">Select Category</option>
                        <option value="general">General</option>
                        <option value="obc">OBC</option>
                        <option value="sc">SC</option>
                        <option value="st">ST</option>
                        <option value="ews">EWS</option>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-green-600" />
                    <span>Contact Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="studentEmail" required>Email Address</Label>
                      <Input
                        id="studentEmail"
                        type="email"
                        value={formData.studentEmail}
                        onChange={(e) => handleInputChange("studentEmail", e.target.value)}
                        placeholder="your.email@college.edu"
                        required
                        disabled={isReadOnly}
                        error={errors.studentEmail}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phoneNumber" required>Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        placeholder="+91 98765 43210"
                        required
                        disabled={isReadOnly}
                        error={errors.phoneNumber}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <Label htmlFor="address" required>Complete Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="House/Flat No., Street, City, State, PIN Code"
                      rows={3}
                      required
                      disabled={isReadOnly}
                      error={errors.address}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Family Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-purple-600" />
                    <span>Family & Emergency Contacts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="fatherName">Father's Name</Label>
                      <Input
                        id="fatherName"
                        value={formData.fatherName}
                        onChange={(e) => handleInputChange("fatherName", e.target.value)}
                        placeholder="Enter father's name"
                        disabled={isReadOnly}
                        error={errors.fatherName}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="motherName">Mother's Name</Label>
                      <Input
                        id="motherName"
                        value={formData.motherName}
                        onChange={(e) => handleInputChange("motherName", e.target.value)}
                        placeholder="Enter mother's name"
                        disabled={isReadOnly}
                        error={errors.motherName}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="emergencyContactNumber">Emergency Contact</Label>
                      <Input
                        id="emergencyContactNumber"
                        type="tel"
                        value={formData.emergencyContactNumber}
                        onChange={(e) => handleInputChange("emergencyContactNumber", e.target.value)}
                        placeholder="+91 98765 43210"
                        disabled={isReadOnly}
                        error={errors.emergencyContactNumber}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}          {/* Step 2: Academic Information */}
          {activeStep === 1 && (
            <div className="space-y-6">
              {/* Academic Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-orange-600" />
                    <span>Academic Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="currentCGPA">Current CGPA</Label>
                      <Input
                        id="currentCGPA"
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        value={formData.currentCGPA}
                        onChange={(e) => handleInputChange("currentCGPA", e.target.value)}
                        placeholder="8.75"
                        disabled={userRole === "parent"}
                        error={errors.currentCGPA}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="semester">Current Semester</Label>
                      <Select
                        id="semester"
                        value={formData.semester}
                        onChange={(e) => handleInputChange("semester", e.target.value)}
                        disabled={userRole === "parent"}
                        error={errors.semester}
                      >
                        <option value="">Select Semester</option>
                        <option value="1">1st Semester</option>
                        <option value="2">2nd Semester</option>
                        <option value="3">3rd Semester</option>
                        <option value="4">4th Semester</option>
                        <option value="5">5th Semester</option>
                        <option value="6">6th Semester</option>
                        <option value="7">7th Semester</option>
                        <option value="8">8th Semester</option>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={formData.department}
                        onChange={(e) => handleInputChange("department", e.target.value)}
                        placeholder="Computer Science Engineering"
                        disabled={userRole === "parent"}
                        error={errors.department}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="batch">Batch</Label>
                      <Input
                        id="batch"
                        value={formData.batch}
                        onChange={(e) => handleInputChange("batch", e.target.value)}
                        placeholder="2022-2026"
                        disabled={userRole === "parent"}
                        error={errors.batch}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="attendancePercentage">Attendance %</Label>
                      <Input
                        id="attendancePercentage"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.attendancePercentage}
                        onChange={(e) => handleInputChange("attendancePercentage", e.target.value)}
                        placeholder="85"
                        disabled={userRole === "parent"}
                        error={errors.attendancePercentage}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="backlogs">Number of Backlogs</Label>
                      <Input
                        id="backlogs"
                        type="number"
                        min="0"
                        value={formData.backlogs}
                        onChange={(e) => handleInputChange("backlogs", e.target.value)}
                        placeholder="0"
                        disabled={userRole === "parent"}
                        error={errors.backlogs}
                      />
                    </div>
                    <div>
                      <Label htmlFor="previousSemesterCGPA">Previous Semester CGPA</Label>
                      <Input
                        id="previousSemesterCGPA"
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        value={formData.previousSemesterCGPA}
                        onChange={(e) => handleInputChange("previousSemesterCGPA", e.target.value)}
                        placeholder="8.50"
                        disabled={userRole === "parent"}
                        error={errors.previousSemesterCGPA}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <Label htmlFor="internalAssessmentMarks">Internal Assessment Marks (Details)</Label>
                    <Textarea
                      id="internalAssessmentMarks"
                      value={formData.internalAssessmentMarks}
                      onChange={(e) => handleInputChange("internalAssessmentMarks", e.target.value)}
                      placeholder="e.g., Data Structures: 45/50, Algorithms: 48/50"
                      rows={3}
                      disabled={userRole === "parent"}
                      error={errors.internalAssessmentMarks}
                    />
                  </div>

                  <div className="mt-6">
                    <Label htmlFor="midSemResults">Mid-Semester Results (Details)</Label>
                    <Textarea
                      id="midSemResults"
                      value={formData.midSemResults}
                      onChange={(e) => handleInputChange("midSemResults", e.target.value)}
                      placeholder="e.g., Data Structures: 35/50, Algorithms: 40/50"
                      rows={3}
                      disabled={userRole === "parent"}
                      error={errors.midSemResults}
                    />
                  </div>

                  <div className="mt-6">
                    <Label htmlFor="subjectWiseAttendance">Subject-wise Attendance (Details)</Label>
                    <Textarea
                      id="subjectWiseAttendance"
                      value={formData.subjectWiseAttendance}
                      onChange={(e) => handleInputChange("subjectWiseAttendance", e.target.value)}
                      placeholder="e.g., Data Structures: 85%, Algorithms: 92%"
                      rows={3}
                      disabled={userRole === "parent"}
                      error={errors.subjectWiseAttendance}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Step 3: Other Information */}
          {activeStep === 2 && (
            <div className="space-y-6">
              {/* Extracurricular Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-indigo-600" />
                    <span>Extracurricular & Disciplinary Records</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="extracurricularParticipation">Extracurricular Participation</Label>
                      <Textarea
                        id="extracurricularParticipation"
                        value={formData.extracurricularParticipation}
                        onChange={(e) => handleInputChange("extracurricularParticipation", e.target.value)}
                        placeholder="e.g., Member of Robotics Club, won 1st prize in Hackathon"
                        rows={3}
                        disabled={userRole === "parent" || userRole === "faculty"}
                        error={errors.extracurricularParticipation}
                      />
                    </div>
                    <div>
                      <Label htmlFor="disciplinaryActions">Disciplinary Actions</Label>
                      <Textarea
                        id="disciplinaryActions"
                        value={formData.disciplinaryActions}
                        onChange={(e) => handleInputChange("disciplinaryActions", e.target.value)}
                        placeholder="Any records of misconduct, warnings, or suspension"
                        rows={3}
                        disabled={userRole === "parent" || userRole === "faculty"}
                        error={errors.disciplinaryActions}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>              {/* Risk Assessment Scores */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span>Risk Assessment Scores</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="academicRiskScore">Academic Risk Score</Label>
                      <Input
                        id="academicRiskScore"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.academicRiskScore}
                        onChange={(e) => handleInputChange("academicRiskScore", e.target.value)}
                        placeholder="e.g., 75"
                        disabled={isReadOnly}
                        error={errors.academicRiskScore}
                      />
                    </div>
                    <div>
                      <Label htmlFor="financialRiskScore">Financial Risk Score</Label>
                      <Input
                        id="financialRiskScore"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.financialRiskScore}
                        onChange={(e) => handleInputChange("financialRiskScore", e.target.value)}
                        placeholder="e.g., 20"
                        disabled={isReadOnly}
                        error={errors.financialRiskScore}
                      />
                    </div>
                    <div>
                      <Label htmlFor="psychologicalRiskScore">Psychological Risk Score</Label>
                      <Input
                        id="psychologicalRiskScore"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.psychologicalRiskScore}
                        onChange={(e) => handleInputChange("psychologicalRiskScore", e.target.value)}
                        placeholder="e.g., 5"
                        disabled={isReadOnly}
                        error={errors.psychologicalRiskScore}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Form Navigation */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
            <Button
              onClick={handlePrevious}
              variant="outline"
              disabled={activeStep === 0 || isSubmitting}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {activeStep < steps.length - 1 ? (
              <Button onClick={handleNext} disabled={isSubmitting}>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Information"}
                <Save className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}