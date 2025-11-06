// in components/note-card.tsx
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { deleteNote, updateNote } from '@/app/actions'; // Import your actions

// Define the shape of the note prop
interface NoteCardProps {
  note: {
    id: string;
    title: string;
    content: string | null;
    createdAt: Date;
  };
}

export function NoteCard({ note }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content || '');

  const handleUpdate = async () => {
    await updateNote(note.id, title, content);
    setIsEditing(false);
  };

  return (
    <Card>
      {isEditing ? (
        // --- EDITING STATE ---
        <div className="p-4 space-y-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
          />
          <div className="flex gap-2">
            <Button onClick={handleUpdate}>Save</Button>
            <Button variant="ghost" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        // --- VIEWING STATE ---
        <>
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{note.content || '...'}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-gray-500">
              {note.createdAt.toLocaleDateString()}
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
              {/* This form calls the deleteNote action */}
              <form action={() => deleteNote(note.id)}>
                <Button type="submit" variant="destructive">
                  Delete
                </Button>
              </form>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
}