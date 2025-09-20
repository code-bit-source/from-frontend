import { useEffect, useState } from "react";
import axios from "axios";

function DetailsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://form-backend-production-3944.up.railway.app/api/form");
        setClients(res.data);
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
      await axios.delete(`https://form-backend-production-3944.up.railway.app/api/form/${id}`);
      setClients((prev) => prev.filter((c) => c._id !== id));
      setSelectedClient(null);
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#000000]">
        <p className="text-gray-300 text-lg animate-pulse">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#000000]">
      <div className="backdrop-blur-md bg-white/5 shadow-xl rounded-2xl w-full max-w-6xl p-10 border border-white/10">
        <h1 className="text-3xl font-extrabold text-white mb-8 text-center drop-shadow-md">
          All Submitted Forms
        </h1>

        {clients.length === 0 ? (
          <p className="text-gray-400 text-center">No forms submitted yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-300 border border-white/10 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-white/10 text-gray-100">
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">Project Type</th>
                  <th className="px-4 py-3 text-left">Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c, i) => (
                  <tr
                    key={c._id}
                    onClick={() => setSelectedClient(c)}
                    className={`cursor-pointer ${
                      i % 2 === 0 ? "bg-white/5" : "bg-white/0"
                    } hover:bg-white/10 transition-colors`}
                  >
                    <td className="px-4 py-3">{c.name}</td>
                    <td className="px-4 py-3">{c.email}</td>
                    <td className="px-4 py-3">{c.phone || "-"}</td>
                    <td className="px-4 py-3">{c.projectType}</td>
                    <td className="px-4 py-3">
                      {new Date(c.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedClient && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-[#1e1b4b] text-gray-200 rounded-2xl shadow-xl w-full max-w-lg p-8 relative border border-white/10">
            <button
              onClick={() => setSelectedClient(null)}
              className="absolute top-3 right-4 text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-white mb-5 text-center">
              Form Details
            </h2>

            <div className="space-y-3">
              <p><span className="font-semibold">Name: </span>{selectedClient.name}</p>
              <p><span className="font-semibold">Email: </span>{selectedClient.email}</p>
              <p><span className="font-semibold">Phone: </span>{selectedClient.phone || "-"}</p>
              <p><span className="font-semibold">Project Type: </span>{selectedClient.projectType}</p>
              <p><span className="font-semibold">Submitted At: </span>{new Date(selectedClient.createdAt).toLocaleString()}</p>
              <div>
                <span className="font-semibold">Project Details:</span>
                <div className="mt-2 p-3 rounded-lg bg-white/10 border border-white/10 whitespace-pre-wrap text-sm leading-relaxed">
                  {selectedClient.details || "No details provided."}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDelete(selectedClient._id)}
              className="mt-6 w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg transition"
            >
              🗑 Delete This Form
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsPage;
