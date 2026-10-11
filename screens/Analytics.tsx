import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell
} from "recharts";
import { TrendingUp, Zap, Factory, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const weeklyTrend = [
  { day: "Mon", quality: 88, target: 85 },
  { day: "Tue", quality: 92, target: 85 },
  { day: "Wed", quality: 79, target: 85 },
  { day: "Thu", quality: 95, target: 85 },
  { day: "Fri", quality: 86, target: 85 },
  { day: "Sat", quality: 90, target: 85 },
  { day: "Sun", quality: 84, target: 85 },
];

const monthlyDefects = [
  { month: "Jul", defects: 212 },
  { month: "Aug", defects: 245 },
  { month: "Sep", defects: 198 },
  { month: "Oct", defects: 225 },
  { month: "Nov", defects: 180 },
  { month: "Dec", defects: 200 },
];

const lineComparison = [
  { line: "Line 01", pass: 88, fail: 12 },
  { line: "Line 02", pass: 82, fail: 18 },
  { line: "Line 03", pass: 68, fail: 32 },
  { line: "Line 04", pass: 94, fail: 6 },
  { line: "Line 05", pass: 86, fail: 14 },
];

const heatmapData = [
  { line: "Line 01", defects: [2, 4, 1, 6, 3, 2, 1] },
  { line: "Line 02", defects: [5, 3, 7, 4, 6, 3, 4] },
  { line: "Line 03", defects: [8, 9, 12, 7, 10, 8, 9] },
  { line: "Line 04", defects: [1, 2, 1, 3, 1, 2, 0] },
  { line: "Line 05", defects: [4, 5, 6, 3, 7, 4, 5] },
];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function heatColor(v: number): string {
  if (v <= 2) return "rgba(16,185,129,0.4)";
  if (v <= 5) return "rgba(59,130,246,0.4)";
  if (v <= 8) return "rgba(245,158,11,0.5)";
  return "rgba(239,68,68,0.6)";
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="glass-bright rounded-lg px-3 py-2 text-xs border border-blue-500/20">
      <div className="text-slate-400 mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color || "#60a5fa" }}>{p.name}: {p.value}{typeof p.value === "number" && p.name?.toLowerCase().includes("quality") ? "%" : ""}</div>
      ))}
    </div>
  );
};

const linePeriods = ["Line 01", "Line 02", "Line 03", "Line 04", "Line 05", "All Lines"];
const datePeriods = ["This Week", "This Month", "Q4 2024", "YTD 2024"];

