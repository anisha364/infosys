import { useState } from "react";
import { Search, Filter, Download, Eye, X, ChevronLeft, ChevronRight } from "lucide-react";

const allInspections = Array.from({ length: 30 }, (_, i) => {
  const defects = ["Surface Crack", "Corrosion", "Dent", "Scratch", "None", "None", "None"];
  const defect = defects[i % defects.length];
  const decisions = defect === "None" ? "PASS" : "FAIL";
  const severities: Record<string, string> = { "Surface Crack": "CRITICAL", "Corrosion": "HIGH", "Dent": "MEDIUM", "Scratch": "LOW" };
  return {
    id: `INS-${1050 - i}`,
    productId: `P-${1050 - i}`,
    date: new Date(Date.now() - i * 3600000 * 4).toLocaleDateString("en-GB"),
    defect: defect === "None" ? "—" : defect,
    confidence: defect === "None" ? `${95 + Math.floor(Math.random() * 4)}%` : `${75 + Math.floor(Math.random() * 20)}%`,
    severity: defect === "None" ? "—" : severities[defect] || "LOW",
    decision: decisions,
    line: `Line 0${(i % 5) + 1}`,
  };
});

export default function InspectionHistory({ onViewResult }: { onViewResult: () => void }) {
  const [search, setSearch] = useState("");
  const [decisionFilter, setDecisionFilter] = useState("ALL");
  const [severityFilter, setSeverityFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const perPage = 10;

  const filtered = allInspections.filter((r) => {
    const matchSearch = !search || r.id.toLowerCase().includes(search.toLowerCase()) || r.productId.toLowerCase().includes(search.toLowerCase());
    const matchDecision = decisionFilter === "ALL" || r.decision === decisionFilter;
    const matchSev = severityFilter === "ALL" || r.severity === severityFilter;
    return matchSearch && matchDecision && matchSev;
  });

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const clearFilters = () => {
    setSearch(""); setDecisionFilter("ALL"); setSeverityFilter("ALL"); setPage(1);
  };

  return (
    <div className="h-full overflow-y-auto px-6 py-5 circuit-bg">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            className="input-field pl-9"
            placeholder="Search Product ID or Inspection ID…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <select
          className="input-field w-auto"
          value={decisionFilter}
          onChange={(e) => { setDecisionFilter(e.target.value); setPage(1); }}
        >
          <option value="ALL">All Decisions</option>
          <option value="PASS">PASS</option>
          <option value="FAIL">FAIL</option>
        </select>
        <select
          className="input-field w-auto"
          value={severityFilter}
          onChange={(e) => { setSeverityFilter(e.target.value); setPage(1); }}
        >
          <option value="ALL">All Severities</option>
          <option value="CRITICAL">Critical</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
        {(search || decisionFilter !== "ALL" || severityFilter !== "ALL") && (
          <button onClick={clearFilters} className="flex items-center gap-1.5 text-slate-400 text-sm hover:text-slate-300 transition-colors px-3 py-2 rounded-lg border border-slate-700 hover:border-slate-600">
            <X size={13} /> Clear
          </button>
        )}
        <div className="text-slate-500 text-xs ml-auto">{filtered.length} results</div>
      </div>

      {/* Table */}
      <div className="stat-card p-0 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Search size={36} className="text-slate-700 mx-auto mb-3" />
            <div className="text-slate-500 font-medium">No inspections found</div>
            <div className="text-slate-600 text-sm mt-1">Try adjusting your search or filters</div>
            <button onClick={clearFilters} className="mt-4 btn-primary px-5 py-2 rounded-lg text-sm">Clear Filters</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-700/40 bg-slate-800/30">
                  {["Inspection ID", "Product ID", "Date", "Production Line", "Defect Type", "Confidence", "Severity", "Decision", "Actions"].map((h) => (
                    <th key={h} className="text-left text-slate-500 font-medium py-3 px-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((row, i) => (
                  <tr key={row.id} className={`border-b border-slate-800/40 hover:bg-blue-500/3 transition-colors ${i % 2 === 0 ? "" : "bg-slate-800/10"}`}>
                    <td className="py-3 px-4 font-mono-data text-blue-400">{row.id}</td>
                    <td className="py-3 px-4 text-slate-300">{row.productId}</td>
                    <td className="py-3 px-4 text-slate-400">{row.date}</td>
                    <td className="py-3 px-4 text-slate-400">{row.line}</td>
                    <td className="py-3 px-4 text-slate-300">{row.defect}</td>
                    <td className="py-3 px-4 font-mono-data text-slate-300">{row.confidence}</td>
                    <td className="py-3 px-4">
                      {row.severity !== "—" ? (
                        <span className={`status-badge ${
                          row.severity === "CRITICAL" ? "badge-critical" :
                          row.severity === "HIGH" ? "badge-high" :
                          row.severity === "MEDIUM" ? "badge-medium" : "badge-low"
                        }`}>{row.severity}</span>
                      ) : <span className="text-slate-600">—</span>}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`status-badge ${row.decision === "PASS" ? "badge-pass" : "badge-fail"}`}>
                        {row.decision}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button onClick={onViewResult} className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors" title="View">
                          <Eye size={13} />
                        </button>
                        <button className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-colors" title="Download">
                          <Download size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-slate-500 text-xs">
            Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg border border-slate-700 text-slate-400 disabled:opacity-30 hover:border-slate-600 transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-xs transition-colors ${page === p ? "bg-blue-500 text-white" : "border border-slate-700 text-slate-400 hover:border-slate-600"}`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-slate-700 text-slate-400 disabled:opacity-30 hover:border-slate-600 transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
