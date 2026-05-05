"use client";

import { useState } from "react";

const API_BASE = "http://localhost:5000/uploadcsv";

export default function Page() {
  // ── CSV state ─────────────────────────────────────────────────────────────
  const [file, setFile] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [labelColumn, setLabelColumn] = useState("");
  const [contentColumns, setContentColumns] = useState([]);
  const [qrs, setQrs] = useState([]);
  const [skipped, setSkipped] = useState(0);
  const [csvLoading, setCsvLoading] = useState(false);

  // ── Link QR state ─────────────────────────────────────────────────────────
  const [link, setLink] = useState("");
  const [linkLabel, setLinkLabel] = useState("");
  const [linkQR, setLinkQR] = useState(null);
  const [linkLoading, setLinkLoading] = useState(false);
  const [linkError, setLinkError] = useState("");

  // ── Shared ────────────────────────────────────────────────────────────────
  const [error, setError] = useState("");

  // ── Tab state ─────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("csv"); // "csv" | "link"

  // ── Load CSV headers ──────────────────────────────────────────────────────
  const loadHeaders = async () => {
    if (!file) return setError("Please upload a CSV file first.");
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_BASE}/headers`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to load headers");

      const data = await res.json();
      setHeaders(data.headers);
      setLabelColumn(data.headers[0] || "");
      setContentColumns([data.headers[1] || data.headers[0] || ""]);
      setQrs([]);
      setSkipped(0);
    } catch (err) {
      setError(err.message);
    }
  };

  // ── Toggle content column ─────────────────────────────────────────────────
  const toggleContentColumn = (col) => {
    setContentColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  // ── Generate QR from CSV ──────────────────────────────────────────────────
  const generateCSVQR = async () => {
    if (!file || !labelColumn || contentColumns.length === 0) {
      return setError("Select a label column and at least one content column.");
    }
    setError("");
    setCsvLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("labelColumn", labelColumn);
      formData.append("contentColumns", contentColumns.join(","));

      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("QR generation failed");

      const data = await res.json();
      setQrs(data.results);
      setSkipped(data.skipped);
    } catch (err) {
      setError(err.message);
    } finally {
      setCsvLoading(false);
    }
  };

  // ── Generate QR from link ─────────────────────────────────────────────────
  const generateLinkQR = async () => {
    if (!link.trim()) return setLinkError("Please enter a URL.");
    setLinkError("");
    setLinkLoading(true);
    setLinkQR(null);

    try {
      const res = await fetch(`${API_BASE}/generate-link-qr`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link: link.trim(), label: linkLabel.trim() }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to generate QR");
      }

      const data = await res.json();
      setLinkQR(data);
    } catch (err) {
      setLinkError(err.message);
    } finally {
      setLinkLoading(false);
    }
  };

  // ── Download helper ───────────────────────────────────────────────────────
  const downloadQR = (item) => {
    const link = document.createElement("a");
    link.href = item.qr;
    link.download = `${item.label || "qr"}.png`;
    link.click();
  };

  // ── Download all CSV QRs ──────────────────────────────────────────────────
  const downloadAll = () => {
    qrs.forEach((item, i) => {
      setTimeout(() => {
        const a = document.createElement("a");
        a.href = item.qr;
        a.download = `${item.label || `qr_${i + 1}`}.png`;
        a.click();
      }, i * 200);
    });
  };

  // ── Print all CSV QRs ─────────────────────────────────────────────────────
  const printAll = () => {
    const win = window.open("", "_blank");
    const html = qrs
      .map(
        (item) => `
        <div style="display:inline-block;text-align:center;margin:16px;
                    border:1px solid #ccc;padding:12px;border-radius:8px;">
          <img src="${item.qr}" style="width:150px;height:150px;" />
          <p style="font-weight:bold;margin-top:8px;font-size:16px;">${item.label}</p>
          <p style="font-size:11px;color:#555;word-break:break-all;max-width:150px;">
            ${item.qrContent}
          </p>
        </div>`
      )
      .join("");

    win.document.write(`
      <html>
        <head><title>QR Codes</title></head>
        <body style="font-family:sans-serif;padding:20px;">
          <h2>QR Codes</h2>
          <div>${html}</div>
          <script>window.onload = () => window.print();<\/script>
        </body>
      </html>
    `);
    win.document.close();
  };

  // ─────────────────────────────────────────────────────────────────────────
 return (
  <div className="min-h-screen bg-background text-foreground p-6 md:p-10 transition-colors duration-300 mt-15">
    <div className="max-w-5xl mx-auto animate-fadeInUp">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-2">QR Code Generator</h1>
        <p className="text-muted text-lg">
          Transform your data into scanable codes instantly.
        </p>
      </header>

      {/* Tabs - Modern Pill Style */}
      <div className="flex p-1 bg-muted rounded-base mb-8 w-fit">
        <button
          onClick={() => setActiveTab("csv")}
          className={`px-6 py-2 text-sm font-semibold rounded-base transition-all ${
            activeTab === "csv"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          📄 CSV Upload
        </button>
        <button
          onClick={() => setActiveTab("link")}
          className={`px-6 py-2 text-sm font-semibold rounded-base transition-all ${
            activeTab === "link"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          🔗 Single Link
        </button>
      </div>

      <div className="grid gap-8">
        {/* ── TAB: Link ── */}
        {activeTab === "link" && (
          <div className="bg-card border border-border rounded-base p-8 shadow-sm max-w-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                  🌐 Destination URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={link}
                  onChange={(e) => {
                    setLink(e.target.value);
                    setLinkError("");
                    setLinkQR(null);
                  }}
                  className="w-full bg-background border border-border p-3 rounded-base focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                  🏷️ Label <span className="lowercase font-normal text-muted">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Portfolio Website"
                  value={linkLabel}
                  onChange={(e) => setLinkLabel(e.target.value)}
                  className="w-full bg-background border border-border p-3 rounded-base focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>

              {linkError && <p className="text-red-500 text-sm italic">{linkError}</p>}

              <button
                onClick={generateLinkQR}
                disabled={linkLoading}
                className="w-full py-4 bg-primary text-primary-foreground rounded-base font-bold hover:opacity-90 disabled:opacity-50 transition-all shadow-md"
              >
                {linkLoading ? "Processing..." : "Generate QR Code"}
              </button>
            </div>

            {/* Link Result Card */}
            {linkQR && (
              <div className="mt-10 pt-10 border-t border-border flex flex-col items-center animate-fadeInUp">
                <div className="bg-white p-4 rounded-base shadow-inner border border-border">
                  <img src={linkQR.qr} alt={linkQR.label} className="w-48 h-48" />
                </div>
                <h3 className="text-xl font-bold mt-4">{linkQR.label || "QR Code"}</h3>
                <code className="text-xs text-muted mt-1 bg-muted px-2 py-1 rounded">
                  {linkQR.qrContent}
                </code>
                <button
                  onClick={() => downloadQR(linkQR)}
                  className="mt-6 px-8 py-2 bg-foreground text-background rounded-base text-sm font-bold hover:opacity-80 transition-all"
                >
                  Download PNG
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── TAB: CSV ── */}
        {activeTab === "csv" && (
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-base p-8 shadow-sm">
              <div className="flex flex-wrap items-end gap-4">
                <div className="flex-1 min-w-[250px]">
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2">Upload CSV File</label>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      setHeaders([]);
                      setQrs([]);
                      setError("");
                    }}
                    className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-base file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:opacity-90 cursor-pointer"
                  />
                </div>
                <button
                  onClick={loadHeaders}
                  className="px-6 py-2 bg-secondary text-secondary-foreground border border-border rounded-base font-bold hover:bg-muted transition-all"
                >
                  Parse Columns
                </button>
              </div>

              {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

              {/* Column Selection Grid */}
              {headers.length > 0 && (
                <div className="mt-10 grid md:grid-cols-2 gap-10 animate-fadeInUp">
                  <section className="bg-muted/30 p-6 rounded-base border border-border">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full text-[10px] flex items-center justify-center">1</span>
                      Select Label Column
                    </h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
                      {headers.map((h) => (
                        <label key={h} className="flex items-center gap-3 p-2 rounded-base hover:bg-background cursor-pointer transition-colors border border-transparent hover:border-border">
                          <input
                            type="radio"
                            name="label"
                            checked={labelColumn === h}
                            onChange={() => setLabelColumn(h)}
                            className="accent-primary h-4 w-4"
                          />
                          <span className="text-sm font-medium">{h}</span>
                        </label>
                      ))}
                    </div>
                  </section>

                  <section className="bg-muted/30 p-6 rounded-base border border-border">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full text-[10px] flex items-center justify-center">2</span>
                      Select Data Columns
                    </h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
                      {headers.map((h) => (
                        <label key={h} className="flex items-center gap-3 p-2 rounded-base hover:bg-background cursor-pointer transition-colors border border-transparent hover:border-border">
                          <input
                            type="checkbox"
                            checked={contentColumns.includes(h)}
                            onChange={() => toggleContentColumn(h)}
                            className="accent-primary h-4 w-4 rounded"
                          />
                          <span className="text-sm font-medium">{h}</span>
                        </label>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {headers.length > 0 && (
                <div className="mt-8 pt-8 border-t border-border flex justify-end">
                  <button
                    onClick={generateCSVQR}
                    disabled={csvLoading || contentColumns.length === 0}
                    className="px-10 py-3 bg-primary text-primary-foreground rounded-base font-bold shadow-lg disabled:opacity-30 hover:scale-[1.02] transition-transform"
                  >
                    {csvLoading ? "Generating Batch..." : "Generate All Codes"}
                  </button>
                </div>
              )}
            </div>

            {/* Batch Results Actions */}
            {qrs.length > 0 && (
              <div className="bg-secondary p-4 rounded-base flex flex-wrap justify-between items-center gap-4 animate-fadeInUp">
                <div className="flex gap-3">
                  <button onClick={printAll} className="px-5 py-2 bg-green-600 text-white rounded-base text-sm font-bold hover:bg-green-700 transition-colors">
                    🖨️ Print Batch
                  </button>
                  <button onClick={downloadAll} className="px-5 py-2 bg-purple-600 text-white rounded-base text-sm font-bold hover:bg-purple-700 transition-colors">
                    ⬇️ Download ZIP
                  </button>
                </div>
                <div className="text-sm font-medium">
                  <span className="text-green-600">✅ {qrs.length} Ready</span>
                  {skipped > 0 && <span className="ml-3 text-orange-500">⚠️ {skipped} Skipped</span>}
                </div>
              </div>
            )}

            {/* QR Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {qrs.map((item, i) => (
                <div key={i} className="group bg-card border border-border p-4 rounded-base hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                  <div className="bg-white p-2 rounded-lg mb-3">
                    <img src={item.qr} alt={item.label} className="w-full aspect-square" />
                  </div>
                  <p className="font-bold truncate text-foreground">{item.label}</p>
                  <p className="text-[10px] text-muted truncate">{item.qrContent}</p>
                  <button
                    onClick={() => downloadQR(item)}
                    className="mt-3 w-full py-1 text-[10px] font-bold uppercase tracking-tighter border border-border rounded hover:bg-foreground hover:text-background transition-colors"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);
}