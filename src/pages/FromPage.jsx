import { useState } from "react";
import axios from "axios";

function FromPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    details: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://form-backend-production-3944.up.railway.app/api/form", formData);
      setSubmitted(true);
    } catch (err) {
      console.error("Submit error:", err);
      const msg =
        err.response?.data?.error || err.message || "Something went wrong";
      alert(msg);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111827] to-[#1e1b4b] px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 shadow-2xl text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-600/20 mb-4">
              <svg
                className="w-8 h-8 text-green-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-light text-white mb-2">Thank You!</h1>
            <p className="text-gray-400 mb-6">
              Your form has been submitted successfully. We’ll contact you soon.
            </p>
            <a
              href="https://wa.me/9315868930?text=Hi%20I%20just%20submitted%20my%20project%20form"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-light hover:bg-green-700 hover:shadow-lg hover:scale-105 transition duration-200"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111827] to-[#1e1b4b] px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-10">
        <h1 className="text-4xl  text-white mb-8 font-light text-center">
          Client Project Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 text-gray-200">
          {/* Name */}
          <div>
            <label className="block font-medium mb-2">Name</label>
            <input
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-2">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium mb-2">Phone</label>
            <input
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Project Type */}
          <div>
            <label className="block font-medium mb-2">Project Type</label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <option value="" className="text-gray-800">
                -- Select Project Type --
              </option>
              <option value="Portfolio Website" className="text-gray-800">
                Portfolio Website
              </option>
              <option value="Business Website" className="text-gray-800">
                Business Website
              </option>
              <option value="Ecommerce Website" className="text-gray-800">
                Ecommerce Website
              </option>
              <option
                value="Coaching Institute Website"
                className="text-gray-800"
              >
                Coaching Institute Website
              </option>
              <option value="Static Website" className="text-gray-800">
                Static Website
              </option>
              <option value="WhatsApp Chat Bot" className="text-gray-800">
                WhatsApp Chat Bot
              </option>
              <option value="Other" className="text-gray-800">
                Other
              </option>
            </select>
          </div>

          {/* Details */}
          <div>
            <label className="block font-medium mb-2">Project Details</label>
            <textarea
              name="details"
              placeholder="Write your project details here..."
              value={formData.details}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-10 py-3 rounded-full shadow-xl hover:bg-indigo-700 hover:scale-105 hover:shadow-indigo-500/20 transition duration-200"
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FromPage;
