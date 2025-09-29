import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://form-backend-production-8672.up.railway.app/api/form";

function normalizePhoneForWhatsApp(raw) {
  if (!raw) return null;
  const only = String(raw).replace(/[^\d+]/g, "");
  if (!only) return null;
  if (only.startsWith("+")) return only.slice(1);
  const digits = only.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

export default function DetailsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(BASE_URL);
        setClients(res.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this form?");
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      await axios.delete(`${BASE_URL}/${id}`);
      setClients((prev) => prev.filter((c) => c._id !== id));
      setSelectedClient(null);
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-to-br from-white via-[#f3f6ff] to-[#eef9ff] px-6 py-12">
        <div className="animate-pulse text-gray-600">Loading submitted forms…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f3f6ff] to-[#eef9ff] px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">All Submitted Forms</h1>
            <p className="text-sm text-gray-500 mt-1">Review submissions, view details and remove entries when needed.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setLoading(true);
                axios.get(BASE_URL).then((r) => setClients(r.data || [])).catch(() => alert("Refresh failed")).finally(() => setLoading(false));
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition"
            >
              Refresh
            </button>
          </div>
        </header>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-[0_20px_50px_rgba(16,24,40,0.06)] p-6 overflow-x-auto">
          {clients.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No forms submitted yet.</div>
          ) : (
            <table className="min-w-full table-auto text-sm text-left">
              <thead className="text-gray-600">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Project Type</th>
                  <th className="px-4 py-3">Budget (INR)</th>
                  <th className="px-4 py-3">Submitted At</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">
                {clients.map((c, i) => (
                  <tr
                    key={c._id}
                    onClick={() => setSelectedClient(c)}
                    className={`cursor-pointer ${i % 2 === 0 ? "bg-gray-50" : ""} hover:bg-gray-100 transition`}
                  >
                    <td className="px-4 py-3">{c.name}</td>
                    <td className="px-4 py-3">{c.email}</td>
                    <td className="px-4 py-3">{c.phone || "-"}</td>
                    <td className="px-4 py-3">{c.projectType}</td>
                    <td className="px-4 py-3">{c.budget || "-"}</td>
                    <td className="px-4 py-3">{new Date(c.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>

      {selectedClient && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 px-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-[0_30px_60px_rgba(16,24,40,0.12)] border border-gray-100 p-6 relative">
            <button
              onClick={() => setSelectedClient(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">Form Details</h2>

            <div className="text-sm text-gray-700 space-y-3">
              <div>
                <div className="text-xs text-gray-500">Name</div>
                <div className="mt-1 text-gray-800 font-medium">{selectedClient.name}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Email</div>
                <div className="mt-1 text-gray-800">{selectedClient.email}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Phone</div>
                <div className="mt-1 text-gray-800">{selectedClient.phone || "-"}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Project Type</div>
                <div className="mt-1 text-gray-800">{selectedClient.projectType}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Estimated Budget (INR)</div>
                <div className="mt-1 text-gray-800">{selectedClient.budget || "-"}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Submitted At</div>
                <div className="mt-1 text-gray-800">{new Date(selectedClient.createdAt).toLocaleString()}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Project Details</div>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-100 text-gray-800 whitespace-pre-wrap">{selectedClient.details || "No details provided."}</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  const normalized = normalizePhoneForWhatsApp(selectedClient.phone);
                  if (!normalized) {
                    alert("Client phone number not available or invalid.");
                    return;
                  }
                  const text = `Hi ${selectedClient.name || ""}, I'm reaching out about your project submission.`;
                  const url = `https://wa.me/${normalized}?text=${encodeURIComponent(text)}`;
                  window.open(url, "_blank");
                }}
                className="px-4 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
              >
               contact
              </button>

              <button
                onClick={() => handleDelete(selectedClient._id)}
                className="px-4 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-60"
                disabled={deletingId === selectedClient._id}
              >
                {deletingId === selectedClient._id ? "Deleting…" : "Delete Form"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
