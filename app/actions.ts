// in app/actions.ts
'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createNote() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  const userId = session.user.id;

  // Get the user and their note count in one query
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      _count: { // This special field counts related models
        select: { notes: true }
      }
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  // --- THIS IS THE "PRO" LOGIC ---
  const isPro = !!user.razorpaySubscriptionId; // Check if they are subscribed
  const noteCount = user._count.notes;

  if (!isPro && noteCount >= 3) {
    // They are a free user and at their limit
    throw new Error('Free plan limit reached. Subscribe to Pro for unlimited notes.');
  }

  // If they are Pro, OR they are free and under the limit, create the note.
  await prisma.note.create({
    data: {
      title: 'New Note',
      content: 'Click to edit...',
      userId: userId,
    },
  });

  // Refresh the dashboard to show the new note
  revalidatePath('/dashboard');
}

export async function deleteNote(noteId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  // Ensure the user is deleting THEIR OWN note
  const note = await prisma.note.findUnique({
    where: { id: noteId },
  });

  if (!note || note.userId !== session.user.id) {
    throw new Error('Not authorized');
  }

  // Delete the note
  await prisma.note.delete({
    where: { id: noteId },
  });

  revalidatePath('/dashboard');
}

export async function updateNote(noteId: string, newTitle: string, newContent: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  const note = await prisma.note.findUnique({
    where: { id: noteId },
  });

  if (!note || note.userId !== session.user.id) {
    throw new Error('Not authorized');
  }

  // Update the note
  await prisma.note.update({
    where: { id: noteId },
    data: {
      title: newTitle,
      content: newContent,
    },
  });

  revalidatePath('/dashboard');
}