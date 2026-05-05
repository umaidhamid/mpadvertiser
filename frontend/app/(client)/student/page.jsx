"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const initialFormState = {
    name: "",
    rollNumber: "",
    email: "",
    phone: "",
    class: "",
    section: "",
    address: "",
    dateOfBirth: "",
    guardianName: "",
    guardianPhone: "",
    status: "active",
};

export default function StudentCapturePage() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    const [form, setForm] = useState(initialFormState);
    const [photo, setPhoto] = useState(null); // base64 string
    const [cameraActive, setCameraActive] = useState(false);
    const [cameraError, setCameraError] = useState("");
    const [submitState, setSubmitState] = useState("idle"); // idle | loading | success | error
    const [submitMessage, setSubmitMessage] = useState("");
    const [activeSection, setActiveSection] = useState("photo"); // photo | details
    const [previewUrl, setPreviewUrl] = useState(null);
    const [facingMode, setFacingMode] = useState("environment");
    // Start camera
    const startCamera = useCallback(async () => {
        setCameraError("");
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
  video: {
    facingMode,
    width: { ideal: 640 },
    height: { ideal: 480 },
  },
});
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
            }
            setCameraActive(true);
        } catch (err) {
            setCameraError(
                err.name === "NotAllowedError"
                    ? "Camera permission denied. Please allow camera access."
                    : "Unable to access camera. Make sure no other app is using it."
            );
        }
    }, []);

    // Stop camera
    const stopCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop());
            streamRef.current = null;
        }
        if (videoRef.current) videoRef.current.srcObject = null;
        setCameraActive(false);
    }, []);

    // Capture photo from video feed
    const capturePhoto = useCallback(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0);

        canvas.toBlob((blob) => {
            if (!blob) return;

            setPhoto(blob);
            setPreviewUrl(URL.createObjectURL(blob)); // ✅ FIX
        }, "image/jpeg", 0.85);

        stopCamera();
        setActiveSection("details");
    }, [stopCamera]);
    // Retake photo
    const retakePhoto = useCallback(() => {
        setPhoto(null);
        setActiveSection("photo");
        startCamera();
    }, [startCamera]);

    // Handle form field change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!photo) {
            setSubmitState("error");
            setSubmitMessage("Please capture a photo before submitting.");
            return;
        }

        setSubmitState("loading");

        try {
            const formData = new FormData();

            // append all fields
            Object.entries(form).forEach(([key, value]) => {
                formData.append(key, value);
            });

            formData.append("photo", photo); // ✅ actual file

            const res = await fetch(`${API_URL}/students`, {
                method: "POST",
                body: formData, // ❌ no JSON
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            setSubmitState("success");
            setSubmitMessage(`Student "${data.data.name}" registered successfully!`);

            setForm(initialFormState);
            setPhoto(null);
            setActiveSection("photo");

        } catch (err) {
            setSubmitState("error");
            setSubmitMessage(err.message);
        }
    };

    // Cleanup on unmount
    useEffect(() => () => stopCamera(), [stopCamera]);

    const inputClass =
        "w-full bg-[#0f1623] border border-[#1e2d45] rounded-lg px-4 py-2.5 text-[#c8d8f0] placeholder-[#3a5070] focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition text-sm";
    const labelClass = "block text-xs font-semibold text-[#4a7ab5] uppercase tracking-widest mb-1.5";

    return (
        <div className="min-h-screen bg-[#080d14] text-white font-mono">
            {/* Grid background */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(30,60,100,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,60,100,0.07) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative z-10 max-w-5xl mx-auto px-4 py-10">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
                        <span className="text-xs text-[#3b82f6] tracking-[0.3em] uppercase">Student Registration System</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Capture &amp; Register
                    </h1>
                    <p className="text-sm text-[#4a6080] mt-1">
                        Use your device camera to capture the student photo and fill in their details.
                    </p>
                    <button
  type="button"
  onClick={() => {
    stopCamera();
    setFacingMode(prev => prev === "user" ? "environment" : "user");
    setTimeout(startCamera, 200);
  }}
>
  🔄 Switch Camera
</button>
                </div>

                {/* Success/Error global alert */}
                {submitState === "success" && (
                    <div className="mb-6 flex items-center gap-3 bg-[#0a2a1a] border border-[#1a5a3a] rounded-xl px-5 py-4 text-[#4ade80] text-sm">
                        <span className="text-lg">✓</span>
                        <span>{submitMessage}</span>
                        <button
                            onClick={() => setSubmitState("idle")}
                            className="ml-auto text-[#4ade80] opacity-60 hover:opacity-100"
                        >
                            ×
                        </button>
                    </div>
                )}

                {submitState === "error" && (
                    <div className="mb-6 flex items-center gap-3 bg-[#2a0a0a] border border-[#5a1a1a] rounded-xl px-5 py-4 text-[#f87171] text-sm">
                        <span className="text-lg">✗</span>
                        <span>{submitMessage}</span>
                        <button
                            onClick={() => setSubmitState("idle")}
                            className="ml-auto text-[#f87171] opacity-60 hover:opacity-100"
                        >
                            ×
                        </button>
                    </div>
                )}

                {/* Tab navigation */}
                <div className="flex gap-1 mb-6 bg-[#0a1120] rounded-xl p-1 w-fit border border-[#1a2535]">
                    {[
                        { key: "photo", label: "① Photo Capture" },
                        { key: "details", label: "② Student Details" },
                    ].map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => {
                                if (key === "details" && !photo) return;
                                if (key === "photo" && cameraActive) return;
                                if (key === "photo" && !photo) startCamera();
                                if (key === "photo" && photo) retakePhoto();
                                setActiveSection(key);
                            }}
                            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeSection === key
                                    ? "bg-[#1a3060] text-[#93c5fd] shadow"
                                    : "text-[#3a5070] hover:text-[#6a90b0]"
                                } ${key === "details" && !photo ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left: Camera / Photo */}
                        <div
                            className={`bg-[#0a1120] border border-[#1a2535] rounded-2xl p-6 flex flex-col gap-4 ${activeSection !== "photo" ? "hidden lg:flex" : "flex"
                                }`}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <h2 className="text-sm font-bold text-[#4a7ab5] uppercase tracking-widest">
                                    Photo Capture
                                </h2>
                                {photo && (
                                    <span className="text-xs text-[#4ade80] border border-[#1a5a3a] rounded-full px-3 py-0.5">
                                        ✓ Captured
                                    </span>
                                )}
                            </div>

                            {/* Camera / Preview area */}
                            <div className="relative bg-[#060c18] rounded-xl overflow-hidden aspect-[4/3] border border-[#1a2535] flex items-center justify-center">
                                {/* Live video */}
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className={`w-full h-full object-cover ${cameraActive ? "block" : "hidden"}`}
                                />

                                {/* Captured photo */}
                                {photo && !cameraActive && (
                                    <img src={previewUrl} />)}

                                {/* Idle state */}
                                {!cameraActive && !photo && (
                                    <div className="text-center text-[#2a4060] px-6">
                                        <div className="text-5xl mb-4">◎</div>
                                        <p className="text-sm">Camera not started</p>
                                        <p className="text-xs mt-1 opacity-60">Click below to activate</p>
                                    </div>
                                )}

                                {/* Scanning overlay when camera active */}
                                {cameraActive && (
                                    <div className="absolute inset-0 pointer-events-none">
                                        <div className="absolute inset-6 border border-[#3b82f6] rounded-lg opacity-40" />
                                        <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-[#3b82f6]" />
                                        <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-[#3b82f6]" />
                                        <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-[#3b82f6]" />
                                        <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-[#3b82f6]" />
                                    </div>
                                )}
                            </div>

                            {/* Hidden canvas for capture */}
                            <canvas ref={canvasRef} className="hidden" />

                            {/* Camera error */}
                            {cameraError && (
                                <p className="text-xs text-[#f87171] bg-[#2a0a0a] border border-[#5a1a1a] rounded-lg px-3 py-2">
                                    {cameraError}
                                </p>
                            )}

                            {/* Camera controls */}
                            <div className="flex gap-3">
                                {!cameraActive && !photo && (
                                    <button
                                        type="button"
                                        onClick={startCamera}
                                        className="flex-1 bg-[#1a3060] hover:bg-[#1e3a78] text-[#93c5fd] font-semibold py-3 rounded-xl text-sm transition-all border border-[#2a4080]"
                                    >
                                        ◎ Start Camera
                                    </button>
                                )}

                                {cameraActive && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={capturePhoto}
                                            className="flex-1 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold py-3 rounded-xl text-sm transition-all shadow-lg shadow-blue-900/30"
                                        >
                                            ● Capture Photo
                                        </button>
                                        <button
                                            type="button"
                                            onClick={stopCamera}
                                            className="px-4 bg-[#1a2535] hover:bg-[#243045] text-[#6a90b0] font-semibold py-3 rounded-xl text-sm transition-all border border-[#1e2d45]"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}

                                {photo && !cameraActive && (
                                    <button
                                        type="button"
                                        onClick={retakePhoto}
                                        className="flex-1 bg-[#1a2535] hover:bg-[#243045] text-[#6a90b0] font-semibold py-3 rounded-xl text-sm transition-all border border-[#1e2d45]"
                                    >
                                        ↺ Retake Photo
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Right: Student Details Form */}
                        <div
                            className={`bg-[#0a1120] border border-[#1a2535] rounded-2xl p-6 flex flex-col gap-4 ${activeSection !== "details" ? "hidden lg:flex" : "flex"
                                }`}
                        >
                            <h2 className="text-sm font-bold text-[#4a7ab5] uppercase tracking-widest mb-1">
                                Student Details
                            </h2>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Name */}
                                <div className="col-span-2">
                                    <label className={labelClass}>Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Arjun Sharma"
                                        required
                                        className={inputClass}
                                    />
                                </div>

                                {/* Roll Number */}
                                <div>
                                    <label className={labelClass}>Roll Number *</label>
                                    <input
                                        type="text"
                                        name="rollNumber"
                                        value={form.rollNumber}
                                        onChange={handleChange}
                                        placeholder="e.g. 2024001"
                                        required
                                        className={inputClass}
                                    />
                                </div>

                                {/* Class */}
                                <div>
                                    <label className={labelClass}>Class *</label>
                                    <select
                                        name="class"
                                        value={form.class}
                                        onChange={handleChange}
                                        required
                                        className={inputClass}
                                    >
                                        <option value="">Select class</option>
                                        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map((c) => (
                                            <option key={c} value={c}>
                                                Class {c}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                
                                {/* <div className="col-span-2">
                                    <label className={labelClass}>Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="student@school.edu"
                                        required
                                        className={inputClass}
                                    />
                                </div>

                               
                                <div>
                                    <label className={labelClass}>Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        className={inputClass}
                                    />
                                </div>

                               
                                <div>
                                    <label className={labelClass}>Section</label>
                                    <select
                                        name="section"
                                        value={form.section}
                                        onChange={handleChange}
                                        className={inputClass}
                                    >
                                        <option value="">Select</option>
                                        {["A", "B", "C", "D", "E"].map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>

                              
                                <div>
                                    <label className={labelClass}>Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={form.dateOfBirth}
                                        onChange={handleChange}
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>Status</label>
                                    <select
                                        name="status"
                                        value={form.status}
                                        onChange={handleChange}
                                        className={inputClass}
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>

                               
                                <div className="col-span-2">
                                    <label className={labelClass}>Address</label>
                                    <textarea
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        placeholder="Street, City, State"
                                        rows={2}
                                        className={inputClass + " resize-none"}
                                    />
                                </div>

                                
                                <div>
                                    <label className={labelClass}>Guardian Name</label>
                                    <input
                                        type="text"
                                        name="guardianName"
                                        value={form.guardianName}
                                        onChange={handleChange}
                                        placeholder="Parent / Guardian"
                                        className={inputClass}
                                    />
                                </div>

                               
                                <div>
                                    <label className={labelClass}>Guardian Phone</label>
                                    <input
                                        type="tel"
                                        name="guardianPhone"
                                        value={form.guardianPhone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        className={inputClass}
                                    />
                                </div> */}
                            </div>
                        </div>
                    </div>

                    {/* Submit button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={submitState === "loading" || !photo}
                            className={`w-full py-4 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all ${submitState === "loading"
                                    ? "bg-[#1a3060] text-[#4a7ab5] cursor-wait"
                                    : !photo
                                        ? "bg-[#0f1623] text-[#2a4060] cursor-not-allowed border border-[#1a2535]"
                                        : "bg-[#3b82f6] hover:bg-[#2563eb] text-white shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50"
                                }`}
                        >
                            {submitState === "loading"
                                ? "⟳ Registering Student..."
                                : !photo
                                    ? "Capture photo to continue"
                                    : "→ Register Student"}
                        </button>
                        {!photo && (
                            <p className="text-center text-xs text-[#2a4060] mt-2">
                                You must capture a photo before submitting the form.
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}