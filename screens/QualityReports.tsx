import { useState } from "react";
import { FileText, Download, Table2, CheckCircle, Loader, X } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

const qualityData = [
  { month: "Jul", passRate: 82, failRate: 18 },
  { month: "Aug", passRate: 85, failRate: 15 },
  { month: "Sep", passRate: 79, failRate: 21 },
  { month: "Oct", passRate: 88, failRate: 12 },
  { month: "Nov", passRate: 84, failRate: 16 },
  { month: "Dec", passRate: 84, failRate: 16 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="glass-bright rounded-lg px-3 py-2 text-xs border border-blue-500/20">
      <div className="text-slate-400 mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color }}>{p.name}: {p.value}%</div>
      ))}
    </div>
  );
};

export default function QualityReports() {
  const [genLoading, setGenLoading] = useState(false);
  const [genDone, setGenDone] = useState(false);
  const [csvToast, setCsvToast] = useState(false);
  const [pdfToast, setPdfToast] = useState(false);

  const handleGenerate = () => {
    setGenLoading(true);
    setGenDone(false);
    setTimeout(() => { setGenLoading(false); setGenDone(true); }, 2200);
  };

  const handleCsv = () => {
    setCsvToast(true);
    setTimeout(() => setCsvToast(false), 3000);
  };

  const handlePdf = () => {
    setPdfToast(true);
    setTimeout(() => setPdfToast(false), 3000);
  };

  return (
    <div className="h-full overflow-y-auto px-6 py-5 circuit-bg space-y-5">
      {/* Header actions */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleGenerate}
          className="btn-primary px-5 py-2.5 rounded-xl text-sm flex items-center gap-2"
          disabled={genLoading}
        >
          {genLoading ? <Loader size={14} className="animate-spin" /> : <FileText size={14} />}
          {genLoading ? "Generating…" : "Generate Report"}
        </button>
        <button onClick={handlePdf} className="px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 border border-violet-500/30 bg-violet-500/8 text-violet-300 hover:bg-violet-500/15 transition-colors">
          <Download size={14} /> Download PDF
        </button>
        <button onClick={handleCsv} className="px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 border border-cyan-500/30 bg-cyan-500/8 text-cyan-300 hover:bg-cyan-500/15 transition-colors">
          <Table2 size={14} /> Export CSV
        </button>
        {genDone && (
          <div className="flex items-center gap-2 text-emerald-400 text-sm">
            <CheckCircle size={14} /> Report generated successfully!
          </div>
        )}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
        {[
          { label: "Total Inspected", value: "1,250", color: "blue" },
          { label: "Pass Rate", value: "84%", color: "emerald" },
          { label: "Fail Rate", value: "16%", color: "red" },
          { label: "Defect Rate", value: "16%", color: "amber" },
          { label: "Critical Defects", value: "45", color: "red" },
        ].map((s) => (
          <div key={s.label} className="stat-card text-center">
            <div className={`font-display text-3xl font-bold mb-1 ${
              s.color === "blue" ? "text-blue-400" :
              s.color === "emerald" ? "text-emerald-400" :
              s.color === "amber" ? "text-amber-400" : "text-red-400"
            }`}>{s.value}</div>
            <div className="text-slate-500 text-xs">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quality chart */}
      <div className="stat-card">
        <div className="font-display text-white font-semibold text-sm mb-4">Monthly Quality Trend</div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={qualityData}>
            <defs>
              <linearGradient id="gPass2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gFail2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.06)" />
            <XAxis dataKey="month" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="passRate" stroke="#10b981" strokeWidth={2} fill="url(#gPass2)" name="Pass Rate" />
            <Area type="monotone" dataKey="failRate" stroke="#ef4444" strokeWidth={2} fill="url(#gFail2)" name="Fail Rate" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Summary tables */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="font-display text-white font-semibold text-sm mb-3">Defect Summary</div>
          <table className="w-full text-xs">
            <thead><tr className="border-b border-slate-700/40">
              <th className="text-left text-slate-500 pb-2">Type</th>
              <th className="text-right text-slate-500 pb-2">Count</th>
              <th className="text-right text-slate-500 pb-2">%</th>
            </tr></thead>
            <tbody>
              {[["Surface Crack", 48, "24%"], ["Corrosion", 32, "16%"], ["Dent", 24, "12%"], ["Scratch", 18, "9%"], ["Other", 78, "39%"]].map(([t, c, p]) => (
                <tr key={String(t)} className="border-b border-slate-800/30">
                  <td className="py-2 text-slate-300">{t}</td>
                  <td className="py-2 text-right font-mono-data text-slate-300">{c}</td>
                  <td className="py-2 text-right font-mono-data text-slate-500">{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="stat-card">
          <div className="font-display text-white font-semibold text-sm mb-3">Severity Summary</div>
          <table className="w-full text-xs">
            <thead><tr className="border-b border-slate-700/40">
              <th className="text-left text-slate-500 pb-2">Level</th>
              <th className="text-right text-slate-500 pb-2">Count</th>
              <th className="text-right text-slate-500 pb-2">%</th>
            </tr></thead>
            <tbody>
              {[["Critical", 45, "22.5%", "badge-critical"], ["High", 68, "34%", "badge-high"], ["Medium", 52, "26%", "badge-medium"], ["Low", 35, "17.5%", "badge-low"]].map(([l, c, p, cls]) => (
                <tr key={String(l)} className="border-b border-slate-800/30">
                  <td className="py-2"><span className={`status-badge ${cls}`}>{l}</span></td>
                  <td className="py-2 text-right font-mono-data text-slate-300">{c}</td>
                  <td className="py-2 text-right font-mono-data text-slate-500">{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="stat-card">
          <div className="font-display text-white font-semibold text-sm mb-3">Production Line Summary</div>
          <table className="w-full text-xs">
            <thead><tr className="border-b border-slate-700/40">
              <th className="text-left text-slate-500 pb-2">Line</th>
              <th className="text-right text-slate-500 pb-2">Defects</th>
              <th className="text-right text-slate-500 pb-2">Rate</th>
            </tr></thead>
            <tbody>
              {[["Line 01", 28, "11.2%"], ["Line 02", 35, "14%"], ["Line 03", 62, "24.8%"], ["Line 04", 19, "7.6%"], ["Line 05", 56, "22.4%"]].map(([l, c, r]) => (
                <tr key={String(l)} className="border-b border-slate-800/30">
                  <td className="py-2 text-slate-300">{l}</td>
                  <td className="py-2 text-right font-mono-data text-slate-300">{c}</td>
                  <td className="py-2 text-right font-mono-data text-slate-500">{r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast notifications */}
      {csvToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up rounded-xl px-5 py-3 flex items-center gap-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shadow-xl">
          <CheckCircle size={15} />
          <span className="text-sm font-medium">CSV exported successfully!</span>
          <button onClick={() => setCsvToast(false)}><X size={13} /></button>
        </div>
      )}
      {pdfToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up rounded-xl px-5 py-3 flex items-center gap-3 bg-violet-500/20 border border-violet-500/40 text-violet-300 shadow-xl">
          <Download size={15} />
          <span className="text-sm font-medium">PDF report downloaded!</span>
          <button onClick={() => setPdfToast(false)}><X size={13} /></button>
        </div>
      )}
    </div>
  );
}
