// in components/__tests__/NoteCard.test.tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NoteCard } from '../note-card';
import { deleteNote, updateNote } from '@/app/actions'; // This is now the MOCK

// 1. Create a fake note to pass as a prop
const mockNote = {
  id: 'note-123',
  title: 'Test Title',
  content: 'Test content...',
  createdAt: new Date(),
};

// 2. Clear the mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
});

describe('NoteCard', () => {
  it('should render the note in view mode', () => {
    render(<NoteCard note={mockNote} />);

    // Check that the title and content are visible
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test content...')).toBeInTheDocument();

    // Check that the "Edit" and "Delete" buttons are there
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('should switch to edit mode when "Edit" is clicked', async () => {
    render(<NoteCard note={mockNote} />);

    // 1. Click the "Edit" button
    await fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    // 2. Assert that the "view" mode is gone
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();

    // 3. Assert that the inputs are visible and have the right values
    expect(screen.getByDisplayValue('Test Title')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test content...')).toBeInTheDocument();
  });

  it('should call the deleteNote action when "Delete" is clicked', async () => {
    render(<NoteCard note={mockNote} />);

    // 1. Click the "Delete" button
    await fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    // 2. Assert that our MOCK deleteNote function was called
    expect(deleteNote).toHaveBeenCalledOnce();
    expect(deleteNote).toHaveBeenCalledWith('note-123'); // Check that it was called with the right ID
  });
});