import { useState, useRef } from "react";
import {
  Upload, Camera, Layers, Image as ImageIcon, X, AlertCircle,
  CheckCircle, ChevronRight, Cpu
} from "lucide-react";

interface NewInspectionProps {
  onStartInspection: (image: string) => void;
}

const sampleImages = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400&h=300&fit=crop&auto=format",
];

export default function NewInspection({ onStartInspection }: NewInspectionProps) {
  const [image, setImage] = useState<string | null>(null);
  const [productId, setProductId] = useState("");
  const [batchId, setBatchId] = useState("");
  const [line, setLine] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [showBatch, setShowBatch] = useState(false);
  const [batchImages, setBatchImages] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrors(["Invalid file format. Please upload JPG, PNG, or WEBP."]);
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrors(["Image too large. Maximum file size is 10MB."]);
      return;
    }
    const url = URL.createObjectURL(file);
    setImage(url);
    setErrors([]);
  };

  const validate = () => {
    const e: string[] = [];
    if (!image) e.push("Please upload a product image.");
    if (!productId.trim()) e.push("Product ID is required.");
    if (!batchId.trim()) e.push("Batch ID is required.");
    if (!line) e.push("Production line is required.");
    setErrors(e);
    return e.length === 0;
  };

  const handleStart = () => {
    if (!validate()) return;
    onStartInspection(image!);
  };

  const useSample = (url: string) => {
    setImage(url);
    setErrors([]);
  };

  return (
    <div className="h-full overflow-y-auto px-6 py-5 circuit-bg">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <p className="text-slate-400 text-sm">Upload a product image and let VisionInspect AI analyze its quality.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload zone */}
          <div className="space-y-4">
            <div
              className={`relative rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${
                dragOver
                  ? "border-blue-500 bg-blue-500/8"
                  : image
                  ? "border-emerald-500/40 bg-emerald-500/5"
                  : "border-slate-600 hover:border-blue-500/50 bg-slate-800/20"
              }`}
              style={{ minHeight: 260 }}
              onClick={() => !image && fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
            >
              {image ? (
                <div className="relative">
                  <img src={image} alt="Product" className="w-full object-cover" style={{ maxHeight: 280 }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <button
                    onClick={(e) => { e.stopPropagation(); setImage(null); }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 border border-slate-600 flex items-center justify-center text-slate-300 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <CheckCircle size={14} className="text-emerald-400" />
                    <span className="text-emerald-400 text-xs font-medium">Image ready for inspection</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 px-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                    <Upload size={24} className="text-blue-400" />
                  </div>
                  <div className="font-display text-white font-semibold mb-1">Drop product image here</div>
                  <div className="text-slate-500 text-sm">JPG, PNG, WEBP · Max 10MB</div>
                  {dragOver && (
                    <div className="mt-3 text-blue-400 text-sm font-medium">Release to upload</div>
                  )}
                </div>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => fileRef.current?.click()}
                className="btn-primary py-3 rounded-xl text-xs flex flex-col items-center gap-1.5"
              >
                <Upload size={16} />
                Upload Image
              </button>
              <button
                onClick={() => setShowCamera(true)}
                className="py-3 rounded-xl text-xs flex flex-col items-center gap-1.5 border border-violet-500/30 bg-violet-500/8 text-violet-300 hover:bg-violet-500/15 transition-colors"
              >
                <Camera size={16} />
                Camera
              </button>
              <button
                onClick={() => setShowBatch(true)}
                className="py-3 rounded-xl text-xs flex flex-col items-center gap-1.5 border border-cyan-500/30 bg-cyan-500/8 text-cyan-300 hover:bg-cyan-500/15 transition-colors"
              >
                <Layers size={16} />
                Batch Upload
              </button>
            </div>

            {/* Sample images */}
            <div>
              <div className="text-slate-500 text-xs mb-2 flex items-center gap-1.5">
                <ImageIcon size={11} />
                Sample product images:
              </div>
              <div className="flex gap-2">
                {sampleImages.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => useSample(url)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${image === url ? "border-blue-500" : "border-slate-700/50 hover:border-blue-500/40"}`}
                  >
                    <img src={url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="stat-card">
              <div className="font-display text-white font-semibold text-sm mb-4">Inspection Details</div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Product ID <span className="text-red-400">*</span>
                  </label>
                  <input
                    className="input-field font-mono-data"
                    placeholder="P-XXXX"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Batch ID <span className="text-red-400">*</span>
                  </label>
                  <input
                    className="input-field font-mono-data"
                    placeholder="B-2024-XX"
                    value={batchId}
                    onChange={(e) => setBatchId(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Production Line <span className="text-red-400">*</span>
                  </label>
                  <select
                    className="input-field"
                    value={line}
                    onChange={(e) => setLine(e.target.value)}
                  >
                    <option value="">Select production line…</option>
                    {["Line 01", "Line 02", "Line 03", "Line 04", "Line 05"].map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Inspector Notes (optional)</label>
                  <textarea
                    className="input-field resize-none"
                    rows={3}
                    placeholder="Add any additional context for the AI inspection…"
                  />
                </div>
              </div>
            </div>

            {/* Error messages */}
            {errors.length > 0 && (
              <div className="rounded-xl bg-red-500/8 border border-red-500/25 p-4 space-y-1.5">
                {errors.map((e, i) => (
                  <div key={i} className="flex items-center gap-2 text-red-400 text-xs">
                    <AlertCircle size={12} />
                    {e}
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={handleStart}
              className="btn-primary w-full py-4 rounded-xl font-display font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Cpu size={16} />
              START AI INSPECTION
              <ChevronRight size={16} />
            </button>

            <div className="glass rounded-xl p-4">
              <div className="text-slate-500 text-xs flex items-start gap-2">
                <Cpu size={13} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-blue-400 font-medium">AI Model:</span> YOLOv8-Industrial · OpenCV 4.8 · Avg. inference time: 6ms
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Camera modal */}
      {showCamera && (
        <div className="modal-overlay" onClick={() => setShowCamera(false)}>
          <div className="glass-bright rounded-2xl p-7 w-full max-w-md mx-4 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-white font-bold text-xl">Camera Capture</h3>
              <button onClick={() => setShowCamera(false)} className="text-slate-600 hover:text-slate-400"><X size={18} /></button>
            </div>
            <div className="rounded-xl bg-slate-800/60 border border-slate-700/50 h-48 flex flex-col items-center justify-center gap-3 mb-5">
              <Camera size={32} className="text-slate-600" />
              <div className="text-slate-500 text-sm text-center">Camera feed simulation<br /><span className="text-xs">In production, device camera would appear here</span></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setShowCamera(false)} className="py-2.5 rounded-lg border border-slate-600 text-slate-300 text-sm">Cancel</button>
              <button
                onClick={() => {
                  useSample(sampleImages[0]);
                  setShowCamera(false);
                }}
                className="btn-primary py-2.5 rounded-lg text-sm flex items-center justify-center gap-2"
              >
                <Camera size={14} /> Capture
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Batch upload modal */}
      {showBatch && (
        <div className="modal-overlay" onClick={() => setShowBatch(false)}>
          <div className="glass-bright rounded-2xl p-7 w-full max-w-md mx-4 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-white font-bold text-xl">Batch Upload</h3>
              <button onClick={() => setShowBatch(false)} className="text-slate-600 hover:text-slate-400"><X size={18} /></button>
            </div>
            <div
              className="rounded-xl border-2 border-dashed border-slate-600 h-36 flex flex-col items-center justify-center gap-2 mb-4 cursor-pointer hover:border-blue-500/50 transition-colors"
              onClick={() => setBatchImages(Math.floor(Math.random() * 5) + 3)}
            >
              <Layers size={24} className="text-slate-500" />
              <div className="text-slate-400 text-sm">Click to select multiple images</div>
            </div>
            {batchImages > 0 && (
              <div className="mb-4 px-4 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-2">
                <CheckCircle size={14} />
                {batchImages} images selected for batch inspection
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => setShowBatch(false)} className="flex-1 py-2.5 rounded-lg border border-slate-600 text-slate-300 text-sm">Cancel</button>
              <button
                onClick={() => { useSample(sampleImages[1]); setShowBatch(false); }}
                className="btn-primary flex-1 py-2.5 rounded-lg text-sm"
              >
                Start Batch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
