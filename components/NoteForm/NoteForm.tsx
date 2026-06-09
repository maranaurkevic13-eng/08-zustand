"use client";
import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";
import { createNote } from "@/lib/api";
import { NoteTag } from "@/types/note";

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createNote(draft);
    clearDraft();
    router.push("/notes/filter/all");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        defaultValue={draft.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDraft({ ...draft, title: e.target.value })
        }
      />
      <textarea
        name="content"
        defaultValue={draft.content}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setDraft({ ...draft, content: e.target.value })
        }
      />
      <select
        name="tag"
        defaultValue={draft.tag}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setDraft({ ...draft, tag: e.target.value as NoteTag })
        }
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
      <button type="submit">Save</button>
      <button type="button" onClick={() => router.back()}>
        Cancel
      </button>
    </form>
  );
}

