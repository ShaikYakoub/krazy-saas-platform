// in __mocks__/app/actions.ts
import { vi } from 'vitest';

export const deleteNote = vi.fn();
export const updateNote = vi.fn();
export const createNote = vi.fn(); // We're not using this one, but good to have