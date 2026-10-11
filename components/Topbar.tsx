import { Bell, Search, X, CheckCheck } from "lucide-react";

interface Notification {
  id: number;
  type: "critical" | "success" | "warning";
  message: string;
  time: string;
  read: boolean;
  screen?: string;
}

interface TopbarProps {
  title: string;
  notifications: Notification[];
  showNotif: boolean;
  onToggleNotif: () => void;
  onMarkRead: (id: number) => void;
  onMarkAllRead: () => void;
  onNotifNavigate: (screen: string) => void;
}

const typeColors = {
  critical: "bg-red-500/15 border-red-500/30 text-red-400",
  success: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
  warning: "bg-amber-500/15 border-amber-500/30 text-amber-400",
};

export default function Topbar({ title, notifications, showNotif, onToggleNotif, onMarkRead, onMarkAllRead, onNotifNavigate }: TopbarProps) {
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="h-14 flex items-center justify-between px-6 border-b border-blue-500/10 glass flex-shrink-0 relative z-20">
      <h1 className="font-display text-white font-bold text-lg">{title}</h1>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            className="bg-slate-800/40 border border-slate-700/50 rounded-lg pl-8 pr-4 py-1.5 text-sm text-slate-300 placeholder-slate-600 outline-none focus:border-blue-500/40 w-48"
            placeholder="Search…"
          />
        </div>

        <div className="relative">
          <button
            onClick={onToggleNotif}
            className={`relative p-2 rounded-lg border transition-colors ${showNotif ? "bg-blue-500/15 border-blue-500/30" : "border-slate-700/50 hover:border-slate-600"}`}
          >
            <Bell size={16} className={unread > 0 ? "text-amber-400" : "text-slate-400"} />
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>

          {showNotif && (
            <div className="absolute right-0 top-10 w-80 glass-bright rounded-xl border border-blue-500/15 overflow-hidden shadow-xl">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/40">
                <span className="font-display text-white font-semibold text-sm">Notifications</span>
                <div className="flex items-center gap-2">
                  <button onClick={onMarkAllRead} className="text-blue-400 text-xs hover:text-blue-300 flex items-center gap-1">
                    <CheckCheck size={12} /> All read
                  </button>
                  <button onClick={onToggleNotif} className="text-slate-600 hover:text-slate-400">
                    <X size={14} />
                  </button>
                </div>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-slate-500 text-sm">No notifications</div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`px-4 py-3 border-b border-slate-700/20 cursor-pointer hover:bg-slate-800/30 transition-colors ${n.read ? "opacity-60" : ""}`}
                      onClick={() => {
                        onMarkRead(n.id);
                        if (n.screen) onNotifNavigate(n.screen);
                      }}
                    >
                      <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono-data font-600 border mb-1 ${typeColors[n.type]}`}>
                        {n.type.toUpperCase()}
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed">{n.message}</p>
                      <p className="text-slate-600 text-[10px] mt-0.5">{n.time}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
          AS
        </div>
      </div>
    </div>
  );
}
