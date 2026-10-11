import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid
} from "recharts";
import { AlertTriangle, TrendingUp, Cpu, Zap } from "lucide-react";

const defectByType = [
  { name: "Surface Crack", count: 48, color: "#ef4444" },
  { name: "Corrosion", count: 32, color: "#f59e0b" },
  { name: "Dent", count: 24, color: "#3b82f6" },
  { name: "Scratch", count: 18, color: "#8b5cf6" },
  { name: "Weld Defect", count: 14, color: "#06b6d4" },
  { name: "Contamination", count: 9, color: "#64748b" },
];

const defectBySeverity = [
  { name: "Critical", value: 45, color: "#ef4444" },
  { name: "High", value: 68, color: "#f59e0b" },
  { name: "Medium", value: 52, color: "#3b82f6" },
  { name: "Low", value: 35, color: "#10b981" },
];

const byLine = [
  { line: "Line 01", defects: 28 },
  { line: "Line 02", defects: 35 },
  { line: "Line 03", defects: 62 },
  { line: "Line 04", defects: 19 },
  { line: "Line 05", defects: 31 },
];

const overTimeData: Record<string, { day: string; defects: number }[]> = {
  "Today": [
    { day: "06:00", defects: 3 }, { day: "09:00", defects: 7 }, { day: "12:00", defects: 5 },
    { day: "15:00", defects: 9 }, { day: "18:00", defects: 6 }, { day: "21:00", defects: 4 },
  ],
  "7 Days": [
    { day: "Mon", defects: 18 }, { day: "Tue", defects: 12 }, { day: "Wed", defects: 25 },
    { day: "Thu", defects: 8 }, { day: "Fri", defects: 22 }, { day: "Sat", defects: 15 }, { day: "Sun", defects: 11 },
  ],
  "30 Days": [
    { day: "W1", defects: 65 }, { day: "W2", defects: 72 }, { day: "W3", defects: 58 }, { day: "W4", defects: 80 },
  ],
  "3 Months": [
    { day: "Oct", defects: 245 }, { day: "Nov", defects: 198 }, { day: "Dec", defects: 200 },
  ],
};

const filters = ["Today", "7 Days", "30 Days", "3 Months"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="glass-bright rounded-lg px-3 py-2 text-xs border border-blue-500/20">
      <div className="text-slate-400 mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color || "#60a5fa" }}>{p.name || "Defects"}: {p.value}</div>
      ))}
    </div>
  );
};

export default function DefectAnalysis() {
  const [activeFilter, setActiveFilter] = useState("7 Days");

  const stats = [
    { label: "Total Defects", value: "200", icon: <AlertTriangle size={18} />, color: "red" },
    { label: "Critical Defects", value: "45", icon: <Zap size={18} />, color: "red" },
    { label: "High Severity", value: "68", icon: <TrendingUp size={18} />, color: "amber" },
    { label: "Avg. Confidence", value: "88.4%", icon: <Cpu size={18} />, color: "blue" },
  ];

  return (
    <div className="h-full overflow-y-auto px-6 py-5 circuit-bg space-y-5">
      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${
              s.color === "red" ? "bg-red-500/15 text-red-400" :
              s.color === "amber" ? "bg-amber-500/15 text-amber-400" :
              "bg-blue-500/15 text-blue-400"
            }`}>{s.icon}</div>
            <div className="font-display text-3xl font-bold text-white">{s.value}</div>
            <div className="text-slate-500 text-xs mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Time filter */}
      <div className="flex items-center gap-2">
        <span className="text-slate-500 text-xs">Time range:</span>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
              activeFilter === f
                ? "bg-blue-500 text-white"
                : "border border-slate-700 text-slate-400 hover:border-slate-600"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Defects over time */}
        <div className="stat-card">
          <div className="font-display text-white font-semibold text-sm mb-4">Defects Over Time</div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={overTimeData[activeFilter]}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.06)" />
              <XAxis dataKey="day" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="defects" stroke="#ef4444" strokeWidth={2} dot={{ fill: "#ef4444", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* By type */}
        <div className="stat-card">
          <div className="font-display text-white font-semibold text-sm mb-4">Defects by Type</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={defectByType} layout="vertical" barSize={10}>
              <XAxis type="number" tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: "#94a3b8", fontSize: 10 }} axisLine={false} tickLine={false} width={90} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {defectByType.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* By severity */}
        <div className="stat-card">
          <div className="font-display text-white font-semibold text-sm mb-4">Defects by Severity</div>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie data={defectBySeverity} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={3} dataKey="value">
                  {defectBySeverity.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {defectBySeverity.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                    <span className="text-slate-400">{d.name}</span>
                  </span>
                  <span className="font-mono-data text-slate-300">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* By production line */}
        <div className="stat-card">
          <div className="font-display text-white font-semibold text-sm mb-4">Defects by Production Line</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={byLine} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.06)" vertical={false} />
              <XAxis dataKey="line" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="defects" radius={[4, 4, 0, 0]} fill="url(#barGrad)" />
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 px-3 py-2 rounded-lg bg-amber-500/8 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
            <AlertTriangle size={12} />
            Line 03 has the highest defect rate — 12% above average
          </div>
        </div>
      </div>
    </div>
  );
}
