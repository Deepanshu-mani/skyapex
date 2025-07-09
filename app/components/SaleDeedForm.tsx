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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/pdf-generator", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `SaleDeed-${Date.now()}.pdf`;
    link.click();
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex border-2 p-4  flex-col gap-4 max-w-md">
        {["name", "father_name", "property_size", "sale_amount", "date"].map(
          (field) => (
            <input
              key={field}
              name={field}
              type={field === "date" ? "date" : "text"}
              placeholder={field.replace('_',' ')}
              onChange={handleChange}
              required
              max={field === "date" ? new Date().toISOString().split("T")[0] : undefined}
            />
          )
        )}
        <button type="submit" className="bg-blue-500 text-white py-2 rounded-2xl">Genrate PDF</button>
      </form>
    </div>
  );
}
