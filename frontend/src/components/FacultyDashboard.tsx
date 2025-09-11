import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { DashboardLayout } from "./DashboardLayout";
import { Chatbot } from "./Chatbot";
import { StudentForm } from "./StudentForm";
import { 
  Home,
  Users, 
  Calendar, 
  BookOpen,
  Search,
  FileText,
  BarChart3,
  GraduationCap,
  ClipboardList,
  TrendingUp,
  Star,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface FacultyDashboardProps {
  userData: any;
  onLogout: () => void;
}

export function FacultyDashboard({ userData, onLogout }: FacultyDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const navigation = [
    { id: "overview", label: "Home", icon: Home },
    { id: "my-students", label: "My Students", icon: Users },
    { id: "student-form", label: "Student Information", icon: FileText },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "grades", label: "Grades & Assessment", icon: BookOpen },
    { id: "assignments", label: "Assignments", icon: ClipboardList },
    { id: "reports", label: "Academic Reports", icon: FileText },
  ];

  // Mock data for Faculty - limited to their batches/subjects
  const mockData = {
    faculty: {
      name: userData?.name || "Dr. Professor",
      department: "Computer Science & Engineering",
      subjects: ["Data Structures", "Database Systems", "Web Development"],
      batches: ["B.Tech CSE 2022", "B.Tech CSE 2023"]
    },
    stats: {
      totalStudents: 45, // Only students in faculty's batches
      subjectsTeaching: 3,
      averageAttendance: 87.2,
      pendingAssignments: 12
    },
    students: [
      { 
        id: "UPES2022001", 
        name: "John Doe", 
        rollNo: "UPES2022001",
        batch: "B.Tech CSE 2022", 
        semester: "6th", 
        attendance: 85, 
        cgpa: 8.2,
        gpa: 8.2,
        grade: "A-",
        performance: "Good",
        todayPresent: true,
        subjects: {
          "Data Structures": { grade: "A", attendance: 92 },
          "Database Systems": { grade: "B+", attendance: 88 },
          "Web Development": { grade: "A-", attendance: 78 }
        }
      },
      { 
        id: "UPES2022002", 
        name: "Jane Smith", 
        rollNo: "UPES2022002",
        batch: "B.Tech CSE 2022", 
        semester: "6th", 
        attendance: 92, 
        cgpa: 8.8,
        gpa: 8.8,
        grade: "A",
        performance: "Excellent",
        todayPresent: true,
        subjects: {
          "Data Structures": { grade: "A+", attendance: 95 },
          "Database Systems": { grade: "A", attendance: 90 },
          "Web Development": { grade: "A", attendance: 91 }
        }
      },
      { 
        id: "UPES2023001", 
        name: "Mike Johnson", 
        rollNo: "UPES2023001",
        batch: "B.Tech CSE 2023", 
        semester: "4th", 
        attendance: 78, 
        cgpa: 7.5,
        gpa: 7.5,
        grade: "B+",
        performance: "Average",
        todayPresent: false,
        subjects: {
          "Data Structures": { grade: "B", attendance: 75 },
          "Database Systems": { grade: "B+", attendance: 82 },
          "Web Development": { grade: "C+", attendance: 77 }
        }
      },
      { 
        id: "UPES2023002", 
        name: "Sarah Wilson", 
        rollNo: "UPES2023002",
        batch: "B.Tech CSE 2023", 
        semester: "4th", 
        attendance: 95, 
        cgpa: 9.1,
        gpa: 9.1,
        grade: "A+",
        performance: "Excellent",
        todayPresent: true,
        subjects: {
          "Data Structures": { grade: "A+", attendance: 98 },
          "Database Systems": { grade: "A+", attendance: 94 },
          "Web Development": { grade: "A", attendance: 93 }
        }
      }
    ],
    assignments: [
      { id: "ASG001", subject: "Data Structures", title: "Binary Tree Implementation", dueDate: "2024-11-25", submitted: 38, total: 45, status: "Active" },
      { id: "ASG002", subject: "Database Systems", title: "SQL Query Optimization", dueDate: "2024-11-22", submitted: 42, total: 45, status: "Grading" },
      { id: "ASG003", subject: "Web Development", title: "React Component Design", dueDate: "2024-11-28", submitted: 35, total: 45, status: "Active" },
      { id: "ASG004", subject: "Data Structures", title: "Hash Table Analysis", dueDate: "2024-12-01", submitted: 28, total: 45, status: "Active" },
      { id: "ASG005", subject: "Database Systems", title: "Normalization Exercise", dueDate: "2024-11-15", submitted: 45, total: 45, status: "Completed" }
    ],
    recentActivity: [
      { activity: "Graded assignment: Binary Tree Implementation", date: "2024-11-20", type: "grading" },
      { activity: "Updated attendance for Web Development", date: "2024-11-19", type: "attendance" },
      { activity: "Posted new assignment: React Component Design", date: "2024-11-18", type: "assignment" },
      { activity: "Conducted midterm exam for Database Systems", date: "2024-11-17", type: "exam" }
    ]
  };

  const filteredStudents = mockData.students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.batch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Faculty Info Header */}
            <Card className="glow bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{mockData.faculty.name}</h2>
                    <p className="text-muted-foreground">{mockData.faculty.department}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                        {mockData.faculty.subjects.length} Subjects
                      </Badge>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
                        {mockData.faculty.batches.length} Batches
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20 glow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">My Students</p>
                      <p className="text-3xl font-bold text-blue-400">{mockData.stats.totalStudents}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20 glow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Subjects Teaching</p>
                      <p className="text-3xl font-bold text-green-400">{mockData.stats.subjectsTeaching}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20 glow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Attendance</p>
                      <p className="text-3xl font-bold text-purple-400">{mockData.stats.averageAttendance}%</p>
                    </div>
                    <Calendar className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20 glow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Reviews</p>
                      <p className="text-3xl font-bold text-orange-400">{mockData.stats.pendingAssignments}</p>
                    </div>
                    <ClipboardList className="h-8 w-8 text-orange-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities and Assignments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockData.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                          {activity.type === "grading" && <Star className="h-4 w-4 text-amber-400" />}
                          {activity.type === "attendance" && <Calendar className="h-4 w-4 text-green-400" />}
                          {activity.type === "assignment" && <FileText className="h-4 w-4 text-blue-400" />}
                          {activity.type === "exam" && <ClipboardList className="h-4 w-4 text-purple-400" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.activity}</p>
                          <p className="text-xs text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5" />
                    Assignment Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.assignments.map((assignment, index) => (
                      <div key={index} className="p-3 bg-secondary/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-sm font-medium">{assignment.title}</p>
                            <p className="text-xs text-muted-foreground">{assignment.subject}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            Due: {assignment.dueDate}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Submitted: {assignment.submitted}/{assignment.total}</span>
                            <span>{Math.round((assignment.submitted / assignment.total) * 100)}%</span>
                          </div>
                          <Progress value={(assignment.submitted / assignment.total) * 100} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "student-form":
        return (
          <div className="space-y-6">
            <StudentForm 
              isOpen={true}
              onClose={() => setActiveTab("overview")}
              onSubmit={(data) => {
                console.log("Student form submitted by faculty:", data);
                setActiveTab("overview");
              }}
              userRole="faculty"
            />
          </div>
        );

      case "my-students":
        return (
          <div className="space-y-6">
            {/* Search and Filter */}
            <Card className="glow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="relative max-w-md flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students by name, ID, or batch..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-10 border-border/50 bg-input/50"
                    />
                  </div>
                  <div className="flex gap-2">
                    {mockData.faculty.batches.map((batch, index) => (
                      <Badge key={index} variant="outline" className="cursor-pointer">
                        {batch}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Student List */}
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Students in My Batches ({filteredStudents.length})
                </CardTitle>
                <CardDescription>Academic overview of students under your guidance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <div key={student.id} className="p-4 bg-secondary/10 rounded-xl border border-border/50 hover:bg-secondary/20 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                            <GraduationCap className="h-6 w-6 text-blue-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{student.name}</h4>
                            <p className="text-sm text-muted-foreground">{student.id} • {student.batch}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/50 text-xs">
                                CGPA: {student.cgpa}
                              </Badge>
                              <Badge 
                                variant={student.attendance >= 75 ? "default" : "destructive"}
                                className={student.attendance >= 75 ? "bg-blue-500/20 text-blue-400 border-blue-500/50 text-xs" : "text-xs"}
                              >
                                Attendance: {student.attendance}%
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="border-border/50 hover:bg-accent/50">
                          View Details
                        </Button>
                      </div>

                      {/* Subject Performance */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {mockData.faculty.subjects.map((subject) => (
                          <div key={subject} className="p-3 bg-secondary/20 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm font-medium">{subject}</p>
                              <Badge variant="outline" className="text-xs">
                                {student.subjects[subject]?.grade || "N/A"}
                              </Badge>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Attendance</span>
                                <span>{student.subjects[subject]?.attendance || 0}%</span>
                              </div>
                              <Progress 
                                value={student.subjects[subject]?.attendance || 0} 
                                className="h-2" 
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "attendance":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Attendance Management
                </CardTitle>
                <CardDescription>Track and manage student attendance for your classes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-green-400">87%</p>
                      <p className="text-sm text-muted-foreground">Class Average</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-orange-400">12</p>
                      <p className="text-sm text-muted-foreground">Below 75%</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-blue-400">98%</p>
                      <p className="text-sm text-muted-foreground">Today's Attendance</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4">
                  {mockData.students.map((student, index) => (
                    <div key={index} className="p-4 bg-secondary/20 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.rollNo}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={student.attendance} className="w-20" />
                            <span className="text-sm font-medium">{student.attendance}%</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant={student.todayPresent ? "default" : "outline"}
                            className={student.todayPresent ? "bg-green-500 hover:bg-green-600" : ""}
                            onClick={() => alert(`Marking ${student.name} as ${student.todayPresent ? 'absent' : 'present'}`)}
                          >
                            {student.todayPresent ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                            {student.todayPresent ? 'Present' : 'Mark Present'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "grades":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Grades & Assessment
                </CardTitle>
                <CardDescription>Manage student grades and assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-purple-400">7.8</p>
                      <p className="text-sm text-muted-foreground">Class Average GPA</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-green-400">92%</p>
                      <p className="text-sm text-muted-foreground">Pass Rate</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-blue-400">15</p>
                      <p className="text-sm text-muted-foreground">Distinctions</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4">
                  {mockData.students.map((student, index) => (
                    <div key={index} className="p-4 bg-secondary/20 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.rollNo}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">GPA: {student.gpa}/10</p>
                          <p className="text-sm text-muted-foreground">Grade: {student.grade}</p>
                        </div>
                        <div>
                          <Badge 
                            variant={student.performance === "Excellent" ? "default" : student.performance === "Good" ? "secondary" : "outline"} 
                            className={
                              student.performance === "Excellent" ? "bg-green-500/20 text-green-400 border-green-500/50 text-xs" : 
                              student.performance === "Good" ? "bg-blue-500/20 text-blue-400 border-blue-500/50 text-xs" : 
                              "text-xs"
                            }
                          >
                            {student.performance}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-border/50 hover:bg-accent/50"
                            onClick={() => alert(`Grade details for ${student.name}\nGPA: ${student.gpa}/10\nGrade: ${student.grade}\nPerformance: ${student.performance}`)}
                          >
                            <BarChart3 className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-border/50 hover:bg-accent/50"
                            onClick={() => alert(`Updating grades for ${student.name} - This would open a grade entry form`)}
                          >
                            <Star className="h-3 w-3 mr-1" />
                            Update Grade
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "assignments":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <ClipboardList className="h-5 w-5" />
                      Assignment Management
                    </CardTitle>
                    <CardDescription>Create and manage assignments for your students</CardDescription>
                  </div>
                  <Button className="bg-gradient-primary hover:bg-gradient-primary-hover">
                    <ClipboardList className="h-4 w-4 mr-2" />
                    Create Assignment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-blue-400">8</p>
                      <p className="text-sm text-muted-foreground">Active Assignments</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-orange-400">23</p>
                      <p className="text-sm text-muted-foreground">Pending Reviews</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-green-400">156</p>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4">
                  {mockData.assignments.map((assignment, index) => (
                    <div key={index} className="p-4 bg-secondary/20 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div>
                          <p className="font-medium">{assignment.title}</p>
                          <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Due: {assignment.dueDate}</p>
                          <p className="text-sm text-muted-foreground">Submissions: {assignment.submitted}/{assignment.total}</p>
                        </div>
                        <div>
                          <Badge 
                            variant={assignment.status === "Active" ? "default" : assignment.status === "Grading" ? "secondary" : "outline"} 
                            className={
                              assignment.status === "Active" ? "bg-green-500/20 text-green-400 border-green-500/50 text-xs" : 
                              assignment.status === "Grading" ? "bg-orange-500/20 text-orange-400 border-orange-500/50 text-xs" : 
                              "text-xs"
                            }
                          >
                            {assignment.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-border/50 hover:bg-accent/50"
                            onClick={() => alert(`Viewing assignment: ${assignment.title}\nSubject: ${assignment.subject}\nDue: ${assignment.dueDate}\nSubmissions: ${assignment.submitted}/${assignment.total}`)}
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-border/50 hover:bg-accent/50"
                            onClick={() => alert(`Grading assignment: ${assignment.title} - This would open the grading interface`)}
                          >
                            <Star className="h-3 w-3 mr-1" />
                            Grade
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "reports":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Academic Reports
                </CardTitle>
                <CardDescription>Generate and view academic reports for your classes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Class Performance Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Average GPA</span>
                          <span className="font-semibold">7.8/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Class Attendance</span>
                          <span className="font-semibold text-green-400">87%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Pass Rate</span>
                          <span className="font-semibold text-blue-400">92%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Distinction Rate</span>
                          <span className="font-semibold text-purple-400">38%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Subject-wise Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockData.faculty.subjects.map((subject, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm">{subject}</span>
                            <div className="flex items-center gap-2">
                              <Progress value={85 + index * 3} className="w-16" />
                              <span className="text-sm font-semibold">{85 + index * 3}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Assignment Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Total Assignments</span>
                          <span className="font-semibold">24</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Average Submission Rate</span>
                          <span className="font-semibold text-green-400">89%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">On-time Submissions</span>
                          <span className="font-semibold text-blue-400">76%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Average Score</span>
                          <span className="font-semibold text-purple-400">78/100</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Generate Reports</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={() => {
                          const report = `COMPREHENSIVE CLASS REPORT\n\nFaculty: ${mockData.faculty.name}\nDepartment: ${mockData.faculty.department}\nGenerated: ${new Date().toLocaleString()}\n\nCLASS PERFORMANCE:\n- Average GPA: 7.8/10\n- Class Attendance: 87%\n- Pass Rate: 92%\n- Distinction Rate: 38%\n\nSTUDENT DETAILS:\n${mockData.students.map(s => `${s.name} (${s.rollNo}): GPA ${s.gpa}/10, ${s.attendance}% attendance, Grade ${s.grade}`).join('\n')}\n\nThis is a comprehensive class report.`;
                          const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = "class_comprehensive_report.txt";
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Comprehensive Report
                      </Button>
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={() => {
                          const report = `ATTENDANCE REPORT\n\nFaculty: ${mockData.faculty.name}\nGenerated: ${new Date().toLocaleString()}\n\nCLASS ATTENDANCE SUMMARY:\n${mockData.students.map(s => `${s.name} (${s.rollNo}): ${s.attendance}%`).join('\n')}\n\nClass Average: 87%`;
                          const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = "attendance_report.txt";
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Attendance Report
                      </Button>
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={() => {
                          const report = `GRADES REPORT\n\nFaculty: ${mockData.faculty.name}\nGenerated: ${new Date().toLocaleString()}\n\nSTUDENT GRADES:\n${mockData.students.map(s => `${s.name} (${s.rollNo}): GPA ${s.gpa}/10, Grade ${s.grade}, Performance: ${s.performance}`).join('\n')}\n\nClass Average GPA: 7.8/10\nPass Rate: 92%`;
                          const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = "grades_report.txt";
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                      >
                        <GraduationCap className="h-4 w-4 mr-2" />
                        Grades Report
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div id="faculty-dashboard-page">
      <DashboardLayout
        userData={userData}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={onLogout}
        navigation={navigation}
        title="Faculty Portal"
      >
        {renderContent()}
      </DashboardLayout>
      <Chatbot userRole="faculty" userData={userData} />
    </div>
  );
}