export default function Analytics() {
  const [datePeriod, setDatePeriod] = useState("This Week");
  const [linePeriod, setLinePeriod] = useState("All Lines");

  return (
    <div className="h-full overflow-y-auto px-6 py-5 circuit-bg space-y-5">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 bg-slate-800/40 rounded-xl p-1 border border-slate-700/40">
          {datePeriods.map((p) => (
            <button key={p} onClick={() => setDatePeriod(p)} className={`px-3 py-1.5 rounded-lg text-xs transition-all ${datePeriod === p ? "bg-blue-500 text-white" : "text-slate-400 hover:text-slate-300"}`}>{p}</button>
          ))}
        </div>
        <select className="input-field w-auto text-xs" value={linePeriod} onChange={(e) => setLinePeriod(e.target.value)}>
          {linePeriods.map((l) => <option key={l}>{l}</option>)}
        </select>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {[
          { label: "Production Quantity", value: "1,250", sub: "units this period", icon: <Factory size={18} />, color: "blue" },
          { label: "Inspection Automation", value: "98.4%", sub: "fully automated", icon: <Zap size={18} />, color: "violet" },
          { label: "Detection Accuracy", value: "91.2%", sub: "AI model confidence", icon: <TrendingUp size={18} />, color: "cyan" },
          { label: "Avg. Inspection Time", value: "6ms", sub: "per product", icon: <Clock size={18} />, color: "emerald" },
          { label: "Pass Rate", value: "84%", sub: "+2% vs last period", icon: <CheckCircle size={18} />, color: "emerald" },
          { label: "Fail Rate", value: "16%", sub: "-2% vs last period", icon: <AlertTriangle size={18} />, color: "red" },
        ].map((k) => (
          <div key={k.label} className="stat-card">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${
              k.color === "blue" ? "bg-blue-500/15 text-blue-400" :
              k.color === "violet" ? "bg-violet-500/15 text-violet-400" :
              k.color === "cyan" ? "bg-cyan-500/15 text-cyan-400" :
              k.color === "emerald" ? "bg-emerald-500/15 text-emerald-400" :
              "bg-red-500/15 text-red-400"
            }`}>{k.icon}</div>
            <div className="font-display text-2xl font-bold text-white">{k.value}</div>
            <div className="text-slate-500 text-xs mt-0.5">{k.label}</div>
            <div className="text-slate-600 text-[10px]">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="stat-card">
          <div className="font-display text-white font-semibold text-sm mb-4">Weekly Quality Trend</div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={weeklyTrend}>
              <defs>
                <linearGradient id="gQ" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.06)" />
              <XAxis dataKey="day" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} domain={[60, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="quality" stroke="#3b82f6" strokeWidth={2} fill="url(#gQ)" name="Quality %" />
              <Area type="monotone" dataKey="target" stroke="#10b981" strokeWidth={1.5} strokeDasharray="4 4" fill="none" name="Target" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="stat-card">
          <div className="font-display text-white font-semibold text-sm mb-4">Production Line Comparison</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={lineComparison} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.06)" vertical={false} />
              <XAxis dataKey="line" tick={{ fill: "#94a3b8", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="pass" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} name="Pass" />
              <Bar dataKey="fail" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} name="Fail" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="stat-card">
          <div className="font-display text-white font-semibold text-sm mb-4">Monthly Defect Trend</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={monthlyDefects} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.06)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="defects" radius={[4, 4, 0, 0]} name="Defects">
                {monthlyDefects.map((e, i) => <Cell key={i} fill={e.defects > 220 ? "#ef4444" : "#f59e0b"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Heatmap */}
        <div className="stat-card">
          <div className="font-display text-white font-semibold text-sm mb-4">Defect Heatmap (by line × day)</div>
          <div className="overflow-x-auto">
            <div className="flex gap-1 mb-1 pl-20">
              {days.map((d) => <div key={d} className="w-9 text-center text-[10px] text-slate-500">{d}</div>)}
            </div>
            {heatmapData.map((row) => (
              <div key={row.line} className="flex items-center gap-1 mb-1">
                <div className="w-18 text-[10px] text-slate-500 text-right pr-2" style={{ width: 72 }}>{row.line}</div>
                {row.defects.map((v, j) => (
                  <div
                    key={j}
                    className="w-9 h-8 rounded flex items-center justify-center text-[10px] font-mono-data font-semibold text-white"
                    style={{ background: heatColor(v) }}
                    title={`${row.line} ${days[j]}: ${v} defects`}
                  >
                    {v}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="stat-card border-violet-500/15">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} className="text-violet-400" />
          <span className="font-display text-white font-semibold text-sm">AI Insights</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { text: "Production Line 03 shows a 12% increase in surface defects compared with the previous week. Recommend immediate root-cause analysis.", color: "amber" },
            { text: "Inspection automation rate at 98.4% — 1.6% of inspections required manual review due to image quality issues.", color: "blue" },
            { text: "AI model accuracy improved by 2.3% after last week's retraining with 500 new labeled samples.", color: "emerald" },
            { text: "Peak defect rate occurs on Wednesday mornings — correlates with shift changeover. Consider additional quality checks.", color: "red" },
          ].map((ins, i) => (
            <div key={i} className={`rounded-xl p-4 border ${
              ins.color === "amber" ? "bg-amber-500/8 border-amber-500/20" :
              ins.color === "blue" ? "bg-blue-500/8 border-blue-500/20" :
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
