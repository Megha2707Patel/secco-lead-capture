import { createClient } from "@supabase/supabase-js";
import Navbar from "@/components/Navbar";

export default async function LeadsPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: leads, error } = await supabase
    .from("leads")
    .select("id, full_name, email, company, source, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching leads:", error.message);
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#ECECEC] px-4 py-10">
        {/* Page Container */}
        <div className="mx-auto max-w-7xl">

          {/* Header Card */}
          <div className="mb-8 rounded-3xl bg-[#24395E] p-8 shadow-xl">
            <h1 className="text-4xl font-black text-white">
              Submitted Leads
            </h1>

            <p className="mt-2 text-white/70">
              All captured leads sorted by most recent submissions.
            </p>
          </div>

          {/* Table Card */}
          <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-xl">

            {/* Table Header */}
            <div className="border-b border-black/5 bg-[#F84A13] px-6 py-4">
              <h2 className="text-xl font-bold text-black">
                Lead Database
              </h2>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse">

                {/* Table Head */}
                <thead>
                  <tr className="bg-[#24395E] text-left text-white">

                    <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">
                      Name
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">
                      Email
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">
                      Company
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">
                      Source
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">
                      Submitted Date
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {leads?.map((lead, index) => (
                    <tr
                      key={lead.id}
                      className={`transition hover:bg-orange-50 ${
                        index % 2 === 0
                          ? "bg-white"
                          : "bg-[#F8F8F8]"
                      }`}
                    >
                      <td className="px-6 py-5 font-medium text-[#24395E]">
                        {lead.full_name}
                      </td>

                      <td className="px-6 py-5 text-gray-700">
                        {lead.email}
                      </td>

                      <td className="px-6 py-5 text-gray-700">
                        {lead.company || "-"}
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-full bg-[#F84A13]/10 px-3 py-1 text-sm font-semibold text-[#F84A13]">
                          {lead.source}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-gray-600">
                        {new Date(
                          lead.created_at
                        ).toLocaleString()}
                      </td>
                    </tr>
                  ))}

                  {/* Empty State */}
                  {(!leads || leads.length === 0) && (
                    <tr>
                      <td
                        className="px-6 py-10 text-center text-lg text-gray-500"
                        colSpan={5}
                      >
                        No leads submitted yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}