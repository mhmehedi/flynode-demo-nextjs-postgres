import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

// Read the database on every request, never while building.
export const dynamic = "force-dynamic";

async function addNote(formData: FormData) {
  "use server";
  const text = String(formData.get("text") ?? "").trim();
  if (text) await db.note.create({ data: { text } });
  revalidatePath("/");
}

export default async function Home() {
  const notes = await db.note.findMany({ orderBy: { id: "desc" }, take: 20 });
  return (
    <main>
      <h1>Notes on FlyNode</h1>
      <p>A Next.js app with a PostgreSQL database. Each note below is a row in the database.</p>
      <form action={addNote} style={{ display: "flex", gap: 8 }}>
        <input name="text" placeholder="Write a note" required style={{ flex: 1, padding: 8 }} />
        <button type="submit" style={{ padding: "8px 14px" }}>Add</button>
      </form>
      <ul>
        {notes.map((n) => (
          <li key={n.id}>{n.text}</li>
        ))}
      </ul>
      {notes.length === 0 && <p>No notes yet.</p>}
    </main>
  );
}
