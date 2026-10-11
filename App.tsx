import { useState } from "react";

import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import NewInspection from "./screens/NewInspection";
import AIProcessing from "./screens/AIProcessing";
import InspectionResult from "./screens/InspectionResult";
import SeverityAssessment from "./screens/SeverityAssessment";
import InspectionHistory from "./screens/InspectionHistory";
import DefectAnalysis from "./screens/DefectAnalysis";
import QualityReports from "./screens/QualityReports";
import Analytics from "./screens/Analytics";
import UserManagement from "./screens/UserManagement";
import Settings from "./screens/Settings";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

// ── screen type ──────────────────────────────────────────────────────────────
type AppScreen =
  | "login"
  | "dashboard"
  | "new-inspection"
  | "ai-processing"
  | "inspection-result"
  | "severity-assessment"
  | "history"
  | "defect-analysis"
  | "quality-reports"
  | "analytics"
  | "users"
  | "settings";

type SidebarScreen = Exclude<AppScreen, "login" | "ai-processing" | "inspection-result" | "severity-assessment">;

// ── notification data ─────────────────────────────────────────────────────────
interface Notification {
  id: number;
  type: "critical" | "success" | "warning";
  message: string;
  time: string;
  read: boolean;
  screen?: string;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: "critical",
    message: "Critical defect detected in Product P-1002. Surface Crack — 94% confidence.",
    time: "2 min ago",
    read: false,
    screen: "history",
  },
  {
    id: 2,
    type: "success",
    message: "Inspection batch B-2024-11 completed successfully. 48 products inspected.",
    time: "18 min ago",
    read: false,
    screen: "history",
  },
  {
    id: 3,
    type: "warning",
    message: "Production Line 03 defect rate increased by 8% in the last 4 hours.",
    time: "1 hr ago",
    read: false,
    screen: "analytics",
  },
  {
    id: 4,
    type: "success",
    message: "Weekly quality report generated and sent to supervisors.",
    time: "3 hr ago",
    read: true,
    screen: "quality-reports",
  },
  {
    id: 5,
    type: "warning",
    message: "AI model retraining scheduled for tonight 02:00 IST.",
    time: "5 hr ago",
    read: true,
  },
];

// ── screen title map ─────────────────────────────────────────────────────────
const screenTitles: Record<AppScreen, string> = {
  login: "Login",
  dashboard: "Dashboard",
  "new-inspection": "New Product Inspection",
  "ai-processing": "AI Processing",
  "inspection-result": "Inspection Result",
  "severity-assessment": "Severity Assessment",
  history: "Inspection History",
  "defect-analysis": "Defect Analysis",
  "quality-reports": "Quality Reports",
  analytics: "Manufacturing Analytics",
  users: "User Management",
  settings: "Settings",
};

// ── app ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<AppScreen>("login");
  const [inspectionImage, setInspectionImage] = useState<string>("");
  const [inspectionResult, setInspectionResult] = useState<"fail" | "pass">("fail");
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [showNotif, setShowNotif] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navigate = (s: AppScreen) => {
    setScreen(s);
    setShowNotif(false);
  };

  const markRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const notifNavigate = (sc: string) => {
    if (sc) navigate(sc as AppScreen);
    setShowNotif(false);
  };

  // Add notification when inspection saved
  const onInspectionSaved = () => {
    const newNotif: Notification = {
      id: Date.now(),
      type: "success",
      message: "Inspection saved successfully and added to history.",
      time: "Just now",
      read: false,
      screen: "history",
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // ── login screen ─────────────────────────────────────────────────────────
  if (screen === "login") {
    return <Login onLogin={() => navigate("dashboard")} />;
  }

  // ── authenticated layout ─────────────────────────────────────────────────
  return (
    <div className="flex h-full bg-[#020817] overflow-hidden">
      {/* Ambient background orbs */}
      <div className="fixed top-0 right-0 w-96 h-96 rounded-full bg-blue-600/5 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-1/3 w-80 h-80 rounded-full bg-violet-600/5 blur-[100px] pointer-events-none z-0" />

      {/* Sidebar */}
      <Sidebar
        current={screen as SidebarScreen}
        onNavigate={(s) => navigate(s as AppScreen)}
        onLogout={() => navigate("login")}
        notificationCount={unreadCount}
        onNotificationClick={() => setShowNotif((p) => !p)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Topbar (hide on processing/result for more immersion) */}
        {screen !== "ai-processing" && (
          <Topbar
            title={screenTitles[screen]}
            notifications={notifications}
            showNotif={showNotif}
            onToggleNotif={() => setShowNotif((p) => !p)}
            onMarkRead={markRead}
            onMarkAllRead={markAllRead}
            onNotifNavigate={notifNavigate}
          />
        )}

        {/* Screen content */}
        <div className="flex-1 min-h-0">
          {screen === "dashboard" && (
            <Dashboard onNavigate={(s) => navigate(s as AppScreen)} />
          )}

          {screen === "new-inspection" && (
            <NewInspection
              onStartInspection={(img) => {
                setInspectionImage(img);
                navigate("ai-processing");
              }}
            />
          )}

          {screen === "ai-processing" && (
            <div className="h-full flex flex-col">
              <div className="h-14 flex items-center gap-3 px-6 border-b border-blue-500/10 glass flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="font-display text-white font-bold text-lg">AI Processing</span>
                <span className="text-slate-500 text-sm ml-2">VisionInspect AI is analyzing the product…</span>
              </div>
              <div className="flex-1 min-h-0">
                <AIProcessing
                  image={inspectionImage}
                  onComplete={(result) => {
                    setInspectionResult(result);
                    navigate("inspection-result");
                  }}
                  onError={() => {}}
                />
              </div>
            </div>
          )}

          {screen === "inspection-result" && (
            <InspectionResult
              image={inspectionImage}
              result={inspectionResult}
              onNewInspection={() => navigate("new-inspection")}
              onViewSeverity={() => navigate("severity-assessment")}
              onSaved={onInspectionSaved}
            />
          )}

          {screen === "severity-assessment" && (
            <SeverityAssessment />
          )}

          {screen === "history" && (
            <InspectionHistory
              onViewResult={() => {
                setInspectionImage(
                  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop&auto=format"
                );
                setInspectionResult("fail");
                navigate("inspection-result");
              }}
            />
          )}

          {screen === "defect-analysis" && <DefectAnalysis />}
          {screen === "quality-reports" && <QualityReports />}
          {screen === "analytics" && <Analytics />}
          {screen === "users" && <UserManagement />}
          {screen === "settings" && <Settings />}
        </div>
      </div>
    </div>
  );
}
