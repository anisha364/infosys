import { AlertTriangle } from "lucide-react";

const params = [
  { label: "Defect Size", weight: 30, score: 85, color: "#ef4444" },
  { label: "Defect Location", weight: 25, score: 90, color: "#f59e0b" },
  { label: "Defect Type", weight: 25, score: 95, color: "#8b5cf6" },
  { label: "Detection Confidence", weight: 20, score: 92, color: "#3b82f6" },
];

const overallScore = 88;

const levels = [
  { label: "LOW", range: "0–39", color: "#10b981" },
  { label: "MEDIUM", range: "40–59", color: "#3b82f6" },
  { label: "HIGH", range: "60–79", color: "#f59e0b" },
  { label: "CRITICAL", range: "80–100", color: "#ef4444" },
];

function CircularGauge({ score }: { score: number }) {
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const angle = (score / 100) * 270 - 135;

  return (
    <div className="relative flex items-center justify-center" style={{ width: 200, height: 200 }}>
      <svg width="200" height="200" className="-rotate-[135deg]">
        {/* Background track */}
        <circle
          cx="100" cy="100" r={radius}
          fill="none"
          stroke="rgba(30,41,59,0.8)"
          strokeWidth="12"
          strokeDasharray={`${(270 / 360) * circumference} ${circumference}`}
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <circle
          cx="100" cy="100" r={radius}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="12"
          strokeDasharray={`${(progress * 270) / 360} ${circumference}`}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <div className="font-display text-4xl font-bold text-white leading-none">{score}</div>
        <div className="text-slate-500 text-xs mt-1">/ 100</div>
        <div className="mt-2">
          <span className="status-badge badge-critical">CRITICAL</span>
        </div>
      </div>
    </div>
  );
}

export default function SeverityAssessment() {
  return (
    <div className="h-full overflow-y-auto px-6 py-5 circuit-bg">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Gauge */}
          <div className="stat-card flex flex-col items-center py-8">
            <div className="text-slate-400 text-sm mb-6">Overall Severity Score</div>
            <CircularGauge score={overallScore} />
            <div className="mt-6 text-center">
              <div className="font-display text-white font-bold text-xl">CRITICAL DEFECT</div>
              <div className="text-slate-400 text-sm mt-1">Immediate action required</div>
            </div>
          </div>

          {/* Severity levels */}
          <div className="stat-card">
            <div className="font-display text-white font-semibold text-sm mb-4">Severity Classification</div>
            <div className="space-y-3">
              {levels.map((lvl) => {
                const isActive = lvl.label === "CRITICAL";
                return (
                  <div
                    key={lvl.label}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 border transition-all ${
                      isActive
                        ? "bg-red-500/12 border-red-500/30"
                        : "border-slate-700/40 opacity-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ background: lvl.color }} />
                      <span className={`font-mono-data font-semibold text-sm ${isActive ? "text-white" : "text-slate-500"}`}>
                        {lvl.label}
                      </span>
                    </div>
                    <span className="text-slate-500 text-xs font-mono-data">{lvl.range}</span>
                    {isActive && <AlertTriangle size={14} className="text-red-400" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Parameters */}
        <div className="stat-card">
          <div className="font-display text-white font-semibold text-sm mb-5">Assessment Parameters</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {params.map((p) => (
              <div key={p.label} className="rounded-xl bg-slate-800/40 border border-slate-700/30 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-white font-medium text-sm">{p.label}</div>
                    <div className="text-slate-500 text-xs">Weight: {p.weight}%</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono-data font-bold text-xl" style={{ color: p.color }}>{p.score}</div>
                    <div className="text-slate-600 text-xs">/100</div>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${p.score}%`, background: p.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Weighted formula */}
          <div className="mt-5 rounded-xl bg-blue-500/5 border border-blue-500/15 p-4">
            <div className="text-slate-500 text-xs font-mono-data mb-2">WEIGHTED CALCULATION</div>
            <div className="text-slate-300 text-sm font-mono-data">
              (85×0.30) + (90×0.25) + (95×0.25) + (92×0.20) = <span className="text-red-400 font-bold">88.15</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
