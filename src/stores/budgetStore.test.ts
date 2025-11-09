/**
 * Budget Store Tests
 * Critical Path: Budget CRUD operations with RLS
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useBudgetStore } from './budgetStore';
import { supabase } from '../lib/supabase';

// Mock Supabase
vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
    },
    from: vi.fn(),
  },
}));

// Mock logger
vi.mock('../utils/logger', () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  },
}));

const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com',
};

const mockBudgets = [
  {
    id: 'budget-1',
    user_id: 'test-user-id',
    category: 'Food & Dining',
    amount: 500,
    period: 'monthly',
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'budget-2',
    user_id: 'test-user-id',
    category: 'Transportation',
    amount: 200,
    period: 'monthly',
    created_at: '2025-01-01T00:00:00Z',
  },
];

function createMockSupabaseChain(data: any, error: any = null) {
  const mockChain = {
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data, error }),
  };

  // For queries without single()
  mockChain.eq = vi.fn().mockResolvedValue({ data, error });
  mockChain.select = vi.fn().mockReturnValue(mockChain);
  mockChain.insert = vi.fn().mockReturnValue(mockChain);
  mockChain.update = vi.fn().mockReturnValue(mockChain);
  mockChain.delete = vi.fn().mockReturnValue(mockChain);

  return mockChain;
}

describe('Budget Store', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock authenticated user
    (supabase.auth.getUser as any).mockResolvedValue({
      data: { user: mockUser },
    });

    // Reset store
    const { result } = renderHook(() => useBudgetStore());
    act(() => {
      result.current.budgets = [];
    });
  });

  describe('fetchBudgets', () => {
    it('should fetch budgets for authenticated user', async () => {
      const mockChain = createMockSupabaseChain(mockBudgets);
      (supabase.from as any).mockReturnValue(mockChain);

      const { result } = renderHook(() => useBudgetStore());

      await act(async () => {
        await result.current.fetchBudgets();
      });

      expect(supabase.from).toHaveBeenCalledWith('budgets');
      expect(mockChain.select).toHaveBeenCalledWith('*');
      expect(mockChain.eq).toHaveBeenCalledWith('user_id', mockUser.id);
      expect(result.current.budgets).toEqual(mockBudgets);
    });

    it('should throw error when user is not authenticated', async () => {
      (supabase.auth.getUser as any).mockResolvedValue({
        data: { user: null },
      });

      const { result } = renderHook(() => useBudgetStore());

      await expect(async () => {
        await act(async () => {
          await result.current.fetchBudgets();
        });
      }).rejects.toThrow('User not authenticated');
    });

    it('should handle fetch errors gracefully', async () => {
      const mockError = new Error('Database error');
      const mockChain = createMockSupabaseChain(null, mockError);
      (supabase.from as any).mockReturnValue(mockChain);

      const { result } = renderHook(() => useBudgetStore());

      await expect(async () => {
        await act(async () => {
          await result.current.fetchBudgets();
        });
      }).rejects.toThrow('Database error');
    });
  });

  describe('addBudget', () => {
    it('should add a new budget', async () => {
      const newBudget = {
        category: 'Entertainment',
        amount: 150,
        period: 'monthly' as const,
      };

      const createdBudget = {
        ...newBudget,
        id: 'budget-3',
        user_id: mockUser.id,
        created_at: new Date().toISOString(),
      };

      const mockChain = createMockSupabaseChain([createdBudget]);
      (supabase.from as any).mockReturnValue(mockChain);

      const { result } = renderHook(() => useBudgetStore());

      await act(async () => {
        await result.current.addBudget(newBudget);
      });

      expect(supabase.from).toHaveBeenCalledWith('budgets');
      expect(mockChain.insert).toHaveBeenCalledWith([
        {
          ...newBudget,
          user_id: mockUser.id,
        },
      ]);
      expect(mockChain.select).toHaveBeenCalled();
    });

    it('should require authentication to add budget', async () => {
      (supabase.auth.getUser as any).mockResolvedValue({
        data: { user: null },
      });

      const { result } = renderHook(() => useBudgetStore());

      await expect(async () => {
        await act(async () => {
          await result.current.addBudget({
            category: 'Test',
            amount: 100,
            period: 'monthly',
          });
        });
      }).rejects.toThrow('User not authenticated');
    });
  });

  describe('updateBudget', () => {
    it('should update an existing budget', async () => {
      const updatedBudget = {
        ...mockBudgets[0],
        amount: 600,
      };

      const mockChain = createMockSupabaseChain([updatedBudget]);
      (supabase.from as any).mockReturnValue(mockChain);

      const { result } = renderHook(() => useBudgetStore());

      // Set initial budgets
      act(() => {
        result.current.budgets = mockBudgets;
      });

      await act(async () => {
        await result.current.updateBudget('budget-1', { amount: 600 });
      });

      expect(supabase.from).toHaveBeenCalledWith('budgets');
      expect(mockChain.update).toHaveBeenCalledWith({ amount: 600 });
      expect(mockChain.eq).toHaveBeenCalledWith('id', 'budget-1');
    });
  });

  describe('deleteBudget', () => {
    it('should delete a budget', async () => {
      const mockChain = createMockSupabaseChain(null);
      (supabase.from as any).mockReturnValue(mockChain);

      const { result } = renderHook(() => useBudgetStore());

      // Set initial budgets
      act(() => {
        result.current.budgets = mockBudgets;
      });

      await act(async () => {
        await result.current.deleteBudget('budget-1');
      });

      expect(supabase.from).toHaveBeenCalledWith('budgets');
      expect(mockChain.delete).toHaveBeenCalled();
      expect(mockChain.eq).toHaveBeenCalledWith('id', 'budget-1');

      // Budget should be removed from store
      expect(result.current.budgets.find(b => b.id === 'budget-1')).toBeUndefined();
    });

    it('should require authentication to delete budget', async () => {
      (supabase.auth.getUser as any).mockResolvedValue({
        data: { user: null },
      });

      const { result } = renderHook(() => useBudgetStore());

      await expect(async () => {
        await act(async () => {
          await result.current.deleteBudget('budget-1');
        });
      }).rejects.toThrow('User not authenticated');
    });
  });

  describe('RLS Security', () => {
    it('should only fetch budgets for the authenticated user', async () => {
      const mockChain = createMockSupabaseChain(mockBudgets);
      (supabase.from as any).mockReturnValue(mockChain);

      const { result } = renderHook(() => useBudgetStore());

      await act(async () => {
        await result.current.fetchBudgets();
      });

      // Verify RLS is enforced by checking user_id filter
      expect(mockChain.eq).toHaveBeenCalledWith('user_id', mockUser.id);
    });

    it('should include user_id when creating budget', async () => {
      const newBudget = {
        category: 'Test',
        amount: 100,
        period: 'monthly' as const,
      };

      const mockChain = createMockSupabaseChain([
        { ...newBudget, id: 'new-id', user_id: mockUser.id },
      ]);
      (supabase.from as any).mockReturnValue(mockChain);

      const { result } = renderHook(() => useBudgetStore());

      await act(async () => {
        await result.current.addBudget(newBudget);
      });

      // Verify user_id is included in insert
      expect(mockChain.insert).toHaveBeenCalledWith([
        {
          ...newBudget,
          user_id: mockUser.id,
        },
      ]);
    });
  });
});
