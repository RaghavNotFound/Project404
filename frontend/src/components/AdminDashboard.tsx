import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { DashboardLayout } from "./DashboardLayout";
import { Chatbot } from "./Chatbot";
import { 
  Home,
  Users, 
  Calendar, 
  DollarSign, 
  Search,
  UserPlus,
  FileText,
  Heart,
  AlertTriangle,
  BarChart3,
  Settings,
  Edit,
  Trash2,
  Eye,
  Download,
  Shield,
  TrendingUp
} from "lucide-react";

interface AdminDashboardProps {
  userData: any;
  onLogout: () => void;
}

export function AdminDashboard({ userData, onLogout }: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const navigation = [
    { id: "overview", label: "Home", icon: Home },
    { id: "students", label: "Student Records", icon: Users },
    { id: "parents", label: "Parent Records", icon: Users },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "finance", label: "Finance", icon: DollarSign },
    { id: "medical", label: "Medical Records", icon: Heart },
    { id: "disciplinary", label: "Disciplinary Actions", icon: AlertTriangle },
    { id: "analytics", label: "Reports & Analytics", icon: BarChart3 },
  ];

  const mockData = {
    stats: {
      totalStudents: 1248,
      totalParents: 892,
      activeTeachers: 67,
      pendingApplications: 23
    },
    students: [
      { id: "UPES2024001", name: "John Doe", program: "B.Tech CSE", semester: "6th", attendance: 85, status: "Active" },
      { id: "UPES2024002", name: "Jane Smith", program: "B.Tech ME", semester: "4th", attendance: 92, status: "Active" },
      { id: "UPES2024003", name: "Mike Johnson", program: "B.Tech EE", semester: "8th", attendance: 78, status: "Warning" },
      { id: "UPES2024004", name: "Sarah Wilson", program: "B.Tech CSE", semester: "2nd", attendance: 95, status: "Active" }
    ],
    parents: [
      { id: "P001", name: "Robert Doe", email: "robert.doe@email.com", student: "John Doe", studentName: "John Doe", phone: "+91 9876543210", relation: "Father", status: "Active" },
      { id: "P002", name: "Mary Smith", email: "mary.smith@email.com", student: "Jane Smith", studentName: "Jane Smith", phone: "+91 9876543211", relation: "Mother", status: "Active" },
      { id: "P003", name: "David Johnson", email: "david.johnson@email.com", student: "Mike Johnson", studentName: "Mike Johnson", phone: "+91 9876543212", relation: "Father", status: "Active" },
      { id: "P004", name: "Lisa Wilson", email: "lisa.wilson@email.com", student: "Sarah Wilson", studentName: "Sarah Wilson", phone: "+91 9876543213", relation: "Mother", status: "Active" }
    ],
    attendance: [
      { student: "John Doe", class: "B.Tech CSE - 6th Sem", percentage: 85, present: 85, total: 100, status: "Good" },
      { student: "Jane Smith", class: "B.Tech ME - 4th Sem", percentage: 92, present: 92, total: 100, status: "Good" },
      { student: "Mike Johnson", class: "B.Tech EE - 8th Sem", percentage: 78, present: 78, total: 100, status: "Warning" },
      { student: "Sarah Wilson", class: "B.Tech CSE - 2nd Sem", percentage: 95, present: 95, total: 100, status: "Good" },
      { student: "Alex Brown", class: "B.Tech CSE - 4th Sem", percentage: 65, present: 65, total: 100, status: "Critical" },
      { student: "Emma Davis", class: "B.Tech ME - 6th Sem", percentage: 88, present: 88, total: 100, status: "Good" }
    ],
    finance: {
      totalCollected: 15750000,
      totalRevenue: 18090000,
      pending: 2340000,
      pendingFees: 2340000,
      overdue: 450000,
      scholarships: 1500000,
      defaulters: 890000,
      recentTransactions: [
        { student: "John Doe", amount: 62500, date: "2024-11-15", status: "Completed", type: "Semester Fee" },
        { student: "Jane Smith", amount: 62500, date: "2024-11-14", status: "Completed", type: "Semester Fee" },
        { student: "Mike Johnson", amount: 62500, date: "2024-11-13", status: "Pending", type: "Semester Fee" },
        { student: "Sarah Wilson", amount: 62500, date: "2024-11-12", status: "Completed", type: "Semester Fee" },
        { student: "Alex Brown", amount: 25000, date: "2024-11-11", status: "Failed", type: "Hostel Fee" },
        { student: "Emma Davis", amount: 15000, date: "2024-11-10", status: "Completed", type: "Lab Fee" }
      ]
    },
    medical: [
      { student: "John Doe", condition: "Allergies", lastCheckup: "2024-10-15", status: "Monitored" },
      { student: "Mike Johnson", condition: "Asthma", lastCheckup: "2024-11-01", status: "Active" },
      { student: "Sarah Wilson", condition: "None", lastCheckup: "2024-09-20", status: "Healthy" }
    ],
    disciplinary: [
      { student: "Mike Johnson", incident: "Late submission", date: "2024-11-10", action: "Warning", status: "Resolved" },
      { student: "John Doe", incident: "Attendance shortage", date: "2024-10-25", action: "Counseling", status: "In Progress" }
    ]
  };

  const filteredStudents = mockData.students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Global Search */}
            <Card className="glow">
              <CardContent className="p-4">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Global search - students, parents, records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10 border-border/50 bg-input/50"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20 glow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Students</p>
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
                      <p className="text-sm text-muted-foreground">Total Parents</p>
                      <p className="text-3xl font-bold text-green-400">{mockData.stats.totalParents}</p>
                    </div>
                    <Users className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20 glow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Teachers</p>
                      <p className="text-3xl font-bold text-purple-400">{mockData.stats.activeTeachers}</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20 glow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Applications</p>
                      <p className="text-3xl font-bold text-orange-400">{mockData.stats.pendingApplications}</p>
                    </div>
                    <FileText className="h-8 w-8 text-orange-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Recent Financial Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockData.finance.recentTransactions.slice(0, 4).map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                        <div>
                          <p className="text-sm font-medium">{transaction.student}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">₹{transaction.amount.toLocaleString()}</p>
                          <Badge 
                            variant={transaction.status === "Completed" ? "default" : "destructive"} 
                            className={transaction.status === "Completed" ? "bg-green-500/20 text-green-400 border-green-500/50 text-xs" : "text-xs"}
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-gradient-primary hover:bg-gradient-primary-hover">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add New Student
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => {
                      const report = `SYSTEM REPORT\n\nGenerated: ${new Date().toLocaleString()}\nTotal Students: ${mockData.stats.totalStudents}\nTotal Parents: ${mockData.stats.totalParents}\nActive Teachers: ${mockData.stats.activeTeachers}\n\nThis is a demo system report.`;
                      const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "system_report.txt";
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Reports
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => alert("System Settings opened - This would open admin settings in a real app")}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    System Settings
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => {
                      const exportData = `STUDENT DATA EXPORT\n\nGenerated: ${new Date().toLocaleString()}\n\n${mockData.students.map(s => `${s.name} (${s.id}) - ${s.program} - ${s.attendance}%`).join('\n')}\n\nThis is a demo data export.`;
                      const blob = new Blob([exportData], { type: "text/plain;charset=utf-8" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "student_data_export.txt";
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "students":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Student Management
                    </CardTitle>
                    <CardDescription>Manage student records and information</CardDescription>
                  </div>
                  <Button className="bg-gradient-primary hover:bg-gradient-primary-hover">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents.map((student, index) => (
                    <div key={index} className="p-4 bg-secondary/20 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.id}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{student.program}</p>
                          <p className="text-sm text-muted-foreground">{student.semester}</p>
                        </div>
                        <div>
                          <p className="text-sm">Attendance: {student.attendance}%</p>
                          <Badge 
                            variant={student.status === "Active" ? "default" : "destructive"} 
                            className={student.status === "Active" ? "bg-green-500/20 text-green-400 border-green-500/50 text-xs" : "text-xs"}
                          >
                            {student.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-border/50 hover:bg-accent/50"
                            onClick={() => alert(`Viewing student: ${student.name}\nID: ${student.id}\nProgram: ${student.program}\nAttendance: ${student.attendance}%`)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-border/50 hover:bg-accent/50"
                            onClick={() => alert(`Editing student: ${student.name} - This would open an edit form in a real app`)}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete student ${student.name}?`)) {
                                alert(`Student ${student.name} deleted (demo only)`);
                              }
                            }}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
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

      case "parents":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Parent Management
                    </CardTitle>
                    <CardDescription>Manage parent records and communications</CardDescription>
                  </div>
                  <Button className="bg-gradient-primary hover:bg-gradient-primary-hover">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Parent
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.parents.map((parent, index) => (
                    <div key={index} className="p-4 bg-secondary/20 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div>
                          <p className="font-medium">{parent.name}</p>
                          <p className="text-sm text-muted-foreground">{parent.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Student: {parent.studentName}</p>
                          <p className="text-sm text-muted-foreground">{parent.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm">Relation: {parent.relation}</p>
                          <Badge 
                            variant={parent.status === "Active" ? "default" : "destructive"} 
                            className={parent.status === "Active" ? "bg-green-500/20 text-green-400 border-green-500/50 text-xs" : "text-xs"}
                          >
                            {parent.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-border/50 hover:bg-accent/50"
                            onClick={() => alert(`Viewing parent: ${parent.name}\nStudent: ${parent.studentName}\nPhone: ${parent.phone}`)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-border/50 hover:bg-accent/50"
                            onClick={() => alert(`Editing parent: ${parent.name} - This would open an edit form in a real app`)}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
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

      case "attendance":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Attendance Management
                </CardTitle>
                <CardDescription>Monitor and manage student attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-green-400">85.2%</p>
                      <p className="text-sm text-muted-foreground">Overall Attendance</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-orange-400">124</p>
                      <p className="text-sm text-muted-foreground">Students Below 75%</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-red-400">32</p>
                      <p className="text-sm text-muted-foreground">Critical Cases</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4">
                  {mockData.attendance.map((record, index) => (
                    <div key={index} className="p-4 bg-secondary/20 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div>
                          <p className="font-medium">{record.student}</p>
                          <p className="text-sm text-muted-foreground">{record.class}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{record.percentage}% Attendance</p>
                          <p className="text-sm text-muted-foreground">Present: {record.present}/{record.total}</p>
                        </div>
                        <div>
                          <Badge 
                            variant={record.status === "Good" ? "default" : record.status === "Warning" ? "secondary" : "destructive"} 
                            className={
                              record.status === "Good" ? "bg-green-500/20 text-green-400 border-green-500/50 text-xs" : 
                              record.status === "Warning" ? "bg-orange-500/20 text-orange-400 border-orange-500/50 text-xs" : 
                              "bg-red-500/20 text-red-400 border-red-500/50 text-xs"
                            }
                          >
                            {record.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-border/50 hover:bg-accent/50"
                            onClick={() => alert(`Attendance details for ${record.student}\nPresent: ${record.present}/${record.total} (${record.percentage}%)`)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Details
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

      case "finance":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financial Management
                </CardTitle>
                <CardDescription>Monitor fees, payments, and financial records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-green-400">₹{mockData.finance.totalRevenue.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-orange-400">₹{mockData.finance.pendingFees.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Pending Fees</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-blue-400">₹{mockData.finance.scholarships.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Scholarships</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-purple-400">₹{mockData.finance.defaulters.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Defaulters</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Recent Transactions</h3>
                  {mockData.finance.recentTransactions.map((transaction, index) => (
                    <div key={index} className="p-4 bg-secondary/20 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div>
                          <p className="font-medium">{transaction.student}</p>
                          <p className="text-sm text-muted-foreground">{transaction.type}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">₹{transaction.amount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                        <div>
                          <Badge 
                            variant={transaction.status === "Completed" ? "default" : transaction.status === "Pending" ? "secondary" : "destructive"} 
                            className={
                              transaction.status === "Completed" ? "bg-green-500/20 text-green-400 border-green-500/50 text-xs" : 
                              transaction.status === "Pending" ? "bg-orange-500/20 text-orange-400 border-orange-500/50 text-xs" : 
                              "bg-red-500/20 text-red-400 border-red-500/50 text-xs"
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-border/50 hover:bg-accent/50"
                            onClick={() => alert(`Transaction details:\nStudent: ${transaction.student}\nAmount: ₹${transaction.amount}\nType: ${transaction.type}\nStatus: ${transaction.status}`)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
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

      case "medical":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Medical Records Management
                </CardTitle>
                <CardDescription>Monitor student health and medical records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.medical.map((record, index) => (
                    <div key={index} className="p-4 bg-secondary/20 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div>
                          <p className="font-medium">{record.student}</p>
                          <p className="text-sm text-muted-foreground">Medical Record</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{record.condition}</p>
                          <p className="text-sm text-muted-foreground">Last Checkup: {record.lastCheckup}</p>
                        </div>
                        <div>
                          <Badge 
                            variant={record.status === "Healthy" ? "default" : "secondary"} 
                            className={record.status === "Healthy" ? "bg-green-500/20 text-green-400 border-green-500/50 text-xs" : "bg-blue-500/20 text-blue-400 border-blue-500/50 text-xs"}
                          >
                            {record.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-border/50 hover:bg-accent/50"
                            onClick={() => alert(`Medical record for ${record.student}\nCondition: ${record.condition}\nLast Checkup: ${record.lastCheckup}\nStatus: ${record.status}`)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-border/50 hover:bg-accent/50"
                            onClick={() => alert(`Updating medical record for ${record.student} - This would open an edit form in a real app`)}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Update
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

      case "disciplinary":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Disciplinary Actions
                </CardTitle>
                <CardDescription>Manage disciplinary incidents and actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.disciplinary.map((record, index) => (
                    <div key={index} className="p-4 bg-secondary/20 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div>
                          <p className="font-medium">{record.student}</p>
                          <p className="text-sm text-muted-foreground">{record.date}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{record.incident}</p>
                          <p className="text-sm text-muted-foreground">Action: {record.action}</p>
                        </div>
                        <div>
                          <Badge 
                            variant={record.status === "Resolved" ? "default" : "secondary"} 
                            className={record.status === "Resolved" ? "bg-green-500/20 text-green-400 border-green-500/50 text-xs" : "bg-orange-500/20 text-orange-400 border-orange-500/50 text-xs"}
                          >
                            {record.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-border/50 hover:bg-accent/50"
                            onClick={() => alert(`Disciplinary record for ${record.student}\nIncident: ${record.incident}\nAction: ${record.action}\nStatus: ${record.status}`)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-border/50 hover:bg-accent/50"
                            onClick={() => alert(`Updating disciplinary record for ${record.student} - This would open an edit form in a real app`)}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Update
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

      case "analytics":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Reports & Analytics
                </CardTitle>
                <CardDescription>Generate reports and view analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Academic Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Average GPA</span>
                          <span className="font-semibold">7.8/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Pass Rate</span>
                          <span className="font-semibold text-green-400">92%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Distinction Rate</span>
                          <span className="font-semibold text-blue-400">34%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Attendance Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Overall Attendance</span>
                          <span className="font-semibold">85.2%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Above 85%</span>
                          <span className="font-semibold text-green-400">68%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Below 75%</span>
                          <span className="font-semibold text-red-400">12%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Financial Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Fee Collection Rate</span>
                          <span className="font-semibold">87%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Pending Amount</span>
                          <span className="font-semibold text-orange-400">₹{mockData.finance.pendingFees.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Scholarship Given</span>
                          <span className="font-semibold text-blue-400">₹{mockData.finance.scholarships.toLocaleString()}</span>
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
                          const report = `COMPREHENSIVE ANALYTICS REPORT\n\nGenerated: ${new Date().toLocaleString()}\n\nACADEMIC PERFORMANCE:\n- Average GPA: 7.8/10\n- Pass Rate: 92%\n- Distinction Rate: 34%\n\nATTENDANCE:\n- Overall: 85.2%\n- Above 85%: 68% of students\n- Below 75%: 12% of students\n\nFINANCIAL:\n- Fee Collection: 87%\n- Pending: ₹${mockData.finance.pendingFees.toLocaleString()}\n- Scholarships: ₹${mockData.finance.scholarships.toLocaleString()}\n\nThis is a comprehensive analytics report.`;
                          const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = "comprehensive_analytics_report.txt";
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
                          const report = `ATTENDANCE REPORT\n\nGenerated: ${new Date().toLocaleString()}\n\n${mockData.attendance.map(record => `${record.student}: ${record.percentage}% (${record.present}/${record.total}) - ${record.status}`).join('\n')}\n\nOverall Average: 85.2%`;
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
                          const report = `FINANCIAL REPORT\n\nGenerated: ${new Date().toLocaleString()}\n\nREVENUE: ₹${mockData.finance.totalRevenue.toLocaleString()}\nPENDING: ₹${mockData.finance.pendingFees.toLocaleString()}\nSCHOLARSHIPS: ₹${mockData.finance.scholarships.toLocaleString()}\n\nRECENT TRANSACTIONS:\n${mockData.finance.recentTransactions.map(t => `${t.student}: ₹${t.amount} - ${t.status}`).join('\n')}`;
                          const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = "financial_report.txt";
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                      >
                        <DollarSign className="h-4 w-4 mr-2" />
                        Financial Report
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
    <div id="admin-dashboard-page">
      <DashboardLayout
        userData={userData}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={onLogout}
        navigation={navigation}
        title="Admin Portal"
      >
        {renderContent()}
      </DashboardLayout>
      <Chatbot userRole="admin" userData={userData} />
    </div>
  );
}