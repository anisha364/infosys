import { useState } from "react";
import { Eye, EyeOff, Shield, Cpu, Zap } from "lucide-react";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("admin@visioninspect.ai");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const handleLogin = () => {
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    if (password.length < 6) {
      setError("Invalid credentials. Please try again.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1400);
  };

  const handleForgot = () => {
    if (!forgotEmail) return;
    setForgotSent(true);
    setTimeout(() => {
      setShowForgot(false);
      setForgotSent(false);
      setForgotEmail("");
    }, 2500);
  };

  return (
    <div className="min-h-screen w-full flex circuit-bg relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-cyan-600/6 blur-[80px] pointer-events-none" />

      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[55%] p-12 relative">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center glow-blue">
            <Cpu size={18} className="text-white" />
          </div>
          <div>
            <div className="font-display font-800 text-white text-lg leading-none">VISIONINSPECT</div>
            <div className="text-[10px] text-blue-400 font-mono-data tracking-widest">AI PLATFORM</div>
          </div>
        </div>

        <div className="max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-400 text-xs font-mono-data tracking-wider">AI-POWERED INSPECTION ACTIVE</span>
          </div>
          <h1 className="font-display text-5xl font-bold text-white leading-tight mb-4">
            Intelligent Quality.<br />
            <span className="text-gradient-blue">Smarter Manufacturing.</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            AI-powered computer vision for automated manufacturing defect detection and quality inspection. Reduce defect escape rates by up to 94%.
          </p>
        </div>

        {/* AI visualization */}
        <div className="glass rounded-2xl p-5 max-w-lg glow-blue">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-scan" />
              <Cpu size={24} className="text-blue-400" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm mb-1">Live AI Inspection</div>
              <div className="text-slate-400 text-xs mb-3">Surface crack detected — Product P-1042</div>
              <div className="flex gap-4">
                <div>
                  <div className="text-[10px] text-slate-500 font-mono-data">CONFIDENCE</div>
                  <div className="text-cyan-400 font-mono-data font-600 text-sm">94.2%</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-mono-data">SEVERITY</div>
                  <div className="text-red-400 font-mono-data font-600 text-sm">CRITICAL</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-mono-data">DECISION</div>
                  <div className="text-red-400 font-mono-data font-600 text-sm">FAIL</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          <div className="mt-3 grid grid-cols-3 gap-3">
            {[["1,250", "Total Inspections"], ["84%", "Pass Rate"], ["6ms", "Avg. Time"]].map(([v, l]) => (
              <div key={l} className="text-center">
                <div className="font-display font-bold text-white text-lg">{v}</div>
                <div className="text-[10px] text-slate-500">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-600 text-xs">
          <Shield size={12} />
          <span>Secure AI Inspection Platform · ISO 9001 Certified · SOC 2 Compliant</span>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[400px]">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <Cpu size={18} className="text-white" />
            </div>
            <div className="font-display font-800 text-white text-lg">VISIONINSPECT AI</div>
          </div>

          <div className="glass-bright rounded-2xl p-8 glow-blue animate-fade-in-up">
            <div className="mb-7">
              <h2 className="font-display text-2xl font-bold text-white mb-1">Sign In</h2>
              <p className="text-slate-400 text-sm">Access your inspection dashboard</p>
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
                <Zap size={14} />
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Email / Username</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="admin@visioninspect.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input-field pr-10"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    onClick={() => setRememberMe(!rememberMe)}
                    className={`w-4 h-4 rounded border transition-colors cursor-pointer flex items-center justify-center ${rememberMe ? "bg-blue-500 border-blue-500" : "border-slate-600 bg-transparent"}`}
                  >
                    {rememberMe && <div className="w-2 h-2 bg-white rounded-sm" />}
                  </div>
                  <span className="text-slate-400 text-sm">Remember me</span>
                </label>
                <button
                  onClick={() => setShowForgot(true)}
                  className="text-blue-400 text-sm hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="btn-primary w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating…
                  </>
                ) : (
                  <>
                    <Shield size={15} />
                    SIGN IN
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-700/50 text-center">
              <div className="flex items-center justify-center gap-2 text-slate-500 text-xs">
                <Shield size={11} />
                <span>Secure AI Inspection Platform</span>
              </div>
              <div className="mt-2 text-slate-600 text-xs">
                Demo: any email + password ≥ 6 chars
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot password modal */}
      {showForgot && (
        <div className="modal-overlay" onClick={() => setShowForgot(false)}>
          <div className="glass-bright rounded-2xl p-8 w-full max-w-sm mx-4 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            {forgotSent ? (
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                  <Zap size={24} className="text-emerald-400" />
                </div>
                <h3 className="font-display text-white font-bold text-xl mb-2">Email Sent!</h3>
                <p className="text-slate-400 text-sm">Password reset link sent to <span className="text-blue-400">{forgotEmail}</span></p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-white font-bold text-xl mb-1">Forgot Password</h3>
                <p className="text-slate-400 text-sm mb-5">Enter your email to receive a reset link.</p>
                <input
                  type="email"
                  className="input-field mb-4"
                  placeholder="your@email.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
                <div className="flex gap-3">
                  <button onClick={() => setShowForgot(false)} className="flex-1 py-2.5 rounded-lg border border-slate-600 text-slate-300 text-sm hover:border-slate-500 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleForgot} className="btn-primary flex-1 py-2.5 rounded-lg text-sm">
                    Send Reset Link
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
