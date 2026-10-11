import { useState } from "react";
import {
  Cpu, LayoutDashboard, PlusCircle, ClipboardList, BarChart3,
  FileText, TrendingUp, Users, Settings, LogOut, User,
  Bell, ChevronDown, X, Menu
} from "lucide-react";

type Screen =
  | "dashboard" | "new-inspection" | "history" | "defect-analysis"
  | "quality-reports" | "analytics" | "users" | "settings";

interface SidebarProps {
  current: Screen;
  onNavigate: (s: Screen) => void;
  onLogout: () => void;
  notificationCount: number;
  onNotificationClick: () => void;
}

const navItems: { label: string; icon: React.ReactNode; screen: Screen }[] = [
  { label: "Dashboard", icon: <LayoutDashboard size={16} />, screen: "dashboard" },
  { label: "New Inspection", icon: <PlusCircle size={16} />, screen: "new-inspection" },
  { label: "Inspection History", icon: <ClipboardList size={16} />, screen: "history" },
  { label: "Defect Analysis", icon: <BarChart3 size={16} />, screen: "defect-analysis" },
  { label: "Quality Reports", icon: <FileText size={16} />, screen: "quality-reports" },
  { label: "Manufacturing Analytics", icon: <TrendingUp size={16} />, screen: "analytics" },
  { label: "Users", icon: <Users size={16} />, screen: "users" },
  { label: "Settings", icon: <Settings size={16} />, screen: "settings" },
];

export default function Sidebar({ current, onNavigate, onLogout, notificationCount, onNotificationClick }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <div className={`flex flex-col h-full transition-all duration-300 ${collapsed ? "w-16" : "w-56"} glass border-r border-blue-500/10 flex-shrink-0 relative z-10`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-blue-500/10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 glow-blue">
            <Cpu size={15} className="text-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="font-display font-bold text-white text-sm leading-none">VISIONINSPECT</div>
              <div className="text-[9px] text-blue-400 font-mono-data tracking-widest mt-0.5">AI PLATFORM</div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto text-slate-600 hover:text-slate-400 transition-colors"
          >
            <Menu size={14} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <div
              key={item.screen}
              className={`sidebar-item ${current === item.screen ? "active" : ""}`}
              onClick={() => onNavigate(item.screen)}
              title={collapsed ? item.label : undefined}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && item.screen === "new-inspection" && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              )}
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-blue-500/10 space-y-0.5">
          <button
            onClick={onNotificationClick}
            className={`sidebar-item w-full relative ${notificationCount > 0 ? "text-amber-400" : ""}`}
          >
            <Bell size={16} className="flex-shrink-0" />
            {!collapsed && <span>Notifications</span>}
            {notificationCount > 0 && (
              <span className="absolute top-1.5 left-5 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>
          <div className="sidebar-item">
            <User size={16} className="flex-shrink-0" />
            {!collapsed && (
              <div className="min-w-0">
                <div className="text-slate-300 text-xs font-medium truncate">Arjun Sharma</div>
                <div className="text-slate-600 text-[10px] truncate">Quality Engineer</div>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="sidebar-item w-full text-red-400/70 hover:text-red-400 hover:bg-red-500/8"
          >
            <LogOut size={16} className="flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Logout modal */}
      {showLogoutModal && (
        <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="glass-bright rounded-2xl p-7 w-full max-w-sm mx-4 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-display text-white font-bold text-xl">Confirm Logout</h3>
                <p className="text-slate-400 text-sm mt-1">Are you sure you want to sign out of VisionInspect AI?</p>
              </div>
              <button onClick={() => setShowLogoutModal(false)} className="text-slate-600 hover:text-slate-400">
                <X size={18} />
              </button>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowLogoutModal(false)} className="flex-1 py-2.5 rounded-lg border border-slate-600 text-slate-300 text-sm hover:border-slate-500 transition-colors">
                Cancel
              </button>
              <button
                onClick={onLogout}
                className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-semibold hover:from-red-500 hover:to-red-400 transition-all"
              >
                Confirm Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
