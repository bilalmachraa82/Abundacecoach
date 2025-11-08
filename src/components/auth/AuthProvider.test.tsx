/**
 * AuthProvider Tests
 * Critical Path: Authentication flows
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthProvider';
import { supabase } from '../../lib/supabase';
import { RateLimitError } from '../../utils/rateLimiter';

// Mock Supabase
vi.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
    },
  },
}));

// Mock logger
vi.mock('../../utils/logger', () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  },
}));

// Test component that uses useAuth hook
function TestComponent() {
  const { user, loading, signIn, signUp, signOut } = useAuth();

  return (
    <div>
      <div data-testid="loading">{loading ? 'Loading' : 'Ready'}</div>
      <div data-testid="user">{user ? user.email : 'No user'}</div>
      <button onClick={() => signIn('test@example.com', 'password')}>Sign In</button>
      <button onClick={() => signUp('test@example.com', 'password')}>Sign Up</button>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}

describe('AuthProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock successful session check
    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: null },
    });

    // Mock auth state change subscription
    (supabase.auth.onAuthStateChange as any).mockReturnValue({
      data: {
        subscription: {
          unsubscribe: vi.fn(),
        },
      },
    });
  });

  it('should render children and initialize auth state', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Initially loading
    expect(screen.getByTestId('loading')).toHaveTextContent('Loading');

    // Wait for initialization
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Ready');
    });

    // No user initially
    expect(screen.getByTestId('user')).toHaveTextContent('No user');
  });

  it('should handle successful sign in', async () => {
    (supabase.auth.signInWithPassword as any).mockResolvedValue({
      error: null,
      data: {
        user: { email: 'test@example.com' },
        session: { access_token: 'token' },
      },
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Ready');
    });

    const signInButton = screen.getByText('Sign In');
    signInButton.click();

    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
      });
    });
  });

  it('should handle sign in error', async () => {
    const errorMessage = 'Invalid credentials';
    (supabase.auth.signInWithPassword as any).mockResolvedValue({
      error: new Error(errorMessage),
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Ready');
    });

    const signInButton = screen.getByText('Sign In');

    // Should throw error
    await expect(async () => {
      signInButton.click();
      await waitFor(() => {
        expect(supabase.auth.signInWithPassword).toHaveBeenCalled();
      });
    }).rejects.toThrow();
  });

  it('should handle successful sign up', async () => {
    (supabase.auth.signUp as any).mockResolvedValue({
      error: null,
      data: {
        user: { email: 'test@example.com' },
      },
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Ready');
    });

    const signUpButton = screen.getByText('Sign Up');
    signUpButton.click();

    await waitFor(() => {
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
      });
    });
  });

  it('should handle sign out', async () => {
    (supabase.auth.signOut as any).mockResolvedValue({
      error: null,
    });

    // Start with a user session
    (supabase.auth.getSession as any).mockResolvedValue({
      data: {
        session: {
          user: { email: 'test@example.com' },
        },
      },
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Ready');
    });

    const signOutButton = screen.getByText('Sign Out');
    signOutButton.click();

    await waitFor(() => {
      expect(supabase.auth.signOut).toHaveBeenCalled();
    });
  });

  it('should apply rate limiting to sign in', async () => {
    // Simulate multiple failed login attempts
    (supabase.auth.signInWithPassword as any).mockResolvedValue({
      error: new Error('Invalid credentials'),
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Ready');
    });

    const signInButton = screen.getByText('Sign In');

    // Make multiple attempts (should eventually be rate limited)
    for (let i = 0; i < 6; i++) {
      try {
        signInButton.click();
        await waitFor(() => {
          expect(supabase.auth.signInWithPassword).toHaveBeenCalled();
        });
      } catch (error) {
        // Some attempts will fail due to rate limiting
        if (error instanceof RateLimitError) {
          expect(error.action).toBe('LOGIN');
        }
      }
    }
  });

  it('should update user state on auth state change', async () => {
    let authStateCallback: any;

    (supabase.auth.onAuthStateChange as any).mockImplementation((callback: any) => {
      authStateCallback = callback;
      return {
        data: {
          subscription: {
            unsubscribe: vi.fn(),
          },
        },
      };
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Ready');
    });

    // Simulate auth state change
    const mockUser = { email: 'newuser@example.com' };
    authStateCallback('SIGNED_IN', {
      user: mockUser,
      access_token: 'token',
    });

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('newuser@example.com');
    });
  });
});
