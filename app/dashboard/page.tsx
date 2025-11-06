// in app/dashboard/page.tsx
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { createNote } from '@/app/actions'; // <-- Import the action
import { SignOutButton } from '@/components/sign-out-button';
import { SubscribeButton } from '@/components/subscribe-button';
import { NoteCard } from '@/components/note-card';
import { Button } from '@/components/ui/button'; // <-- Import the button
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) return <div>Not logged in</div>;

  // 1. Fetch all data for the dashboard in one go
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      notes: { // Get all the user's notes
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!user) return <div>User not found</div>;

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-4 md:p-12">

      {/* Header Card */}
      <Card className="w-full max-w-3xl">
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>Welcome, {user.name}</CardDescription>
          </div>
          <SignOutButton />
        </CardHeader>
        <CardContent>
          <SubscribeButton /> {/* The button knows its own state */}
        </CardContent>
      </Card>

      {/* Notes Section */}
      <div className="mt-8 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Notes</h2>
          {/*
            This form calls the Server Action.
            It's a component, but it works inside a Server Component.
          */}
          <form action={createNote}>
            <Button type="submit">Create New Note</Button>
          </form>
        </div>

        {/* Grid for Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.notes.map((note) => (
            <NoteCard key={note.id} note={note} />
            ))}

          {user.notes.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              You have no notes. Create one to get started!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}