"use client";

import { useEffect, useState, useCallback } from "react";
import Api from "../../../lib/api";
import {
  Reorder,
  useDragControls,
  motion,
} from "framer-motion";
import {
  GripVertical,
  Trash2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");

  /* ================= FETCH ================= */

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      const res = await Api.get("/clients/get");
      setClients(res.data.clients);
    } catch {
      toast.error("Failed to load clients");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  /* ================= UPLOAD ================= */

  const handleUpload = async () => {
    if (!image) {
      toast.error("Select logo image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("website", website);

    try {
      setUploading(true);

      await Api.post("/clients/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Client added");

      setImage(null);
      setName("");
      setWebsite("");

      fetchClients();
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    try {
      await Api.delete(`/clients/delete/${id}`);
      setClients((prev) =>
        prev.filter((c) => c._id !== id)
      );
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ================= TOGGLE ================= */

  const toggleActive = async (id, current) => {
    try {
      await Api.put(`/clients/toggle/${id}`, {
        isActive: !current,
      });

      setClients((prev) =>
        prev.map((client) =>
          client._id === id
            ? { ...client, isActive: !current }
            : client
        )
      );

      toast.success("Updated");
    } catch {
      toast.error("Update failed");
    }
  };

  /* ================= SAVE ORDER ================= */

  const saveOrder = async () => {
    try {
      await Api.put("/clients/reorder", {
        items: clients.map((client, index) => ({
          id: client._id,
          order: index,
        })),
      });

      toast.success("Order saved");
    } catch {
      toast.error("Reorder failed");
    }
  };

  return (
    <section className="min-h-screen bg-black text-white p-10">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-10">
          Manage Featured Clients
        </h1>

        {/* ================= UPLOAD FORM ================= */}

        <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">

          <div className="flex flex-col md:flex-row gap-4 items-center">

            <input
              type="file"
              onChange={(e) =>
                setImage(e.target.files[0])
              }
              className="text-sm"
            />

            <input
              placeholder="Client Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="bg-white/10 px-4 py-2 rounded-lg"
            />

            <input
              placeholder="Website URL"
              value={website}
              onChange={(e) =>
                setWebsite(e.target.value)
              }
              className="bg-white/10 px-4 py-2 rounded-lg flex-1"
            />

            <button
              onClick={handleUpload}
              disabled={uploading}
              className="bg-blue-600 px-6 py-2 rounded-lg"
            >
              {uploading ? "Uploading..." : "Add"}
            </button>

          </div>
        </div>

        {/* ================= LIST ================= */}

        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="animate-spin" size={40} />
          </div>
        ) : (
          <>
            <Reorder.Group
              axis="y"
              values={clients}
              onReorder={setClients}
              className="space-y-4"
            >
              {clients.map((client) => (
                <ClientItem
                  key={client._id}
                  client={client}
                  onDelete={handleDelete}
                  onToggle={toggleActive}
                />
              ))}
            </Reorder.Group>

            <div className="mt-6">
              <button
                onClick={saveOrder}
                className="bg-blue-600 px-6 py-2 rounded-lg"
              >
                Save Order
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* ================= SINGLE ITEM ================= */

function ClientItem({ client, onDelete, onToggle }) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={client}
      dragListener={false}
      dragControls={dragControls}
      className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10"
    >
      <div className="flex items-center gap-4">
        <img
          src={client.url}
          alt={client.name}
          className="w-24 h-16 object-contain bg-white/5 rounded"
          draggable={false}
        />
        <div>
          <p className="font-semibold">
            {client.name}
          </p>
          <p className="text-xs text-gray-400">
            {client.website}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">

        <button
          onClick={() =>
            onToggle(client._id, client.isActive)
          }
          className={`px-3 py-1 rounded text-xs ${
            client.isActive
              ? "bg-green-600"
              : "bg-gray-600"
          }`}
        >
          {client.isActive ? "Active" : "Inactive"}
        </button>

        <button
          onClick={() => onDelete(client._id)}
          className="bg-red-600 p-2 rounded"
        >
          <Trash2 size={16} />
        </button>

        <motion.div
          onPointerDown={(e) => {
            e.preventDefault();
            dragControls.start(e);
          }}
          className="cursor-grab active:cursor-grabbing text-gray-400"
        >
          <GripVertical size={18} />
        </motion.div>

      </div>
    </Reorder.Item>
  );
}
