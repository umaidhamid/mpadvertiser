"use client";

import { useEffect, useState } from "react";
import React from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Eye,
  X,
  Hash,
  ShieldCheck,
  Calendar,
  Mail,
  Phone,
  User,
  MapPin,
  Clock
} from "lucide-react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null); // Controls the "Detail View"

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    class: "",
    status: "",
  });

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`${API_URL}/students?${query}`);
      const data = await res.json();
console.log(data)
      setStudents(data.data);
      setPagination(data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString();
};
  useEffect(() => {
    fetchStudents();
  }, [filters]);

  // 🔥 DELETE HANDLER
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Delete this student?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/students/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(data.message);

      // remove from UI instantly
      setStudents((prev) => prev.filter((s) => s._id !== id));

    } catch (err) {
      alert(err.message);
    }
  };

  return (
   <div className="p-4 md:p-8 min-h-screen bg-[#0a0a0a] text-slate-200 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Students</h1>
            <p className="text-slate-400 text-sm mt-1">Manage and monitor student records</p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20">
            + Add Student
          </button>
        </div>

        {/* FILTERS */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6 p-4 bg-[#111] rounded-2xl border border-white/5 items-center">
          <div className="relative w-full lg:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              placeholder="Search by name, email or roll..."
              className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm text-white"
              onChange={(e) => setFilters(p => ({ ...p, search: e.target.value }))}
            />
          </div>

          <div className="flex gap-3 w-full lg:w-auto">
            <select
              onChange={(e) => setFilters(p => ({ ...p, class: e.target.value }))}
              className="flex-1 lg:flex-none px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-sm text-slate-300 cursor-pointer outline-none hover:bg-[#222]"
            >
              <option value="">All Classes</option>
              {[...Array(12)].map((_, i) => <option key={i+1} value={i+1}>Class {i+1}</option>)}
            </select>

            <select
              onChange={(e) => setFilters(p => ({ ...p, status: e.target.value }))}
              className="flex-1 lg:flex-none px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-sm text-slate-300 cursor-pointer outline-none hover:bg-[#222]"
            >
              <option value="">Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-[#111] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Student</th>
                  <th className="p-4 font-semibold">Roll Number</th>
                  <th className="p-4 font-semibold">Class</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr><td colSpan="5" className="text-center py-20">Loading...</td></tr>
                ) : (
                  students.map((s) => (
                    <tr key={s._id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={s.photo} className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10" alt="" />
                          <div>
                            <p className="font-medium text-white leading-none mb-1">{s.name}</p>
                            <p className="text-xs text-slate-500">{s.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-400 font-mono text-sm">#{s.rollNumber}</td>
                      <td className="p-4 text-slate-300">Grade {s.class}-{s.section}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          s.status === "active" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${s.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                          {s.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => setSelectedStudent(s)}
                            className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-all"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(s._id)}
                            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4 px-2">
          <p className="text-sm text-slate-500">
            Showing page <span className="text-white">{pagination.page}</span> of {pagination.totalPages}
          </p>
          <div className="flex gap-2">
            <button
              disabled={filters.page === 1}
              onClick={() => setFilters(p => ({ ...p, page: p.page - 1 }))}
              className="flex items-center gap-1 px-4 py-2 rounded-xl border border-white/10 bg-[#111] hover:bg-[#1a1a1a] disabled:opacity-30 transition-all text-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <button
              disabled={filters.page === pagination.totalPages}
              onClick={() => setFilters(p => ({ ...p, page: p.page + 1 }))}
              className="flex items-center gap-1 px-4 py-2 rounded-xl border border-white/10 bg-[#111] hover:bg-[#1a1a1a] disabled:opacity-30 transition-all text-sm"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* --- STUDENT DETAIL MODAL --- */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header Actions */}
            <div className="absolute top-4 right-4 flex gap-2 z-20">
               <button 
                onClick={() => setSelectedStudent(null)}
                className="p-2 bg-black/40 text-slate-400 hover:text-white rounded-full backdrop-blur-md border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Banner Background */}
            <div className="h-28 bg-gradient-to-r from-indigo-900 to-indigo-600"></div>
            
            <div className="px-6 pb-8">
              {/* Profile Section */}
              <div className="relative -mt-14 mb-8 flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
                <img 
                  src={selectedStudent.photo} 
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-[#111] shadow-2xl ring-1 ring-white/10" 
                  alt={selectedStudent.name}
                />
                <div className="pb-2 flex-1">
                  <h2 className="text-3xl font-bold text-white tracking-tight">{selectedStudent.name}</h2>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                    <span className="bg-indigo-500/10 text-indigo-400 text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded">
                      Class {selectedStudent.class}-{selectedStudent.section}
                    </span>
                    <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded ${
                      selectedStudent.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                    }`}>
                      {selectedStudent.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <DataCard title="Academic Info">
                  <DataRow icon={<Hash />} label="Roll Number" value={selectedStudent.rollNumber} />
                  <DataRow icon={<Calendar />} label="Created On" value={formatDate(selectedStudent.createdAt)} />
                </DataCard>

                <DataCard title="Personal Details">
                  <DataRow icon={<Mail />} label="Email Address" value={selectedStudent.email} />
                  <DataRow icon={<Phone />} label="Student Phone" value={selectedStudent.phone} />
                  <DataRow icon={<Calendar />} label="Date of Birth" value={formatDate(selectedStudent.dateOfBirth)} />
                </DataCard>

                <DataCard title="Guardian Information">
                  <DataRow icon={<User />} label="Guardian Name" value={selectedStudent.guardianName} />
                  <DataRow icon={<Phone />} label="Guardian Contact" value={selectedStudent.guardianPhone} />
                </DataCard>

                <DataCard title="Residential Address">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-indigo-400 mt-1" />
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Address</p>
                      <p className="text-sm text-slate-300 leading-relaxed italic">"{selectedStudent.address}"</p>
                    </div>
                  </div>
                </DataCard>

              </div>

              {/* Footer System Info */}
              <div className="mt-8 pt-4 border-t border-white/5 flex flex-col md:flex-row justify-between gap-2 text-[10px] text-slate-600 uppercase font-bold tracking-tighter">
                <span className="flex items-center gap-1"><Clock size={12}/> Last Sync: {formatDate(selectedStudent.updatedAt)}</span>
                <span>Document Version: {selectedStudent.__v}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Sub-Components for Organization ---

const DataCard = ({ title, children }) => (
  <div className="bg-[#161616] border border-white/5 p-4 rounded-2xl space-y-4">
    <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const DataRow = ({ icon, label, value, isMono = false }) => (
  <div className="flex items-start gap-3">
    <div className="text-slate-500 mt-1">{React.cloneElement(icon, { size: 14 })}</div>
    <div className="overflow-hidden">
      <p className="text-[10px] text-slate-500 uppercase font-bold leading-none mb-1">{label}</p>
      <p className={`text-sm text-slate-200 truncate ${isMono ? 'font-mono text-xs opacity-70' : ''}`}>
        {value || 'Not Provided'}
      </p>
    </div>
  </div>
);




