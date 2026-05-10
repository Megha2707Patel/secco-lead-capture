import LeadForm from "@/components/LeadForm";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <LeadForm />
      </main>
    </>
  );
}