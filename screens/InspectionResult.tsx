import { useState } from "react";
import {
  CheckCircle, AlertTriangle, Download, Save, Plus,
  X, FileText, Cpu, ChevronRight
} from "lucide-react";

interface InspectionResultProps {
  image: string;
  result: "fail" | "pass";
  onNewInspection: () => void;
  onViewSeverity: () => void;
  onSaved: () => void;
}

function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 animate-fade-in-up rounded-xl px-5 py-3 flex items-center gap-3 shadow-xl ${
      type === "success"
        ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
        : "bg-red-500/20 border border-red-500/40 text-red-300"
    }`}>
      {type === "success" ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}

export default function InspectionResult({ image, result, onNewInspection, onViewSeverity, onSaved }: InspectionResultProps) {
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [reportDone, setReportDone] = useState(false);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = () => {
    setTimeout(() => {
      setSaved(true);
      showToast("Inspection saved successfully!", "success");
      onSaved();
    }, 800);
  };

  const handleDownload = () => {
    setShowReport(true);
    setReportDone(false);
    setTimeout(() => setReportDone(true), 2000);
  };

  const isFail = result === "fail";

  const defectData = {
    type: "Surface Crack",
    confidence: 92,
    severity: 88,
    severityLevel: "CRITICAL",
    action: "Reject Product and Trigger Quality Inspection Workflow",
    bbox: { x: "30%", y: "25%", w: "45%", h: "35%" },
  };

  return (
    <div className="h-full overflow-y-auto px-6 py-5 circuit-bg">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className={`mb-6 rounded-2xl p-5 flex items-center gap-4 border ${
          isFail
            ? "bg-red-500/8 border-red-500/20"
            : "bg-emerald-500/8 border-emerald-500/20"
        }`}>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isFail ? "bg-red-500/15" : "bg-emerald-500/15"}`}>
            {isFail ? <AlertTriangle size={22} className="text-red-400" /> : <CheckCircle size={22} className="text-emerald-400" />}
          </div>
          <div>
            <div className={`font-display text-xl font-bold ${isFail ? "text-red-400" : "text-emerald-400"}`}>
              {isFail ? "DEFECT DETECTED" : "NO DEFECT DETECTED"}
            </div>
            <div className="text-slate-400 text-sm">
              {isFail ? "Product does not meet quality standards" : "Product meets defined quality inspection criteria"}
            </div>
          </div>
          <div className="ml-auto">
            <span className={`status-badge text-base px-4 py-1.5 ${isFail ? "badge-fail" : "badge-pass"}`}>
              {isFail ? "FAIL" : "PASS"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image with annotations */}
          <div className="rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-900 relative" style={{ minHeight: 320 }}>
            <img src={image} alt="Inspected product" className="w-full object-cover" style={{ maxHeight: 360 }} />
            {isFail && (
              <>
                <div
                  className="absolute border-2 border-red-500 rounded"
                  style={{ left: defectData.bbox.x, top: defectData.bbox.y, width: defectData.bbox.w, height: defectData.bbox.h }}
                >
                  <div className="absolute -top-6 left-0 bg-red-500 text-white text-[10px] font-mono-data px-2 py-0.5 rounded whitespace-nowrap">
                    {defectData.type} · {defectData.confidence}%
                  </div>
                  <div className="absolute inset-0 bg-red-500/10 rounded" />
                </div>
                {/* Corner markers */}
                {[["top-3 left-3", "border-t border-l"], ["top-3 right-3", "border-t border-r"], ["bottom-3 left-3", "border-b border-l"], ["bottom-3 right-3", "border-b border-r"]].map(([pos, border]) => (
                  <div key={pos} className={`absolute ${pos} w-4 h-4 border-blue-400/50 ${border}`} />
                ))}
              </>
            )}
            {!isFail && (
              <div className="absolute inset-0 border-2 border-emerald-500/30 rounded-2xl" />
            )}
            <div className="absolute bottom-3 left-3 right-3">
              <div className="glass rounded-lg px-3 py-2 flex items-center gap-2">
                <Cpu size={12} className="text-blue-400" />
                <span className="text-xs text-slate-400 font-mono-data">INS-{Math.floor(Math.random() * 9000) + 1000} · {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Result card */}
          <div className="space-y-4">
            {isFail ? (
              <div className="stat-card border-red-500/15">
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <div className="text-slate-500 text-xs font-mono-data mb-0.5">DEFECT TYPE</div>
                    <div className="text-white font-semibold">{defectData.type}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs font-mono-data mb-0.5">CONFIDENCE</div>
                    <div className="font-mono-data text-cyan-400 font-bold">{defectData.confidence}%</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs font-mono-data mb-0.5">SEVERITY SCORE</div>
                    <div className="font-mono-data text-red-400 font-bold text-xl">{defectData.severity} <span className="text-sm text-slate-500">/ 100</span></div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs font-mono-data mb-0.5">SEVERITY</div>
                    <span className="status-badge badge-critical">{defectData.severityLevel}</span>
                  </div>
                </div>

                {/* Severity gauge */}
                <div className="mb-5">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-500">Severity Score</span>
                    <span className="font-mono-data text-red-400">{defectData.severity}/100</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-800 overflow-hidden relative">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${defectData.severity}%`,
                        background: "linear-gradient(90deg, #10b981, #f59e0b, #ef4444)"
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                    <span>LOW</span><span>MEDIUM</span><span>HIGH</span><span>CRITICAL</span>
                  </div>
                </div>

                <div className="rounded-xl bg-red-500/8 border border-red-500/20 p-4 mb-4">
                  <div className="text-xs text-slate-400 mb-1">Recommended Action</div>
                  <div className="text-red-300 text-sm font-medium">{defectData.action}</div>
                </div>

                <button onClick={onViewSeverity} className="w-full py-2.5 rounded-xl border border-blue-500/25 text-blue-400 text-sm hover:bg-blue-500/8 transition-colors flex items-center justify-center gap-2">
                  View Severity Assessment <ChevronRight size={14} />
                </button>
              </div>
            ) : (
              <div className="stat-card border-emerald-500/15">
                <div className="text-center py-4">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={36} className="text-emerald-400" />
                  </div>
                  <div className="font-display text-2xl font-bold text-emerald-400 mb-1">PASSED</div>
                  <div className="text-slate-400 text-sm mb-5">Product meets quality inspection criteria</div>
                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div className="rounded-xl bg-emerald-500/8 border border-emerald-500/15 p-3">
                      <div className="text-slate-500 text-xs font-mono-data mb-0.5">CONFIDENCE</div>
                      <div className="font-mono-data text-emerald-400 font-bold text-xl">98%</div>
                    </div>
                    <div className="rounded-xl bg-emerald-500/8 border border-emerald-500/15 p-3">
                      <div className="text-slate-500 text-xs font-mono-data mb-0.5">DECISION</div>
                      <div className="text-emerald-400 font-semibold">ACCEPT</div>
                    </div>
                  </div>
                  <div className="mt-4 rounded-xl bg-emerald-500/8 border border-emerald-500/15 p-3 text-emerald-300 text-sm">
                    Product meets the defined quality inspection criteria.
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={handleSave}
                disabled={saved}
                className={`py-3 rounded-xl text-xs flex flex-col items-center gap-1.5 border transition-all ${
                  saved
                    ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                    : "btn-primary border-transparent"
                }`}
              >
                {saved ? <CheckCircle size={16} /> : <Save size={16} />}
                {saved ? "Saved" : "Save"}
              </button>
              <button
                onClick={handleDownload}
                className="py-3 rounded-xl text-xs flex flex-col items-center gap-1.5 border border-violet-500/30 bg-violet-500/8 text-violet-300 hover:bg-violet-500/15 transition-colors"
              >
                <Download size={16} />
                Download
              </button>
              <button
                onClick={onNewInspection}
                className="py-3 rounded-xl text-xs flex flex-col items-center gap-1.5 border border-cyan-500/30 bg-cyan-500/8 text-cyan-300 hover:bg-cyan-500/15 transition-colors"
              >
                <Plus size={16} />
                New
              </button>
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} />}

      {/* Report modal */}
      {showReport && (
        <div className="modal-overlay" onClick={() => setShowReport(false)}>
          <div className="glass-bright rounded-2xl p-7 w-full max-w-sm mx-4 animate-fade-in-up text-center" onClick={(e) => e.stopPropagation()}>
            {!reportDone ? (
              <>
                <div className="w-14 h-14 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center mx-auto mb-4">
                  <FileText size={24} className="text-violet-400 animate-pulse" />
                </div>
                <h3 className="font-display text-white font-bold text-lg mb-2">Generating Report</h3>
                <p className="text-slate-400 text-sm mb-4">Compiling inspection data into PDF…</p>
                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full animate-pulse w-3/4" />
                </div>
              </>
            ) : (
              <>
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={24} className="text-emerald-400" />
                </div>
                <h3 className="font-display text-white font-bold text-lg mb-2">Report Generated</h3>
                <p className="text-slate-400 text-sm mb-5">Inspection_Report_{new Date().toISOString().split("T")[0]}.pdf</p>
                <button onClick={() => setShowReport(false)} className="btn-primary w-full py-2.5 rounded-xl text-sm">
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
