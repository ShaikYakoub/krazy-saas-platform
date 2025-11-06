import { vi } from 'vitest';

// --- ADD THIS MOCK ---
// This intercepts any call to '@/auth' and returns a fake session
vi.mock('@/auth', () => ({
  auth: vi.fn(async () => ({
    user: {
      id: 'mock-user-id-123',
      name: 'Mock User',
      email: 'mock@user.com',
    },
  })),
}));
// --- END NEW MOCK ---

// These lines should already be here:
vi.mock('@/app/actions');
import '@testing-library/jest-dom';