"use client";

import { useState } from "react";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    company: "",
    source: "Google",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setSuccess("Lead submitted successfully!");
      setFormData({
        full_name: "",
        email: "",
        company: "",
        source: "Google",
        message: "",
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white shadow-2xl">
      <div className="rounded-t-2xl bg-[#24395E] px-8 py-10 text-center">
        <h1 className="text-5xl font-black tracking-tight text-white">
          Secco<span className="text-[#F84A13]">²</span>
        </h1>
        <p className="mt-3 text-sm font-medium uppercase tracking-[0.25em] text-white/70">
          Lead Capture
        </p>
      </div>

      <div className="px-8 py-8">
        <p className="mb-8 text-sm text-gray-500">
          Fields marked with <span className="text-[#F84A13]">*</span> are required.
        </p>

        {success && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <section>
            <h2 className="mb-5 border-b border-gray-200 pb-3 text-xl font-semibold text-[#24395E]">
              General
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#24395E]">
                  Full Name <span className="text-[#F84A13]">*</span>
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-[#F84A13] focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#24395E]">
                  Email <span className="text-[#F84A13]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-[#F84A13] focus:ring-2 focus:ring-orange-100"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-5 border-b border-gray-200 pb-3 text-xl font-semibold text-[#24395E]">
              Company
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#24395E]">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-[#F84A13] focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#24395E]">
                  How did you hear about us? <span className="text-[#F84A13]">*</span>
                </label>
                <select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-[#F84A13] focus:ring-2 focus:ring-orange-100"
                >
                  <option>Google</option>
                  <option>Referral</option>
                  <option>Social</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-5 border-b border-gray-200 pb-3 text-xl font-semibold text-[#24395E]">
              Message
            </h2>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Write a short message..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-[#F84A13] focus:ring-2 focus:ring-orange-100"
            />
          </section>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#F84A13] px-6 py-4 text-base font-bold uppercase tracking-wide text-white transition hover:bg-[#d83d0d] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Submitting..." : "Submit Lead"}
          </button>
        </form>
      </div>
    </div>
  );
}