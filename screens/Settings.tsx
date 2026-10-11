import { useState } from "react";
import {
  User, Shield, Lock, Bell, Cpu, Monitor,
  CheckCircle, Loader, Eye, EyeOff, X
} from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: <User size={15} /> },
  { id: "security", label: "Security", icon: <Shield size={15} /> },
  { id: "password", label: "Password", icon: <Lock size={15} /> },
  { id: "notifications", label: "Notifications", icon: <Bell size={15} /> },
  { id: "inspection", label: "Inspection Settings", icon: <Cpu size={15} /> },
  { id: "system", label: "System Preferences", icon: <Monitor size={15} /> },
];

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="stat-card mb-4">
      <div className="font-display text-white font-semibold text-sm mb-4 pb-3 border-b border-slate-700/40">{title}</div>
      {children}
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-10 h-5 rounded-full transition-colors ${value ? "bg-blue-500" : "bg-slate-700"}`}
    >
      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showOldPw, setShowOldPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [toast, setToast] = useState(false);

  // Profile state
  const [profile, setProfile] = useState({
    name: "Arjun Sharma",
    email: "arjun@visioninspect.ai",
    role: "Quality Engineer",
    department: "Manufacturing QA",
    phone: "+91 98765 43210",
    bio: "Senior Quality Engineer with 7 years of experience in manufacturing quality control.",
  });

  // Notification toggles
  const [notifs, setNotifs] = useState({
    criticalDefect: true,
    batchComplete: true,
    defectRateAlert: true,
    systemUpdates: false,
    weeklyReport: true,
    emailNotifs: true,
    smsNotifs: false,
    pushNotifs: true,
  });

  // Inspection settings
  const [inspection, setInspection] = useState({
    autoSave: true,
    confidenceThreshold: "80",
    criticalSeverity: "80",
    highSeverity: "60",
    model: "YOLOv8-Industrial",
    preprocessing: true,
    batchSize: "10",
    timeout: "30",
  });

  // System prefs
  const [system, setSystem] = useState({
    theme: "dark",
    language: "English",
    timezone: "IST (UTC+5:30)",
    dateFormat: "DD/MM/YYYY",
    compactView: false,
    animations: true,
    autoLogout: "30",
  });

  const handleSave = () => {
    setSaving(true);
    setSaved(false);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setToast(true);
      setTimeout(() => { setSaved(false); setToast(false); }, 3000);
    }, 1400);
  };

  return (
    <div className="h-full flex overflow-hidden circuit-bg">
      {/* Tab sidebar */}
      <div className="w-52 flex-shrink-0 border-r border-blue-500/10 py-5 px-3 space-y-0.5 overflow-y-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`sidebar-item w-full text-left ${activeTab === t.id ? "active" : ""}`}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        {activeTab === "profile" && (
          <div className="max-w-2xl">
            <SectionCard title="Profile Information">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  AS
                </div>
                <div>
                  <div className="text-white font-semibold">{profile.name}</div>
                  <div className="text-slate-400 text-sm">{profile.role}</div>
                  <button className="mt-1.5 text-blue-400 text-xs hover:text-blue-300 transition-colors">Change avatar</button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Full Name", key: "name" },
                  { label: "Email", key: "email" },
                  { label: "Role", key: "role" },
                  { label: "Department", key: "department" },
                  { label: "Phone", key: "phone" },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
                    <input
                      className="input-field"
                      value={profile[key as keyof typeof profile]}
                      onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                    />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Bio</label>
                  <textarea
                    className="input-field resize-none"
                    rows={3}
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  />
                </div>
              </div>
            </SectionCard>
          </div>
        )}

        {activeTab === "security" && (
          <div className="max-w-2xl">
            <SectionCard title="Two-Factor Authentication">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-slate-300 text-sm font-medium">Authenticator App</div>
                  <div className="text-slate-500 text-xs mt-0.5">Use Google Authenticator or similar</div>
                </div>
                <Toggle value={true} onChange={() => {}} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-300 text-sm font-medium">SMS Verification</div>
                  <div className="text-slate-500 text-xs mt-0.5">Verify login with SMS code</div>
                </div>
                <Toggle value={false} onChange={() => {}} />
              </div>
            </SectionCard>
            <SectionCard title="Active Sessions">
              {[
                { device: "Chrome on Windows 11", location: "Mumbai, India", time: "Current session", active: true },
                { device: "Safari on iPhone 15", location: "Pune, India", time: "2 hours ago", active: false },
                { device: "Firefox on macOS", location: "Bengaluru, India", time: "1 day ago", active: false },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-slate-700/30 last:border-0">
                  <div>
                    <div className="text-slate-300 text-sm">{s.device}</div>
                    <div className="text-slate-500 text-xs">{s.location} · {s.time}</div>
                  </div>
                  {s.active
                    ? <span className="status-badge badge-pass">Active</span>
                    : <button className="text-red-400 text-xs hover:text-red-300 transition-colors">Revoke</button>
                  }
                </div>
              ))}
            </SectionCard>
          </div>
        )}

        {activeTab === "password" && (
          <div className="max-w-md">
            <SectionCard title="Change Password">
              <div className="space-y-4">
                {[
                  { label: "Current Password", show: showOldPw, toggle: () => setShowOldPw(!showOldPw) },
                  { label: "New Password", show: showNewPw, toggle: () => setShowNewPw(!showNewPw) },
                  { label: "Confirm New Password", show: showNewPw, toggle: () => setShowNewPw(!showNewPw) },
                ].map(({ label, show, toggle }) => (
                  <div key={label}>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
                    <div className="relative">
                      <input type={show ? "text" : "password"} className="input-field pr-10" placeholder="••••••••" />
                      <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                        {show ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                ))}
                <div className="rounded-xl bg-blue-500/8 border border-blue-500/15 p-3">
                  <div className="text-slate-400 text-xs">Password requirements:</div>
                  <ul className="text-slate-500 text-xs mt-1 space-y-0.5 list-disc list-inside">
                    <li>Minimum 8 characters</li>
                    <li>At least one uppercase letter</li>
                    <li>At least one number</li>
                    <li>At least one special character</li>
                  </ul>
                </div>
              </div>
            </SectionCard>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="max-w-2xl">
            <SectionCard title="Alert Notifications">
              {[
                { key: "criticalDefect", label: "Critical Defect Alerts", desc: "Instant alert when a critical defect is detected" },
                { key: "batchComplete", label: "Batch Completion", desc: "Notify when an inspection batch finishes" },
                { key: "defectRateAlert", label: "Defect Rate Alerts", desc: "Alert when defect rate exceeds threshold" },
                { key: "systemUpdates", label: "System Updates", desc: "AI model updates and system maintenance" },
                { key: "weeklyReport", label: "Weekly Report", desc: "Automatic weekly quality summary email" },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between py-3 border-b border-slate-700/30 last:border-0">
                  <div>
                    <div className="text-slate-300 text-sm font-medium">{label}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{desc}</div>
                  </div>
                  <Toggle
                    value={notifs[key as keyof typeof notifs]}
                    onChange={(v) => setNotifs({ ...notifs, [key]: v })}
                  />
                </div>
              ))}
            </SectionCard>
            <SectionCard title="Notification Channels">
              {[
                { key: "emailNotifs", label: "Email Notifications" },
                { key: "smsNotifs", label: "SMS Notifications" },
                { key: "pushNotifs", label: "Push Notifications" },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between py-3 border-b border-slate-700/30 last:border-0">
                  <div className="text-slate-300 text-sm font-medium">{label}</div>
                  <Toggle
                    value={notifs[key as keyof typeof notifs]}
                    onChange={(v) => setNotifs({ ...notifs, [key]: v })}
                  />
                </div>
              ))}
            </SectionCard>
          </div>
        )}

        {activeTab === "inspection" && (
          <div className="max-w-2xl">
            <SectionCard title="AI Model Settings">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">AI Model</label>
                  <select className="input-field" value={inspection.model} onChange={(e) => setInspection({ ...inspection, model: e.target.value })}>
                    <option>YOLOv8-Industrial</option>
                    <option>YOLOv8-Nano</option>
                    <option>YOLOv9-Custom</option>
                    <option>ResNet-50-QC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Confidence Threshold (%)</label>
                  <input className="input-field font-mono-data" type="number" min="50" max="99" value={inspection.confidenceThreshold} onChange={(e) => setInspection({ ...inspection, confidenceThreshold: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Critical Severity Threshold</label>
                  <input className="input-field font-mono-data" type="number" value={inspection.criticalSeverity} onChange={(e) => setInspection({ ...inspection, criticalSeverity: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">High Severity Threshold</label>
                  <input className="input-field font-mono-data" type="number" value={inspection.highSeverity} onChange={(e) => setInspection({ ...inspection, highSeverity: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Batch Size</label>
                  <input className="input-field font-mono-data" type="number" value={inspection.batchSize} onChange={(e) => setInspection({ ...inspection, batchSize: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Inspection Timeout (sec)</label>
                  <input className="input-field font-mono-data" type="number" value={inspection.timeout} onChange={(e) => setInspection({ ...inspection, timeout: e.target.value })} />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between py-3 border-t border-slate-700/30">
                <div>
                  <div className="text-slate-300 text-sm font-medium">Auto-save Inspections</div>
                  <div className="text-slate-500 text-xs">Automatically save completed inspections</div>
                </div>
                <Toggle value={inspection.autoSave} onChange={(v) => setInspection({ ...inspection, autoSave: v })} />
              </div>
              <div className="flex items-center justify-between py-3 border-t border-slate-700/30">
                <div>
                  <div className="text-slate-300 text-sm font-medium">Image Preprocessing</div>
                  <div className="text-slate-500 text-xs">Apply automatic contrast/noise correction</div>
                </div>
                <Toggle value={inspection.preprocessing} onChange={(v) => setInspection({ ...inspection, preprocessing: v })} />
              </div>
            </SectionCard>
          </div>
        )}

        {activeTab === "system" && (
          <div className="max-w-2xl">
            <SectionCard title="Display & Interface">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Language</label>
                  <select className="input-field" value={system.language} onChange={(e) => setSystem({ ...system, language: e.target.value })}>
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Japanese</option>
                    <option>German</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Timezone</label>
                  <select className="input-field" value={system.timezone} onChange={(e) => setSystem({ ...system, timezone: e.target.value })}>
                    <option>IST (UTC+5:30)</option>
                    <option>UTC</option>
                    <option>EST (UTC-5)</option>
                    <option>JST (UTC+9)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Date Format</label>
                  <select className="input-field" value={system.dateFormat} onChange={(e) => setSystem({ ...system, dateFormat: e.target.value })}>
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Auto Logout (minutes)</label>
                  <select className="input-field" value={system.autoLogout} onChange={(e) => setSystem({ ...system, autoLogout: e.target.value })}>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
              </div>
              {[
                { key: "compactView", label: "Compact View", desc: "Reduce spacing for denser information display" },
                { key: "animations", label: "UI Animations", desc: "Enable smooth transitions and animations" },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between py-3 border-t border-slate-700/30">
                  <div>
                    <div className="text-slate-300 text-sm font-medium">{label}</div>
                    <div className="text-slate-500 text-xs">{desc}</div>
                  </div>
                  <Toggle
                    value={system[key as keyof typeof system] as boolean}
                    onChange={(v) => setSystem({ ...system, [key]: v })}
                  />
                </div>
              ))}
            </SectionCard>
          </div>
        )}

        {/* Save button */}
        <div className="max-w-2xl mt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary px-8 py-3 rounded-xl text-sm flex items-center gap-2"
          >
            {saving ? (
              <><Loader size={15} className="animate-spin" /> Saving…</>
            ) : saved ? (
              <><CheckCircle size={15} /> Saved!</>
            ) : "SAVE CHANGES"}
          </button>
        </div>
      </div>

      {/* Success toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up rounded-xl px-5 py-3 flex items-center gap-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shadow-xl">
          <CheckCircle size={15} />
          <span className="text-sm font-medium">Settings updated successfully.</span>
          <button onClick={() => setToast(false)}><X size={13} /></button>
        </div>
      )}
    </div>
  );
}
