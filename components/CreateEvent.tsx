"use client";

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'


type EventMode = "online" | "offline" | "hybrid";

type EventFormState= {
  title: string;
  description: string;
  overview: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: EventMode;
  audience: string;
  organizer: string;
  tagsText: string;
  agendaText: string;
}


const CreateEvent = () => {

  const [state, setState] = useState<EventFormState>({
    title: "",
    description: "",
    overview: "",
    venue: "",
    location: "",
    date: "",
    time: "",
    mode: "hybrid",
    audience: "",
    organizer: "",
    tagsText: "",
    agendaText: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const name = e.target.name as keyof EventFormState;
    const value = e.target.value;
    setState((prev) => ({ ...prev, [name]: value } as unknown as EventFormState));

  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files?.[0] ?? null);
  };

  const resetForm = () => {
    setState({
      title: "",
      description: "",
      overview: "",
      venue: "",
      location: "",
      date: "",
      time: "",
      mode: "hybrid",
      audience: "",
      organizer: "",
      tagsText: "",
      agendaText: "",
    });
    setImageFile(null);
    setError(null);
    setSuccess(null);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
          // Convert text inputs into arrays
    const tagsArray = state.tagsText
      .split(",")
      .map(t => t.trim())
      .filter(Boolean);

    const agendaArray = state.agendaText
      .split(/\r?\n/) // split on newlines (supports CRLF and LF)
      .map(a => a.trim())
      .filter(Boolean);

    const formData = new FormData();
    formData.append("title", state.title);
    formData.append("description", state.description);
    formData.append("overview", state.overview);
    formData.append("venue", state.venue);
    formData.append("location", state.location);
    formData.append("date", state.date);
    formData.append("time", state.time);
    formData.append("mode", state.mode);
    formData.append("audience", state.audience);
    formData.append("organizer", state.organizer);
    formData.append("tags", JSON.stringify(tagsArray));
    formData.append("agenda", JSON.stringify(agendaArray));
    if (imageFile) formData.append("image", imageFile);

      const res = await fetch("/api/events", { method: "POST", body: formData });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(json?.error || json?.message || "Request failed");

      // show success then reset form and navigate to events list
      setSuccess(json?.message || "Event created successfully");
      resetForm();
      setTimeout(() => {
        router.push('/events');
      }, 1200);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="booking">
      <form onSubmit={handleSubmit} className="signup-card max-w-xl mx-auto glass p-8 card-shadow">
        <h2 className="text-center mb-4 text-xl font-semibold">Create Event</h2>
        {success && <div className="p-3 bg-green-50 text-green-700 rounded mb-2">{success}</div>}
        {error && <div className="p-3 bg-red-50 text-red-700 rounded">{error}</div>}

        <input 
          required
          name="title"
          value={state.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded border-neutral-700 mb-2"
        />

        <textarea 
          name="description" 
          required
          value={state.description}
          onChange={handleChange}
          placeholder="Description..."
          className="w-full border border-neutral-700 rounded mb-2 p-2"
        />

        <textarea 
          name="overview" 
          required
          value={state.overview} 
          onChange={handleChange} 
          placeholder="Overview..." 
          className="w-full border border-neutral-700 mb-2 p-2 rounded" 
        />


        <div className="grid grid-cols-2 gap-3 mb-2">
          <input 
            name="venue" 
            required
            value={state.venue} 
            onChange={handleChange} 
            placeholder="Venue" 
            className="border p-2 rounded border-neutral-700" 
          />

          <input 
            name="location" 
            required
            value={state.location} 
            onChange={handleChange} 
            placeholder="Location" 
            className="border p-2 rounded border-neutral-700" 
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-2">
          <input 
            type="date" 
            name="date" 
            required
            value={state.date} 
            onChange={handleChange} 
            className="border p-2 rounded border-neutral-700" 
          />

          <input 
            type="time" 
            name="time" 
            required
            value={state.time} 
            onChange={handleChange} 
            className="border p-2 rounded border-neutral-700" 
          />
        </div>

        <select name="mode" value={state.mode} onChange={handleChange} className="w-full p-2 border rounded border-neutral-700 mb-2">
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="hybrid">Hybrid</option>
        </select>

        <input 
          name="audience"
          required
          value={state.audience}
          onChange={handleChange}
          placeholder="Audience"
          className="w-full border p-2 rounded border-neutral-700 mb-2"
        />

        <input 
          name="organizer"
          required
          value={state.organizer}
          onChange={handleChange}
          placeholder="Organizer"
          className="w-full border border-neutral-700 p-2 rounded mb-2" 
        />

        <input 
          name="tagsText" 
          required
          value={state.tagsText} 
          onChange={handleChange} 
          placeholder="Tags" 
          className="w-full border p-2 rounded border-neutral-700 mb-2" 
        />

        <textarea 
          name="agendaText" 
          required
          value={state.agendaText} 
          onChange={handleChange} 
          placeholder="Agenda" 
          className="w-full border p-2 rounded border-neutral-700 mb-2" 
        />

        <div className="mb-2 cursor-pointer">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange}
          />
        </div>

        <div className="w-full flex justify-center items-center">
          <button 
            type="submit" 
            disabled={loading} 
            className="px-4 py-2 bg-blue text-white font-semibold cursor-pointer rounded"
          >
          {loading ? "Creating..." : "Create Event"}
        </button>
        </div>
      </form>
    </div>
  )
}

export default CreateEvent
