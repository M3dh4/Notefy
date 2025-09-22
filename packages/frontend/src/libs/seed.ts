import { listNotes, createNote } from "./localNotes";

const SEED_KEY = "notefy.seeded";

export const seedIfEmpty = async () => {
  try {
    const seeded = localStorage.getItem(SEED_KEY);
    if (seeded) return;
    const notes = await listNotes();
    if (notes.length > 0) return;
    await createNote("Welcome to Notefy! Create, edit and attach files to your notes.");
    await createNote("Tip: You can upload images, PDFs and docs as attachments.");
    localStorage.setItem(SEED_KEY, "true");
  } catch {}
};


