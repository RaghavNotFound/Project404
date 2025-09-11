import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { DashboardLayout } from "./DashboardLayout";
import { Chatbot } from "./Chatbot";
import { 
  Home,
  AlertTriangle,
  Heart,
  Brain,
  MessageSquare,
  TrendingUp,
  Calendar,
  BookOpen,
  Users,
  Phone,
  Mail,
  CheckCircle,
  Clock,
  Target,
  Award
} from "lucide-react";

interface ParentDropoutDashboardProps {
  userData: any;
  onLogout: () => void;
}

export function ParentDropoutDashboard({ userData, onLogout }: ParentDropoutDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const navigation = [
    { id: "overview", label: "Home", icon: Home },
    { id: "child-status", label: "Child's Status", icon: Users },
    { id: "risk-assessment", label: "Risk Assessment", icon: AlertTriangle },
    { id: "support-resources", label: "Support Resources", icon: Heart },
    { id: "communication", label: "Communication", icon: MessageSquare },
    { id: "progress-tracking", label: "Progress Tracking", icon: TrendingUp }
  ];

  // Mock data for parent dropout prevention dashboard
  const parentData = {
    child: {
      name: "Alex Kumar",
      id: "UPES2023045",
      program: "B.Tech Computer Science Engineering",
      semester: "4th Semester",
      currentGPA: 7.2,
      attendance: 78,
      riskLevel: "Medium",
      riskScore: 65,
      lastUpdated: "2024-11-21"
    },
    riskFactors: {
      academic: {
        level: "Medium",
        details: ["Declining grades in Math courses", "Missing assignment submissions"],
        improvement: 15
      },
      attendance: {
        level: "High",
        details: ["Below 75% attendance threshold", "Frequent absences in morning classes"],
        improvement: -5
      },
      social: {
        level: "Low",
        details: ["Good peer relationships", "Active in student clubs"],
        improvement: 20
      },
      financial: {
        level: "Medium",
        details: ["Family financial constraints", "Part-time work affecting studies"],
        improvement: 10
      }
    },
    interventions: [
      {
        type: "Academic Support",
        description: "Peer tutoring for Mathematics and Programming",
        status: "Active",
        progress: 60,
        startDate: "2024-10-15",
        coordinator: "Dr. Sarah Johnson",
        nextSession: "2024-11-25"
      },
      {
        type: "Attendance Monitoring",
        description: "Daily attendance tracking with SMS alerts",
        status: "Active",
        progress: 80,
        startDate: "2024-11-01",
        coordinator: "Academic Office",
        nextSession: "Ongoing"
      },
      {
        type: "Counseling Support",
        description: "Regular counseling sessions for stress management",
        status: "Scheduled",
        progress: 25,
        startDate: "2024-11-22",
        coordinator: "Dr. Michael Brown",
        nextSession: "2024-11-22"
      }
    ],
    communications: [
      {
        date: "2024-11-20",
        from: "Dr. Sarah Johnson (Academic Coordinator)",
        subject: "Weekly Progress Update - Alex Kumar",
        message: "Alex has shown improvement in his mathematics performance this week. He attended all tutoring sessions and completed his assignments on time.",
        type: "Progress Update",
        read: false
      },
      {
        date: "2024-11-18",
        from: "Academic Office",
        subject: "Attendance Alert - Missing Classes",
        message: "Alex missed 2 consecutive classes in Database Systems. Please encourage regular attendance.",
        type: "Alert",
        read: true
      },
      {
        date: "2024-11-15",
        from: "Dr. Michael Brown (Counselor)",
        subject: "Counseling Session Scheduled",
        message: "A counseling session has been scheduled for Alex on November 22nd at 2:00 PM to discuss stress management techniques.",
        type: "Appointment",
        read: true
      }
    ],
    resources: [
      {
        category: "Academic Support",
        title: "Study Groups and Peer Tutoring",
        description: "Join study groups or request peer tutoring for challenging subjects",
        contact: "academic.support@university.edu",
        phone: "+91 135-777-1234"
      },
      {
        category: "Financial Aid",
        title: "Emergency Financial Assistance",
        description: "Apply for emergency financial aid to support your child's education",
        contact: "financial.aid@university.edu",
        phone: "+91 135-777-5678"
      },
      {
        category: "Mental Health",
        title: "Counseling and Mental Health Services",
        description: "Professional counseling services for students and families",
        contact: "counseling@university.edu",
        phone: "+91 135-777-9012"
      },
      {
        category: "Parent Support",
        title: "Parent Support Groups",
        description: "Connect with other parents facing similar challenges",
        contact: "parent.support@university.edu",
        phone: "+91 135-777-3456"
      }
    ],
    milestones: [
      {
        date: "2024-10-15",
        title: "Academic Support Started",
        description: "Peer tutoring program initiated for Mathematics",
        status: "Completed",
        impact: "Positive"
      },
      {
        date: "2024-11-01",
        title: "Attendance Monitoring Activated",
        description: "Daily SMS alerts for attendance tracking implemented",
        status: "Completed",
        impact: "Positive"
      },
      {
        date: "2024-11-22",
        title: "First Counseling Session",
        description: "Initial counseling session scheduled for stress management",
        status: "Scheduled",
        impact: "Pending"
      },
      {
        date: "2024-12-01",
        title: "Mid-semester Review",
        description: "Comprehensive review of progress and intervention effectiveness",
        status: "Upcoming",
        impact: "Pending"
      }
    ]
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Child Overview */}
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {parentData.child.name}'s Current Status
                </CardTitle>
                <CardDescription>Overview of your child's academic progress and support status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-blue-400">{parentData.child.currentGPA}</p>
                      <p className="text-sm text-muted-foreground">Current GPA</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-green-400">{parentData.child.attendance}%</p>
                      <p className="text-sm text-muted-foreground">Attendance</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-orange-400">{parentData.child.riskLevel}</p>
                      <p className="text-sm text-muted-foreground">Risk Level</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-purple-400">{parentData.interventions.filter(i => i.status === "Active").length}</p>
                      <p className="text-sm text-muted-foreground">Active Supports</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Quick Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {parentData.communications.filter(c => c.type === "Alert" && !c.read).slice(0, 3).map((alert, index) => (
                      <div key={index} className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium">{alert.subject}</p>
                            <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                            <p className="text-xs text-orange-400 mt-2">{alert.date}</p>
                          </div>
                          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50 text-xs">
                            New
                          </Badge>
                        </div>
                      </div>
                    ))}
                    {parentData.communications.filter(c => c.type === "Alert" && !c.read).length === 0 && (
                      <div className="text-center py-4 text-muted-foreground">
                        <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm">No new alerts</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Active Support Programs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {parentData.interventions.filter(i => i.status === "Active").map((intervention, index) => (
                      <div key={index} className="p-3 bg-secondary/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium">{intervention.type}</p>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50 text-xs">
                            {intervention.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{intervention.description}</p>
                        <div className="flex items-center gap-2">
                          <Progress value={intervention.progress} className="flex-1" />
                          <span className="text-xs">{intervention.progress}%</span>
                        </div>
                        <p className="text-xs text-blue-400 mt-1">Next: {intervention.nextSession}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Overview */}
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Progress Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Risk Factors Improvement</h3>
                    <div className="space-y-3">
                      {Object.entries(parentData.riskFactors).map(([key, factor]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm capitalize">{key}</span>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={factor.level === "Low" ? "default" : factor.level === "Medium" ? "secondary" : "destructive"}
                              className={
                                factor.level === "Low" ? "bg-green-500/20 text-green-400 border-green-500/50 text-xs" :
                                factor.level === "Medium" ? "bg-orange-500/20 text-orange-400 border-orange-500/50 text-xs" :
                                "bg-red-500/20 text-red-400 border-red-500/50 text-xs"
                              }
                            >
                              {factor.level}
                            </Badge>
                            <span className={`text-xs ${factor.improvement > 0 ? 'text-green-400' : factor.improvement < 0 ? 'text-red-400' : 'text-muted-foreground'}`}>
                              {factor.improvement > 0 ? '↑' : factor.improvement < 0 ? '↓' : '→'} {Math.abs(factor.improvement)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Upcoming Milestones</h3>
                    <div className="space-y-3">
                      {parentData.milestones.filter(m => m.status === "Scheduled" || m.status === "Upcoming").slice(0, 3).map((milestone, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{milestone.title}</p>
                            <p className="text-xs text-muted-foreground">{milestone.date}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {milestone.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "child-status":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {parentData.child.name}'s Detailed Status
                </CardTitle>
                <CardDescription>Comprehensive view of your child's academic and personal development</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Academic Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Student ID</span>
                          <span className="font-semibold">{parentData.child.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Program</span>
                          <span className="font-semibold">{parentData.child.program}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Current Semester</span>
                          <span className="font-semibold">{parentData.child.semester}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Current GPA</span>
                          <span className="font-semibold text-blue-400">{parentData.child.currentGPA}/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Attendance</span>
                          <span className="font-semibold text-green-400">{parentData.child.attendance}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Risk Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-4">
                        <div className="relative inline-block">
                          <Progress value={parentData.child.riskScore} className="w-24 h-24" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold text-orange-400">{parentData.child.riskScore}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <Badge 
                          variant={parentData.child.riskLevel === "Low" ? "default" : parentData.child.riskLevel === "Medium" ? "secondary" : "destructive"}
                          className={
                            parentData.child.riskLevel === "Low" ? "bg-green-500/20 text-green-400 border-green-500/50" :
                            parentData.child.riskLevel === "Medium" ? "bg-orange-500/20 text-orange-400 border-orange-500/50" :
                            "bg-red-500/20 text-red-400 border-red-500/50"
                          }
                        >
                          {parentData.child.riskLevel} Risk Level
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-2">Last Updated: {parentData.child.lastUpdated}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "risk-assessment":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Risk Factor Analysis
                </CardTitle>
                <CardDescription>Detailed breakdown of factors affecting your child's academic success</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(parentData.riskFactors).map(([key, factor]) => (
                    <Card key={key} className={`border-l-4 ${
                      factor.level === "Low" ? "border-l-green-500" :
                      factor.level === "Medium" ? "border-l-orange-500" :
                      "border-l-red-500"
                    }`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg capitalize">{key} Factors</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={factor.level === "Low" ? "default" : factor.level === "Medium" ? "secondary" : "destructive"}
                              className={
                                factor.level === "Low" ? "bg-green-500/20 text-green-400 border-green-500/50" :
                                factor.level === "Medium" ? "bg-orange-500/20 text-orange-400 border-orange-500/50" :
                                "bg-red-500/20 text-red-400 border-red-500/50"
                              }
                            >
                              {factor.level} Risk
                            </Badge>
                            <span className={`text-sm ${factor.improvement > 0 ? 'text-green-400' : factor.improvement < 0 ? 'text-red-400' : 'text-muted-foreground'}`}>
                              {factor.improvement > 0 ? '↑' : factor.improvement < 0 ? '↓' : '→'} {Math.abs(factor.improvement)}%
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {factor.details.map((detail, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-orange-400 mt-1">•</span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "support-resources":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Available Support Resources
                </CardTitle>
                <CardDescription>Resources and services available to help your child succeed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {parentData.resources.map((resource, index) => (
                    <Card key={index} className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
                      <CardHeader>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <Badge variant="outline" className="w-fit">
                          {resource.category}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-blue-400" />
                            <span className="text-sm">{resource.contact}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-green-400" />
                            <span className="text-sm">{resource.phone}</span>
                          </div>
                        </div>
                        <Button 
                          className="w-full mt-4" 
                          variant="outline"
                          onClick={() => alert(`Contacting ${resource.title}\nEmail: ${resource.contact}\nPhone: ${resource.phone}`)}
                        >
                          Contact Support
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "communication":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Communication Center
                </CardTitle>
                <CardDescription>Messages and updates from your child's support team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {parentData.communications.map((comm, index) => (
                    <Card key={index} className={`${!comm.read ? 'border-blue-500/50 bg-blue-500/10' : ''}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{comm.subject}</CardTitle>
                            <p className="text-sm text-muted-foreground">From: {comm.from}</p>
                            <p className="text-sm text-muted-foreground">{comm.date}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={comm.type === "Alert" ? "destructive" : comm.type === "Progress Update" ? "default" : "secondary"}
                              className={
                                comm.type === "Alert" ? "bg-red-500/20 text-red-400 border-red-500/50 text-xs" :
                                comm.type === "Progress Update" ? "bg-green-500/20 text-green-400 border-green-500/50 text-xs" :
                                "bg-blue-500/20 text-blue-400 border-blue-500/50 text-xs"
                              }
                            >
                              {comm.type}
                            </Badge>
                            {!comm.read && (
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50 text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{comm.message}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "progress-tracking":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Progress Tracking
                </CardTitle>
                <CardDescription>Track your child's progress through support programs and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Active Interventions Progress</h3>
                    <div className="space-y-4">
                      {parentData.interventions.map((intervention, index) => (
                        <Card key={index} className="bg-secondary/20">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{intervention.type}</CardTitle>
                              <Badge 
                                variant={intervention.status === "Active" ? "default" : intervention.status === "Scheduled" ? "secondary" : "outline"}
                                className={
                                  intervention.status === "Active" ? "bg-green-500/20 text-green-400 border-green-500/50" :
                                  intervention.status === "Scheduled" ? "bg-blue-500/20 text-blue-400 border-blue-500/50" :
                                  "text-xs"
                                }
                              >
                                {intervention.status}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">{intervention.description}</p>
                            <div className="flex items-center gap-2 mb-3">
                              <Progress value={intervention.progress} className="flex-1" />
                              <span className="text-sm font-medium">{intervention.progress}%</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Started: </span>
                                <span>{intervention.startDate}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Coordinator: </span>
                                <span>{intervention.coordinator}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Next Session: </span>
                                <span className="text-blue-400">{intervention.nextSession}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Milestones Timeline</h3>
                    <div className="space-y-4">
                      {parentData.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex flex-col items-center">
                            <div className={`w-4 h-4 rounded-full ${
                              milestone.status === "Completed" ? "bg-green-500" :
                              milestone.status === "Scheduled" ? "bg-blue-500" :
                              "bg-gray-500"
                            }`}></div>
                            {index < parentData.milestones.length - 1 && (
                              <div className="w-0.5 h-8 bg-gray-300 mt-2"></div>
                            )}
                          </div>
                          <Card className="flex-1">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-medium">{milestone.title}</h4>
                                  <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                                  <p className="text-sm text-blue-400 mt-2">{milestone.date}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  <Badge 
                                    variant={milestone.status === "Completed" ? "default" : milestone.status === "Scheduled" ? "secondary" : "outline"}
                                    className={
                                      milestone.status === "Completed" ? "bg-green-500/20 text-green-400 border-green-500/50 text-xs" :
                                      milestone.status === "Scheduled" ? "bg-blue-500/20 text-blue-400 border-blue-500/50 text-xs" :
                                      "text-xs"
                                    }
                                  >
                                    {milestone.status}
                                  </Badge>
                                  {milestone.impact !== "Pending" && (
                                    <Badge 
                                      variant="outline" 
                                      className={milestone.impact === "Positive" ? "text-green-400 border-green-500/50" : "text-xs"}
                                    >
                                      {milestone.impact}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </div>
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
    <div id="parent-dropout-dashboard-page">
      <DashboardLayout
        userData={userData}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={onLogout}
        navigation={navigation}
        title="Parent Support Portal"
      >
        {renderContent()}
      </DashboardLayout>
      <Chatbot userRole="parent" userData={userData} />
    </div>
  );
}
