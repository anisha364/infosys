import { useState, useEffect } from "react";
import { CheckCircle, Circle, Loader, AlertCircle, RefreshCw, Cpu } from "lucide-react";

interface AIProcessingProps {
  image: string;
  onComplete: (result: "fail" | "pass") => void;
  onError: () => void;
}

const steps = [
  { id: 0, label: "Image Uploaded", duration: 0 },
  { id: 1, label: "Image Validation", duration: 600 },
  { id: 2, label: "Image Preprocessing", duration: 900 },
  { id: 3, label: "Defect Detection", duration: 1400 },
  { id: 4, label: "Defect Classification", duration: 800 },
  { id: 5, label: "Severity Assessment", duration: 700 },
  { id: 6, label: "Quality Decision", duration: 500 },
];

export default function AIProcessing({ image, onComplete, onError }: AIProcessingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let idx = 1;
    let cancelled = false;

    const advance = () => {
      if (cancelled) return;
      if (idx >= steps.length) {
        setCurrentStep(steps.length);
        setDone(true);
        setTimeout(() => {
          if (!cancelled) onComplete(Math.random() > 0.35 ? "fail" : "pass");
        }, 600);
        return;
      }
      setTimeout(() => {
        if (cancelled) return;
        setCurrentStep(idx);
        idx++;
        advance();
      }, steps[idx]?.duration ?? 500);
    };

    advance();
    return () => { cancelled = true; };
  }, []);

  const handleRetry = () => {
    setError(false);
    setCurrentStep(0);
  };

  return (
    <div className="h-full flex items-center justify-center circuit-bg px-6 py-5">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image with scan overlay */}
          <div className="relative rounded-2xl overflow-hidden border border-blue-500/20 glow-blue aspect-video bg-slate-900">
            <img src={image} alt="Product under inspection" className="w-full h-full object-cover" />
            {!error && !done && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-violet-900/20" />
                {/* Grid overlay */}
                <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.25 }}>
                  <defs>
                    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
                {/* Scanning line */}
                <div
                  className="absolute left-0 right-0 h-0.5 animate-scan"
                  style={{ background: "linear-gradient(90deg, transparent, #06b6d4, transparent)" }}
                />
                {/* Corner markers */}
                {[["top-3 left-3", "border-t border-l"], ["top-3 right-3", "border-t border-r"], ["bottom-3 left-3", "border-b border-l"], ["bottom-3 right-3", "border-b border-r"]].map(([pos, border]) => (
                  <div key={pos} className={`absolute ${pos} w-5 h-5 border-blue-400/70 ${border} animate-pulse-glow`} />
                ))}
              </>
            )}
            {done && (
              <div className="absolute inset-0 border-2 border-emerald-500/40 rounded-2xl" />
            )}
            <div className="absolute bottom-3 left-3 right-3">
              <div className="glass rounded-lg px-3 py-2 flex items-center gap-2">
                <Cpu size={13} className="text-blue-400" />
                <span className="text-xs text-slate-300">
                  {done ? "Analysis complete" : error ? "Processing failed" : "VisionInspect AI analyzing…"}
                </span>
                {!done && !error && (
                  <div className="ml-auto flex gap-0.5">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-1 h-3 bg-blue-500/60 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="stat-card space-y-1">
            <div className="font-display text-white font-bold text-lg mb-5">
              {error ? "Processing Failed" : done ? "Analysis Complete" : "AI Processing…"}
            </div>

            {error ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-red-500/8 border border-red-500/25 p-5 text-center">
                  <AlertCircle size={32} className="text-red-400 mx-auto mb-3" />
                  <div className="text-white font-semibold mb-1">Unable to process image</div>
                  <div className="text-slate-400 text-sm">The AI engine encountered an error during defect detection. Please try again or upload a different image.</div>
                </div>
                <button onClick={handleRetry} className="btn-primary w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2">
                  <RefreshCw size={15} /> TRY AGAIN
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {steps.map((step) => {
                    const state = currentStep > step.id ? "done" : currentStep === step.id ? "active" : "pending";
                    return (
                      <div key={step.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        state === "active" ? "bg-blue-500/12 border border-blue-500/25" :
                        state === "done" ? "opacity-70" : "opacity-40"
                      }`}>
                        {state === "done" ? (
                          <CheckCircle size={18} className="text-emerald-400 flex-shrink-0" />
                        ) : state === "active" ? (
                          <Loader size={18} className="text-blue-400 flex-shrink-0 animate-spin" />
                        ) : (
                          <Circle size={18} className="text-slate-600 flex-shrink-0" />
                        )}
                        <span className={`text-sm font-medium ${state === "active" ? "text-white" : state === "done" ? "text-slate-300" : "text-slate-600"}`}>
                          {step.label}
                        </span>
                        {state === "active" && (
                          <div className="ml-auto w-16 h-1 rounded-full bg-slate-700 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 animate-pulse w-2/3" />
                          </div>
                        )}
                        {state === "done" && <span className="ml-auto text-emerald-400 text-xs font-mono-data">✓</span>}
                      </div>
                    );
                  })}
                </div>

                {!done && (
                  <div className="mt-5">
                    <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                      <span>Progress</span>
                      <span className="font-mono-data">{Math.round((currentStep / steps.length) * 100)}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                        style={{ width: `${(currentStep / steps.length) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {done && (
                  <div className="mt-4 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-400" />
                    <span className="text-emerald-400 text-sm font-medium">Inspection complete. Loading results…</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
