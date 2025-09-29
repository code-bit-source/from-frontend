import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://form-backend-production-8672.up.railway.app/api/form";

export default function FromPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    details: "",
    budget: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const e = {};
    if (!data.name.trim()) e.name = "Name is required";
    if (!data.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Invalid email";
    if (!data.phone.trim()) e.phone = "Phone is required";
    else if (!/^\+?\d{7,15}$/.test(data.phone.replace(/\s+/g, "")))
      e.phone = "Enter valid phone number";
    if (!data.projectType) e.projectType = "Project type is required";
    if (!data.details.trim()) e.details = "Project details are required";
    if (!data.budget.trim()) e.budget = "Estimated budget is required";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eobj = validate(formData);
    if (Object.keys(eobj).length) {
      setErrors(eobj);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);
    try {
      await axios.post(BASE_URL, formData, { headers: { "Content-Type": "application/json" } });
      setSubmitted(true);
    } catch (err) {
      console.error("Submit error:", err);
      alert(err.response?.data?.error || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#f0f9ff]">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 grid place-items-center rounded-full bg-green-50">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-gray-800">Request Sent</h1>
            <p className="text-center text-gray-500">We’ll review your project brief and reach out within 24–48 hours with a proposed scope and next steps.</p>
            <a
              href="https://wa.me/9315868930?text=Hi%20I%20just%20submitted%20my%20project%20form"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-white via-[#f3f6ff] to-[#eef9ff]">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Branding / Info */}
        <div className="hidden md:flex flex-col justify-between gap-6 p-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 grid place-items-center text-white font-semibold">PT</div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Project Intake</h2>
                <p className="text-sm text-gray-500">Give us the essentials. We convert briefs into fixed-scope proposals.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-2xl border border-gray-100">
              <h3 className="text-sm font-medium text-gray-700 mb-2">What to include</h3>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                <li>Primary goal and target audience</li>
                <li>Must-have features or integrations</li>
                <li>Preferred timeline and the estimated budget below</li>
              </ul>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <strong>Pro tip:</strong> adding budget helps us recommend realistic tech stacks and timelines.
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-[0_30px_60px_rgba(16,24,40,0.08)] border border-gray-100 p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">Client Project Form</h1>
          <p className="text-sm text-gray-500 mb-6">Fill the form below with clear details so we can prepare an accurate estimate.</p>

          {Object.keys(errors).length > 0 && (
            <div className="mb-4 bg-red-50 border border-red-100 text-red-700 text-sm p-3 rounded">
              Please fix the highlighted fields before submitting.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full name *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Aman Verma"
                className={`w-full px-4 py-3 rounded-lg border ${errors.name ? "border-red-300" : "border-gray-200"} bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition`}
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@company.com"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-300" : "border-gray-200"} bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 98XXXXXXXX"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? "border-red-300" : "border-gray-200"} bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition`}
                />
                {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project type *</label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg border ${errors.projectType ? "border-red-300" : "border-gray-200"} bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition`}
              >
                <option value="">Choose project type</option>
                <option>Portfolio Website</option>
                <option>Business Website</option>
                <option>Ecommerce Website</option>
                <option>Coaching Institute Website</option>
                <option>Static Website</option>
                <option>WhatsApp Chat Bot</option>
                <option>Other</option>
              </select>
              {errors.projectType && <p className="mt-1 text-xs text-red-600">{errors.projectType}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estimated budget (INR) *</label>
              <input
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                placeholder="e.g. 25000 - 75000"
                className={`w-full px-4 py-3 rounded-lg border ${errors.budget ? "border-red-300" : "border-gray-200"} bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition`}
              />
              {errors.budget && <p className="mt-1 text-xs text-red-600">{errors.budget}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project details *</label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                rows={5}
                required
                placeholder="Goals, integrations, features, preferred CMS, deadline..."
                className={`w-full px-4 py-3 rounded-lg border ${errors.details ? "border-red-300" : "border-gray-200"} bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition resize-none`}
              />
              {errors.details && <p className="mt-1 text-xs text-red-600">{errors.details}</p>}
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow"
              >
                {loading ? "Submitting..." : "Submit project"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setFormData({ name: "", email: "", phone: "", projectType: "", details: "", budget: "" });
                  setErrors({});
                }}
                className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
              >
                Reset
              </button>
            </div>

            <div className="text-xs text-gray-400">
              By submitting you agree to our <span className="text-indigo-600">privacy policy</span>.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
