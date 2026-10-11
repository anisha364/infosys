import { useState } from "react";
import { Plus, Edit2, UserX, Trash2, X, CheckCircle, Shield, User } from "lucide-react";

interface UserRow {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Disabled";
  lastLogin: string;
}

const initialUsers: UserRow[] = [
  { id: 1, name: "Arjun Sharma", email: "arjun@visioninspect.ai", role: "Quality Engineer", status: "Active", lastLogin: "Today, 09:14" },
  { id: 2, name: "Priya Nair", email: "priya@visioninspect.ai", role: "Factory Supervisor", status: "Active", lastLogin: "Today, 08:52" },
  { id: 3, name: "Rahul Mehta", email: "rahul@visioninspect.ai", role: "Quality Engineer", status: "Active", lastLogin: "Yesterday, 17:30" },
  { id: 4, name: "Sneha Patel", email: "sneha@visioninspect.ai", role: "Factory Supervisor", status: "Disabled", lastLogin: "3 days ago" },
  { id: 5, name: "Vikram Rao", email: "vikram@visioninspect.ai", role: "Quality Engineer", status: "Active", lastLogin: "Today, 10:05" },
];

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ onClose, children }: ModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass-bright rounded-2xl p-7 w-full max-w-md mx-4 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default function UserManagement() {
  const [users, setUsers] = useState<UserRow[]>(initialUsers);
  const [modal, setModal] = useState<"add" | "edit" | "delete" | "disable" | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", role: "Quality Engineer" });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAdd = () => {
    if (!form.name || !form.email) return;
    const newUser: UserRow = {
      id: Date.now(), name: form.name, email: form.email,
      role: form.role, status: "Active", lastLogin: "Just now"
    };
    setUsers([...users, newUser]);
    setModal(null);
    setForm({ name: "", email: "", role: "Quality Engineer" });
    showToast(`User ${newUser.name} added successfully.`);
  };

  const handleEdit = () => {
    if (!selectedUser) return;
    setUsers(users.map((u) => u.id === selectedUser.id ? { ...u, name: form.name, email: form.email, role: form.role } : u));
    setModal(null);
    showToast("User updated successfully.");
  };

  const handleDelete = () => {
    if (!selectedUser) return;
    setUsers(users.filter((u) => u.id !== selectedUser.id));
    setModal(null);
    showToast(`User ${selectedUser.name} deleted.`);
  };

  const handleDisable = () => {
    if (!selectedUser) return;
    setUsers(users.map((u) => u.id === selectedUser.id ? { ...u, status: u.status === "Active" ? "Disabled" : "Active" } : u));
    setModal(null);
    showToast(`User ${selectedUser.name} ${selectedUser.status === "Active" ? "disabled" : "enabled"}.`);
  };

  const openEdit = (u: UserRow) => {
    setSelectedUser(u);
    setForm({ name: u.name, email: u.email, role: u.role });
    setModal("edit");
  };

  return (
    <div className="h-full overflow-y-auto px-6 py-5 circuit-bg">
      <div className="flex items-center justify-between mb-5">
        <div className="text-slate-400 text-sm">{users.length} users registered</div>
        <button
          onClick={() => { setForm({ name: "", email: "", role: "Quality Engineer" }); setModal("add"); }}
          className="btn-primary px-5 py-2.5 rounded-xl text-sm flex items-center gap-2"
        >
          <Plus size={15} /> ADD USER
        </button>
      </div>

      <div className="stat-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-700/40 bg-slate-800/30">
                {["User", "Email", "Role", "Status", "Last Login", "Actions"].map((h) => (
                  <th key={h} className="text-left text-slate-500 font-medium py-3 px-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-slate-800/40 hover:bg-blue-500/3 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/40 to-violet-500/40 border border-blue-500/20 flex items-center justify-center text-blue-300 text-xs font-bold">
                        {u.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="text-slate-200 font-medium">{u.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{u.email}</td>
                  <td className="py-3 px-4">
                    <span className={`status-badge ${u.role === "Factory Supervisor" ? "badge-medium" : "badge-low"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`status-badge ${u.status === "Active" ? "badge-pass" : "badge-fail"}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{u.lastLogin}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1.5">
                      <button onClick={() => openEdit(u)} className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors" title="Edit">
                        <Edit2 size={13} />
                      </button>
                      <button onClick={() => { setSelectedUser(u); setModal("disable"); }} className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-colors" title="Disable">
                        <UserX size={13} />
                      </button>
                      <button onClick={() => { setSelectedUser(u); setModal("delete"); }} className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors" title="Delete">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add modal */}
      {modal === "add" && (
        <Modal onClose={() => setModal(null)}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-white font-bold text-xl">Add New User</h3>
            <button onClick={() => setModal(null)} className="text-slate-600 hover:text-slate-400"><X size={18} /></button>
          </div>
          <div className="space-y-4">
            <div><label className="block text-xs text-slate-400 mb-1.5">Full Name</label>
              <input className="input-field" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5">Email</label>
              <input className="input-field" type="email" placeholder="user@visioninspect.ai" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5">Role</label>
              <select className="input-field" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option>Quality Engineer</option>
                <option>Factory Supervisor</option>
              </select></div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-lg border border-slate-600 text-slate-300 text-sm">Cancel</button>
            <button onClick={handleAdd} className="btn-primary flex-1 py-2.5 rounded-xl text-sm">Add User</button>
          </div>
        </Modal>
      )}

      {/* Edit modal */}
      {modal === "edit" && selectedUser && (
        <Modal onClose={() => setModal(null)}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-white font-bold text-xl">Edit User</h3>
            <button onClick={() => setModal(null)} className="text-slate-600 hover:text-slate-400"><X size={18} /></button>
          </div>
          <div className="space-y-4">
            <div><label className="block text-xs text-slate-400 mb-1.5">Full Name</label>
              <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5">Email</label>
              <input className="input-field" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5">Role</label>
              <select className="input-field" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option>Quality Engineer</option>
                <option>Factory Supervisor</option>
              </select></div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-lg border border-slate-600 text-slate-300 text-sm">Cancel</button>
            <button onClick={handleEdit} className="btn-primary flex-1 py-2.5 rounded-xl text-sm">Save Changes</button>
          </div>
        </Modal>
      )}

      {/* Delete modal */}
      {modal === "delete" && selectedUser && (
        <Modal onClose={() => setModal(null)}>
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-red-400" />
            </div>
            <h3 className="font-display text-white font-bold text-xl mb-2">Delete User</h3>
            <p className="text-slate-400 text-sm mb-6">Are you sure you want to permanently delete <span className="text-white font-medium">{selectedUser.name}</span>? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-lg border border-slate-600 text-slate-300 text-sm">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-semibold">Delete</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Disable modal */}
      {modal === "disable" && selectedUser && (
        <Modal onClose={() => setModal(null)}>
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto mb-4">
              <UserX size={24} className="text-amber-400" />
            </div>
            <h3 className="font-display text-white font-bold text-xl mb-2">
              {selectedUser.status === "Active" ? "Disable" : "Enable"} User
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              {selectedUser.status === "Active"
                ? `Disabling ${selectedUser.name} will revoke their access to VisionInspect AI.`
                : `Re-enable ${selectedUser.name}'s access to VisionInspect AI?`}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-lg border border-slate-600 text-slate-300 text-sm">Cancel</button>
              <button onClick={handleDisable} className={`flex-1 py-2.5 rounded-xl text-white text-sm font-semibold ${selectedUser.status === "Active" ? "bg-gradient-to-r from-amber-600 to-amber-500" : "btn-primary"}`}>
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up rounded-xl px-5 py-3 flex items-center gap-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shadow-xl">
          <CheckCircle size={15} />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}
    </div>
  );
}
