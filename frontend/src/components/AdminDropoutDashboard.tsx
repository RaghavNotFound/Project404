import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { DashboardLayout } from "./DashboardLayout";
import { Chatbot } from "./Chatbot";
import { 
  Home,
  Users, 
  AlertTriangle,
  TrendingDown,
  Search,
  FileText,
  BarChart3,
  Heart,
  Brain,
  DollarSign,
  Eye,
  Edit,
  UserCheck,
  MessageSquare,
  Calendar,
  GraduationCap
} from "lucide-react";

interface AdminDropoutDashboardProps {
  userData: any;
  onLogout: () => void;
}

export function AdminDropoutDashboard({ userData, onLogout }: AdminDropoutDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const navigation = [
    { id: "overview", label: "Home", icon: Home },
    { id: "at-risk", label: "At-Risk Students", icon: AlertTriangle },
    { id: "predictive", label: "Predictive Analytics", icon: Brain },
    { id: "interventions", label: "Interventions", icon: Heart },
    { id: "financial-support", label: "Financial Support", icon: DollarSign },
    { id: "counseling", label: "Counseling Records", icon: MessageSquare },
    { id: "outcomes", label: "Outcomes & Reports", icon: BarChart3 },
  ];

  // Mock data for dropout prevention system
  const dropoutData = {
    stats: {
      totalAtRisk: 89,
      highRisk: 23,
      mediumRisk: 41,
      lowRisk: 25,
      interventionsActive: 45,
      successfulRetention: 78,
      dropoutRate: 8.5,
      previousDropoutRate: 12.3
    },
    atRiskStudents: [
      { 
        id: "UPES2023045", 
        name: "Alex Kumar", 
        program: "B.Tech CSE", 
        semester: "4th",
        riskScore: 85,
        riskLevel: "High",
        factors: ["Low Attendance (65%)", "Failing Grades", "Financial Issues"],
        lastActivity: "2024-11-18",
        interventions: 2,
        counselingSessions: 3
      },
      { 
        id: "UPES2022087", 
        name: "Priya Sharma", 
        program: "B.Tech ME", 
        semester: "6th",
        riskScore: 72,
        riskLevel: "Medium",
        factors: ["Declining Performance", "Social Issues", "Family Problems"],
        lastActivity: "2024-11-19",
        interventions: 1,
        counselingSessions: 2
      },
      { 
        id: "UPES2024012", 
        name: "Rahul Singh", 
        program: "B.Tech EE", 
        semester: "2nd",
        riskScore: 68,
        riskLevel: "Medium",
        factors: ["Academic Struggles", "Peer Pressure"],
        lastActivity: "2024-11-20",
        interventions: 1,
        counselingSessions: 1
      },
      { 
        id: "UPES2023098", 
        name: "Neha Patel", 
        program: "B.Tech CSE", 
        semester: "4th",
        riskScore: 45,
        riskLevel: "Low",
        factors: ["Minor Attendance Issues"],
        lastActivity: "2024-11-21",
        interventions: 0,
        counselingSessions: 0
      }
    ],
    interventions: [
      {
        id: "INT001",
        studentName: "Alex Kumar",
        type: "Academic Support",
        description: "Assigned peer tutor for mathematics and programming",
        startDate: "2024-10-15",
        status: "Active",
        progress: 60,
        assignedTo: "Dr. Sarah Johnson"
      },
      {
        id: "INT002",
        studentName: "Priya Sharma",
        type: "Financial Aid",
        description: "Emergency financial assistance for semester fees",
        startDate: "2024-11-01",
        status: "Approved",
        progress: 100,
        assignedTo: "Financial Aid Office"
      },
      {
        id: "INT003",
        studentName: "Rahul Singh",
        type: "Counseling",
        description: "Regular counseling sessions for stress management",
        startDate: "2024-11-10",
        status: "Ongoing",
        progress: 40,
        assignedTo: "Dr. Michael Brown"
      }
    ],
    counselingRecords: [
      {
        studentName: "Alex Kumar",
        counselor: "Dr. Lisa Wilson",
        date: "2024-11-20",
        sessionType: "Individual",
        duration: "45 minutes",
        issues: ["Academic Stress", "Financial Concerns"],
        outcome: "Action Plan Created",
        followUp: "2024-11-27"
      },
      {
        studentName: "Priya Sharma",
        counselor: "Dr. Michael Brown",
        date: "2024-11-19",
        sessionType: "Family",
        duration: "60 minutes",
        issues: ["Family Problems", "Social Adjustment"],
        outcome: "Family Meeting Scheduled",
        followUp: "2024-11-26"
      }
    ]
  };

  const filteredStudents = dropoutData.atRiskStudents.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.program.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Search */}
            <Card className="glow">
              <CardContent className="p-4">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search at-risk students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10 border-border/50 bg-input/50"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20 glow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total At-Risk</p>
                      <p className="text-3xl font-bold text-red-400">{dropoutData.stats.totalAtRisk}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20 glow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">High Risk</p>
                      <p className="text-3xl font-bold text-orange-400">{dropoutData.stats.highRisk}</p>
                    </div>
                    <TrendingDown className="h-8 w-8 text-orange-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20 glow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Successful Retention</p>
                      <p className="text-3xl font-bold text-green-400">{dropoutData.stats.successfulRetention}</p>
                    </div>
                    <UserCheck className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20 glow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Dropout Rate</p>
                      <p className="text-3xl font-bold text-blue-400">{dropoutData.stats.dropoutRate}%</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities and Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    High-Risk Students (Immediate Attention)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dropoutData.atRiskStudents.filter(s => s.riskLevel === "High").map((student, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <div>
                          <p className="text-sm font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.program} - {student.semester}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-red-400">Risk: {student.riskScore}%</p>
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/50 text-xs">
                            {student.riskLevel}
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
                    <Heart className="h-5 w-5" />
                    Active Interventions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {dropoutData.interventions.slice(0, 3).map((intervention, index) => (
                    <div key={index} className="p-3 bg-secondary/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">{intervention.studentName}</p>
                        <Badge 
                          variant={intervention.status === "Active" ? "default" : "secondary"} 
                          className={intervention.status === "Active" ? "bg-green-500/20 text-green-400 border-green-500/50 text-xs" : "text-xs"}
                        >
                          {intervention.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{intervention.type}: {intervention.description}</p>
                      <div className="flex items-center gap-2">
                        <Progress value={intervention.progress} className="flex-1" />
                        <span className="text-xs">{intervention.progress}%</span>
                      </div>
                    </div>
                  ))}
                  <Button 
                    className="w-full mt-3" 
                    variant="outline"
                    onClick={() => setActiveTab("interventions")}
                  >
                    View All Interventions
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Dropout Prevention Metrics */}
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Prevention Effectiveness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-2xl font-bold text-green-400">{dropoutData.stats.dropoutRate}%</p>
                    <p className="text-sm text-muted-foreground">Current Dropout Rate</p>
                    <p className="text-xs text-green-400 mt-1">
                      ↓ {(dropoutData.stats.previousDropoutRate - dropoutData.stats.dropoutRate).toFixed(1)}% from last year
                    </p>
                  </div>
                  <div className="text-center p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-2xl font-bold text-blue-400">{dropoutData.stats.interventionsActive}</p>
                    <p className="text-sm text-muted-foreground">Active Interventions</p>
                    <p className="text-xs text-blue-400 mt-1">Across all risk levels</p>
                  </div>
                  <div className="text-center p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <p className="text-2xl font-bold text-purple-400">87%</p>
                    <p className="text-sm text-muted-foreground">Intervention Success Rate</p>
                    <p className="text-xs text-purple-400 mt-1">Students who stayed enrolled</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "at-risk":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  At-Risk Students
                </CardTitle>
                <CardDescription>Students identified as being at risk of dropping out</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents.map((student, index) => (
                    <div key={index} className="p-4 bg-secondary/20 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.id}</p>
                          <p className="text-sm text-muted-foreground">{student.program} - {student.semester}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm">Risk Score:</span>
                            <Progress value={student.riskScore} className="flex-1" />
                            <span className="text-sm font-medium">{student.riskScore}%</span>
                          </div>
                          <Badge 
                            variant={student.riskLevel === "High" ? "destructive" : student.riskLevel === "Medium" ? "secondary" : "outline"} 
                            className={
                              student.riskLevel === "High" ? "bg-red-500/20 text-red-400 border-red-500/50 text-xs" : 
                              student.riskLevel === "Medium" ? "bg-orange-500/20 text-orange-400 border-orange-500/50 text-xs" : 
                              "bg-green-500/20 text-green-400 border-green-500/50 text-xs"
                            }
                          >
                            {student.riskLevel} Risk
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-1">Risk Factors:</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {student.factors.map((factor, idx) => (
                              <li key={idx}>• {factor}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-border/50 hover:bg-accent/50"
                            onClick={() => alert(`Viewing detailed profile for ${student.name}\nRisk Score: ${student.riskScore}%\nInterventions: ${student.interventions}\nCounseling: ${student.counselingSessions} sessions`)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View Profile
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                            onClick={() => alert(`Creating intervention plan for ${student.name} - This would open the intervention creation form`)}
                          >
                            <Heart className="h-3 w-3 mr-1" />
                            Create Intervention
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

      case "predictive":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Predictive Analytics
                </CardTitle>
                <CardDescription>AI-powered dropout risk prediction and analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Risk Prediction Model</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Model Accuracy</span>
                          <span className="font-semibold text-purple-400">94.2%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Prediction Confidence</span>
                          <span className="font-semibold text-blue-400">91.7%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Early Detection Rate</span>
                          <span className="font-semibold text-green-400">88.5%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">False Positive Rate</span>
                          <span className="font-semibold text-orange-400">5.8%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Key Risk Factors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Academic Performance</span>
                          <div className="flex items-center gap-2">
                            <Progress value={85} className="w-16" />
                            <span className="text-sm">85%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Attendance Pattern</span>
                          <div className="flex items-center gap-2">
                            <Progress value={78} className="w-16" />
                            <span className="text-sm">78%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Financial Status</span>
                          <div className="flex items-center gap-2">
                            <Progress value={65} className="w-16" />
                            <span className="text-sm">65%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Social Engagement</span>
                          <div className="flex items-center gap-2">
                            <Progress value={72} className="w-16" />
                            <span className="text-sm">72%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Trend Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <p className="text-xl font-bold text-green-400">↓ 31%</p>
                        <p className="text-sm text-muted-foreground">Dropout Rate Reduction</p>
                        <p className="text-xs text-green-400 mt-1">Since implementation</p>
                      </div>
                      <div className="text-center p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <p className="text-xl font-bold text-blue-400">↑ 24%</p>
                        <p className="text-sm text-muted-foreground">Early Intervention Success</p>
                        <p className="text-xs text-blue-400 mt-1">Compared to reactive approach</p>
                      </div>
                      <div className="text-center p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                        <p className="text-xl font-bold text-purple-400">156</p>
                        <p className="text-sm text-muted-foreground">Students Helped</p>
                        <p className="text-xs text-purple-400 mt-1">This academic year</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        );

      case "interventions":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Intervention Management
                    </CardTitle>
                    <CardDescription>Track and manage student intervention programs</CardDescription>
                  </div>
                  <Button className="bg-gradient-primary hover:bg-gradient-primary-hover">
                    <Heart className="h-4 w-4 mr-2" />
                    Create Intervention
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dropoutData.interventions.map((intervention, index) => (
                    <div key={index} className="p-4 bg-secondary/20 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <p className="font-medium">{intervention.studentName}</p>
                          <p className="text-sm text-muted-foreground">{intervention.id}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{intervention.type}</p>
                          <p className="text-sm text-muted-foreground">{intervention.description}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm">Progress:</span>
                            <Progress value={intervention.progress} className="flex-1" />
                            <span className="text-sm">{intervention.progress}%</span>
                          </div>
                          <Badge 
                            variant={intervention.status === "Active" ? "default" : intervention.status === "Approved" ? "secondary" : "outline"} 
                            className={
                              intervention.status === "Active" ? "bg-green-500/20 text-green-400 border-green-500/50 text-xs" : 
                              intervention.status === "Approved" ? "bg-blue-500/20 text-blue-400 border-blue-500/50 text-xs" : 
                              "text-xs"
                            }
                          >
                            {intervention.status}
                          </Badge>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-border/50 hover:bg-accent/50"
                            onClick={() => alert(`Viewing intervention details:\nStudent: ${intervention.studentName}\nType: ${intervention.type}\nAssigned to: ${intervention.assignedTo}\nProgress: ${intervention.progress}%`)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-border/50 hover:bg-accent/50"
                            onClick={() => alert(`Updating intervention for ${intervention.studentName} - This would open the intervention update form`)}
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

      case "financial-support":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financial Support Programs
                </CardTitle>
                <CardDescription>Manage financial aid and support for at-risk students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-green-400">₹12.5L</p>
                      <p className="text-sm text-muted-foreground">Emergency Aid Distributed</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-blue-400">34</p>
                      <p className="text-sm text-muted-foreground">Students Supported</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-purple-400">89%</p>
                      <p className="text-sm text-muted-foreground">Retention Success Rate</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Recent Financial Support Cases</h3>
                  {[
                    { student: "Alex Kumar", amount: "₹45,000", type: "Emergency Fee Support", status: "Approved", date: "2024-11-01" },
                    { student: "Priya Sharma", amount: "₹30,000", type: "Hostel Fee Assistance", status: "Disbursed", date: "2024-10-28" },
                    { student: "Rahul Singh", amount: "₹25,000", type: "Study Material Support", status: "Under Review", date: "2024-11-18" },
                    { student: "Neha Patel", amount: "₹15,000", type: "Transportation Allowance", status: "Approved", date: "2024-11-15" }
                  ].map((support, index) => (
                    <div key={index} className="p-4 bg-secondary/20 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div>
                          <p className="font-medium">{support.student}</p>
                          <p className="text-sm text-muted-foreground">{support.date}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{support.amount}</p>
                          <p className="text-sm text-muted-foreground">{support.type}</p>
                        </div>
                        <div>
                          <Badge 
                            variant={support.status === "Disbursed" ? "default" : support.status === "Approved" ? "secondary" : "outline"} 
                            className={
                              support.status === "Disbursed" ? "bg-green-500/20 text-green-400 border-green-500/50 text-xs" : 
                              support.status === "Approved" ? "bg-blue-500/20 text-blue-400 border-blue-500/50 text-xs" : 
                              "bg-orange-500/20 text-orange-400 border-orange-500/50 text-xs"
                            }
                          >
                            {support.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-border/50 hover:bg-accent/50"
                            onClick={() => alert(`Financial support details:\nStudent: ${support.student}\nAmount: ${support.amount}\nType: ${support.type}\nStatus: ${support.status}`)}
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

      case "counseling":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Counseling Records
                </CardTitle>
                <CardDescription>Track counseling sessions and mental health support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dropoutData.counselingRecords.map((record, index) => (
                    <div key={index} className="p-4 bg-secondary/20 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <p className="font-medium">{record.studentName}</p>
                          <p className="text-sm text-muted-foreground">Date: {record.date}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Counselor: {record.counselor}</p>
                          <p className="text-sm text-muted-foreground">{record.sessionType} Session ({record.duration})</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Issues Addressed:</p>
                          <ul className="text-xs text-muted-foreground">
                            {record.issues.map((issue, idx) => (
                              <li key={idx}>• {issue}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Outcome: {record.outcome}</p>
                          <p className="text-sm text-muted-foreground">Follow-up: {record.followUp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "outcomes":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Outcomes & Reports
                </CardTitle>
                <CardDescription>Track success metrics and generate reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Success Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Students Retained</span>
                          <span className="font-semibold text-green-400">{dropoutData.stats.successfulRetention}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Intervention Success Rate</span>
                          <span className="font-semibold text-blue-400">87%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Early Detection Accuracy</span>
                          <span className="font-semibold text-purple-400">94.2%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Cost per Retention</span>
                          <span className="font-semibold text-orange-400">₹8,500</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Generate Reports</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={() => {
                          const report = `DROPOUT PREVENTION COMPREHENSIVE REPORT\n\nGenerated: ${new Date().toLocaleString()}\n\nOVERVIEW:\n- Total At-Risk Students: ${dropoutData.stats.totalAtRisk}\n- High Risk: ${dropoutData.stats.highRisk}\n- Current Dropout Rate: ${dropoutData.stats.dropoutRate}%\n- Previous Dropout Rate: ${dropoutData.stats.previousDropoutRate}%\n- Improvement: ${(dropoutData.stats.previousDropoutRate - dropoutData.stats.dropoutRate).toFixed(1)}%\n\nINTERVENTIONS:\n- Active Interventions: ${dropoutData.stats.interventionsActive}\n- Success Rate: 87%\n- Students Retained: ${dropoutData.stats.successfulRetention}\n\nThis is a comprehensive dropout prevention report.`;
                          const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = "dropout_prevention_comprehensive_report.txt";
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
                          const report = `AT-RISK STUDENTS REPORT\n\nGenerated: ${new Date().toLocaleString()}\n\nHIGH RISK STUDENTS:\n${dropoutData.atRiskStudents.filter(s => s.riskLevel === "High").map(s => `${s.name} (${s.id}): Risk Score ${s.riskScore}%`).join('\n')}\n\nMEDIUM RISK STUDENTS:\n${dropoutData.atRiskStudents.filter(s => s.riskLevel === "Medium").map(s => `${s.name} (${s.id}): Risk Score ${s.riskScore}%`).join('\n')}\n\nLOW RISK STUDENTS:\n${dropoutData.atRiskStudents.filter(s => s.riskLevel === "Low").map(s => `${s.name} (${s.id}): Risk Score ${s.riskScore}%`).join('\n')}`;
                          const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = "at_risk_students_report.txt";
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                      >
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        At-Risk Students Report
                      </Button>
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={() => {
                          const report = `INTERVENTION EFFECTIVENESS REPORT\n\nGenerated: ${new Date().toLocaleString()}\n\nACTIVE INTERVENTIONS:\n${dropoutData.interventions.map(i => `${i.studentName}: ${i.type} - ${i.progress}% complete (${i.status})`).join('\n')}\n\nSUCCESS METRICS:\n- Overall Success Rate: 87%\n- Students Retained: ${dropoutData.stats.successfulRetention}\n- Cost Effectiveness: ₹8,500 per retention\n\nThis report shows intervention effectiveness metrics.`;
                          const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = "intervention_effectiveness_report.txt";
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Intervention Report
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
    <div id="admin-dropout-dashboard-page">
      <DashboardLayout
        userData={userData}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={onLogout}
        navigation={navigation}
        title="Dropout Prevention Portal"
      >
        {renderContent()}
      </DashboardLayout>
      <Chatbot userRole="admin" userData={userData} />
    </div>
  );
}
