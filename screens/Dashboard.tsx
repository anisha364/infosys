import {
  AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Eye, ArrowRight, Cpu, Zap } from "lucide-react";

interface DashboardProps {
  onNavigate: (s: string) => void;
}

const trendData = [
  { day: "Mon", passed: 82, failed: 18 },
  { day: "Tue", passed: 90, failed: 12 },
  { day: "Wed", passed: 75, failed: 25 },
  { day: "Thu", passed: 95, failed: 8 },
  { day: "Fri", passed: 88, failed: 14 },
  { day: "Sat", passed: 70, failed: 20 },
  { day: "Sun", passed: 92, failed: 11 },
];

const defectDist = [
  { name: "Surface Crack", value: 38, color: "#ef4444" },
  { name: "Corrosion", value: 22, color: "#f59e0b" },
  { name: "Dent", value: 18, color: "#3b82f6" },
  { name: "Scratch", value: 14, color: "#8b5cf6" },
  { name: "Other", value: 8, color: "#64748b" },
];

const severityData = [
  { level: "Critical", count: 45, color: "#ef4444" },
  { level: "High", count: 68, color: "#f59e0b" },
  { level: "Medium", count: 52, color: "#3b82f6" },
  { level: "Low", count: 35, color: "#10b981" },
];

const recentInspections = [
  { id: "INS-1050", product: "P-1050", time: "2 min ago", defect: "Surface Crack", conf: "94%", severity: "CRITICAL", decision: "FAIL" },
  { id: "INS-1049", product: "P-1049", time: "8 min ago", defect: "None", conf: "98%", severity: "—", decision: "PASS" },
  { id: "INS-1048", product: "P-1048", time: "14 min ago", defect: "Corrosion", conf: "87%", severity: "HIGH", decision: "FAIL" },
  { id: "INS-1047", product: "P-1047", time: "22 min ago", defect: "None", conf: "96%", severity: "—", decision: "PASS" },
  { id: "INS-1046", product: "P-1046", time: "31 min ago", defect: "Scratch", conf: "79%", severity: "MEDIUM", decision: "FAIL" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="glass-bright rounded-lg px-3 py-2 text-xs border border-blue-500/20">
      <div className="text-slate-400 mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</div>
      ))}
    </div>
  );
};

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="h-full overflow-y-auto px-6 py-5 space-y-5 circuit-bg">
      {/* AI Status Banner */}
      <div className="glass rounded-xl px-5 py-3 flex items-center gap-3 border border-cyan-500/15">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-cyan-400 text-sm font-mono-data">AI INSPECTION ENGINE ACTIVE</span>
        <span className="text-slate-500 text-xs ml-2">Processing 3 inspections · Last updated 14s ago</span>
        <div className="ml-auto flex items-center gap-2">
          <Zap size={13} className="text-amber-400" />
          <span className="text-amber-400 text-xs">Alert: Critical defect in Production Line 03</span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Total Inspections", value: "1,250", icon: <Cpu size={18} />, change: "+12%", up: true, color: "blue" },
          { label: "Passed Products", value: "1,050", icon: <CheckCircle size={18} />, change: "+8%", up: true, color: "emerald" },
          { label: "Failed Products", value: "200", icon: <AlertTriangle size={18} />, change: "+3%", up: false, color: "red" },
          { label: "Defect Rate", value: "16%", icon: <TrendingDown size={18} />, change: "-2%", up: true, color: "amber" },
        ].map((card) => (
          <div key={card.label} className="stat-card animate-fade-in-up">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                card.color === "blue" ? "bg-blue-500/15 text-blue-400" :
                card.color === "emerald" ? "bg-emerald-500/15 text-emerald-400" :
                card.color === "red" ? "bg-red-500/15 text-red-400" :
                "bg-amber-500/15 text-amber-400"
              }`}>
                {card.icon}
              </div>
              <span className={`text-xs font-mono-data flex items-center gap-1 ${card.up ? "text-emerald-400" : "text-red-400"}`}>
                {card.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {card.change}
              </span>
            </div>
            <div className="font-display text-3xl font-bold text-white">{card.value}</div>
            <div className="text-slate-500 text-xs mt-0.5">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Trend chart */}
        <div className="xl:col-span-2 stat-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-display text-white font-semibold text-sm">Inspection Trend</div>
              <div className="text-slate-500 text-xs">Last 7 days</div>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />Passed</span>
              <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" />Failed</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="gPass" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gFail" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.06)" />
              <XAxis dataKey="day" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="passed" stroke="#10b981" strokeWidth={2} fill="url(#gPass)" name="Passed" />
              <Area type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} fill="url(#gFail)" name="Failed" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Defect distribution */}
        <div className="stat-card">
          <div className="font-display text-white font-semibold text-sm mb-1">Defect Distribution</div>
          <div className="text-slate-500 text-xs mb-4">By defect type</div>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie data={defectDist} cx="50%" cy="50%" innerRadius={38} outerRadius={58} paddingAngle={3} dataKey="value">
                {defectDist.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {defectDist.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full inline-block" style={{ background: d.color }} /><span className="text-slate-400">{d.name}</span></span>
                <span className="font-mono-data text-slate-300">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Severity + recent inspections */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="font-display text-white font-semibold text-sm mb-4">By Severity</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={severityData} layout="vertical" barSize={10}>
              <XAxis type="number" tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="level" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} width={55} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {severityData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent inspections */}
        <div className="xl:col-span-2 stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="font-display text-white font-semibold text-sm">Recent Inspections</div>
            <button onClick={() => onNavigate("history")} className="text-blue-400 text-xs flex items-center gap-1 hover:text-blue-300 transition-colors">
              View all <ArrowRight size={12} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-700/40">
                  {["ID", "Product", "Time", "Defect", "Conf.", "Severity", "Decision", ""].map((h) => (
                    <th key={h} className="text-left text-slate-500 font-medium pb-2 pr-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentInspections.map((row) => (
                  <tr key={row.id} className="border-b border-slate-800/40 hover:bg-blue-500/3 transition-colors">
                    <td className="py-2.5 pr-3 font-mono-data text-blue-400">{row.id}</td>
                    <td className="py-2.5 pr-3 text-slate-300">{row.product}</td>
                    <td className="py-2.5 pr-3 text-slate-500">{row.time}</td>
                    <td className="py-2.5 pr-3 text-slate-300">{row.defect}</td>
                    <td className="py-2.5 pr-3 font-mono-data text-slate-300">{row.conf}</td>
                    <td className="py-2.5 pr-3">
                      {row.severity !== "—" && (
                        <span className={`status-badge ${
                          row.severity === "CRITICAL" ? "badge-critical" :
                          row.severity === "HIGH" ? "badge-high" : "badge-medium"
                        }`}>{row.severity}</span>
                      )}
                      {row.severity === "—" && <span className="text-slate-600">—</span>}
                    </td>
                    <td className="py-2.5 pr-3">
                      <span className={`status-badge ${row.decision === "PASS" ? "badge-pass" : "badge-fail"}`}>
                        {row.decision}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <button onClick={() => onNavigate("history")} className="text-blue-400 hover:text-blue-300">
                        <Eye size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="stat-card border-violet-500/15">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} className="text-violet-400" />
          <span className="font-display text-white font-semibold text-sm">AI Insights</span>
          <span className="status-badge badge-medium ml-2">LIVE</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { text: "Production Line 03 shows a 12% increase in surface defects compared to the previous week. Recommend immediate inspection.", color: "amber" },
            { text: "AI model confidence averaging 91.2% — within optimal operating parameters. No model recalibration required.", color: "emerald" },
            { text: "Batch B-2024-11 has a 22% defect rate, significantly above the 16% baseline. Escalation recommended.", color: "red" },
          ].map((ins, i) => (
            <div key={i} className={`rounded-xl p-4 border ${
              ins.color === "amber" ? "bg-amber-500/8 border-amber-500/20" :
              ins.color === "emerald" ? "bg-emerald-500/8 border-emerald-500/20" :
              "bg-red-500/8 border-red-500/20"
            }`}>
              <p className="text-slate-300 text-xs leading-relaxed">{ins.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
