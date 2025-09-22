
export interface LocalNote {
  noteId: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  attachments?: LocalAttachment[];
}

export interface LocalAttachment {
  id: string;
  name: string;
  type: string;
  dataUrl: string; // base64 data URL stored locally
}

const STORAGE_KEY = "notefy.notes";

const generateId = (): string => {
  const random = Math.random().toString(36).slice(2, 10);
  return `${Date.now().toString(36)}-${random}`;
};

const readAll = (): LocalNote[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as LocalNote[];
  } catch {
    return [];
  }
};

const writeAll = (notes: LocalNote[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};

export const listNotes = async (): Promise<LocalNote[]> => {
  return readAll().sort((a, b) => parseInt(b.updatedAt) - parseInt(a.updatedAt));
};

export const getNote = async (noteId: string): Promise<LocalNote | undefined> => {
  return readAll().find((n) => n.noteId === noteId);
};

export const createNote = async (content: string, attachments?: LocalAttachment[]): Promise<LocalNote> => {
  const now = Date.now().toString();
  const note: LocalNote = {
    noteId: generateId(),
    createdAt: now,
    updatedAt: now,
    content,
    attachments: attachments || [],
  };
  const notes = readAll();
  notes.unshift(note);
  writeAll(notes);
  return note;
};

export const updateNote = async (noteId: string, content: string, attachments?: LocalAttachment[]): Promise<LocalNote | undefined> => {
  const notes = readAll();
  const index = notes.findIndex((n) => n.noteId === noteId);
  if (index === -1) return undefined;
  const updated: LocalNote = { ...notes[index], content, updatedAt: Date.now().toString(), attachments: attachments ?? notes[index].attachments };
  notes[index] = updated;
  writeAll(notes);
  return updated;
};

export const deleteNote = async (noteId: string): Promise<boolean> => {
  const notes = readAll();
  const filtered = notes.filter((n) => n.noteId !== noteId);
  writeAll(filtered);
  return filtered.length !== notes.length;
};


