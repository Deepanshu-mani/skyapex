"use client";
import { useState } from "react";

export default function SaleDeedForm() {
  const [form, setForm] = useState({
    name: "",
    father_name: "",
    property_size: "",
    sale_amount: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/pdf-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("PDF generation failed:", errorText);
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `SaleDeed-${Date.now()}.pdf`;
      link.click();
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className={`${
        theme === "dark" ? "bg-black/80 text-white" : "bg-white text-black"
      } p-8 rounded shadow-md w-full max-w-md mx-auto mt-10`}
    >
      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={`text-sm px-3 py-1 rounded border ${
            theme === "dark"
              ? "border-white/40 hover:bg-white/10"
              : "border-black/30 hover:bg-black/10"
          } transition`}
        >
          {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
      </div>
      <h2 className="text-2xl font-semibold mb-6 text-center justify-center mx-auto">
        Sale Deed Generator
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 space-y-4">
        {["name", "father_name", "property_size", "sale_amount", "date"].map(
          (field) => (
            <input
              key={field}
              name={field}
              type={field === "date" ? "date" : "text"}
              placeholder={field.replace("_", " ")}
              onChange={handleChange}
              required
              max={
                field === "date"
                  ? new Date().toISOString().split("T")[0]
                  : undefined
              }
              className={`${
                theme === "dark"
                  ? "bg-black/50 border border-white/20 text-white placeholder-gray-400"
                  : "bg-gray-100 border border-gray-300 text-black placeholder-gray-500"
              } rounded px-4 py-2 w-full`}
            />
          )
        )}
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-3xl font-semibold w-full transition-all ease-in-out duration-200 ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-95 cursor-pointer"
          }`}
        >
          {loading ? "Generating..." : "Generate PDF"}
        </button>
      </form>
    </div>
  );
}
