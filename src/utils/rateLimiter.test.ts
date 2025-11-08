/**
 * Rate Limiter Tests
 * Critical Path: Security - prevent brute force attacks
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { rateLimiter, RateLimitError, withRateLimit, RATE_LIMITS } from './rateLimiter';

describe('RateLimiter', () => {
  beforeEach(() => {
    rateLimiter.clear();
  });

  describe('isAllowed', () => {
    it('should allow requests within rate limit', () => {
      rateLimiter.register('TEST', {
        maxAttempts: 5,
        windowMs: 60000,
        blockDurationMs: 60000,
      });

      expect(rateLimiter.isAllowed('TEST', 'user1')).toBe(true);
    });

    it('should block requests after exceeding rate limit', () => {
      rateLimiter.register('TEST', {
        maxAttempts: 3,
        windowMs: 60000,
        blockDurationMs: 60000,
      });

      // Make 3 attempts
      for (let i = 0; i < 3; i++) {
        rateLimiter.recordAttempt('TEST', 'user1');
      }

      // 4th attempt should be blocked
      expect(rateLimiter.isAllowed('TEST', 'user1')).toBe(false);
    });

    it('should reset after time window expires', async () => {
      rateLimiter.register('TEST', {
        maxAttempts: 2,
        windowMs: 100, // 100ms window
        blockDurationMs: 100,
      });

      // Make 2 attempts
      rateLimiter.recordAttempt('TEST', 'user1');
      rateLimiter.recordAttempt('TEST', 'user1');

      // Should be blocked
      expect(rateLimiter.isAllowed('TEST', 'user1')).toBe(false);

      // Wait for window to expire
      await new Promise(resolve => setTimeout(resolve, 150));

      // Should be allowed again
      expect(rateLimiter.isAllowed('TEST', 'user1')).toBe(true);
    });

    it('should track different users separately', () => {
      rateLimiter.register('TEST', {
        maxAttempts: 2,
        windowMs: 60000,
        blockDurationMs: 60000,
      });

      // User 1 makes 2 attempts
      rateLimiter.recordAttempt('TEST', 'user1');
      rateLimiter.recordAttempt('TEST', 'user1');

      // User 1 should be blocked
      expect(rateLimiter.isAllowed('TEST', 'user1')).toBe(false);

      // User 2 should still be allowed
      expect(rateLimiter.isAllowed('TEST', 'user2')).toBe(true);
    });
  });

  describe('recordAttempt', () => {
    it('should increment attempt count', () => {
      rateLimiter.register('TEST', {
        maxAttempts: 5,
        windowMs: 60000,
        blockDurationMs: 60000,
      });

      rateLimiter.recordAttempt('TEST', 'user1');
      expect(rateLimiter.getAttemptCount('TEST', 'user1')).toBe(1);

      rateLimiter.recordAttempt('TEST', 'user1');
      expect(rateLimiter.getAttemptCount('TEST', 'user1')).toBe(2);
    });

    it('should set blocked time after max attempts', () => {
      rateLimiter.register('TEST', {
        maxAttempts: 2,
        windowMs: 60000,
        blockDurationMs: 30000,
      });

      rateLimiter.recordAttempt('TEST', 'user1');
      rateLimiter.recordAttempt('TEST', 'user1');

      const blockedTime = rateLimiter.getBlockedTimeRemaining('TEST', 'user1');
      expect(blockedTime).toBeGreaterThan(0);
      expect(blockedTime).toBeLessThanOrEqual(30);
    });
  });

  describe('reset', () => {
    it('should reset attempts for specific user', () => {
      rateLimiter.register('TEST', {
        maxAttempts: 3,
        windowMs: 60000,
        blockDurationMs: 60000,
      });

      rateLimiter.recordAttempt('TEST', 'user1');
      rateLimiter.recordAttempt('TEST', 'user1');
      expect(rateLimiter.getAttemptCount('TEST', 'user1')).toBe(2);

      rateLimiter.reset('TEST', 'user1');
      expect(rateLimiter.getAttemptCount('TEST', 'user1')).toBe(0);
    });
  });

  describe('withRateLimit', () => {
    it('should execute operation if allowed', async () => {
      rateLimiter.register('TEST', {
        maxAttempts: 5,
        windowMs: 60000,
        blockDurationMs: 60000,
      });

      const operation = vi.fn().mockResolvedValue('success');
      const result = await withRateLimit('TEST', 'user1', operation);

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalled();
    });

    it('should throw RateLimitError if blocked', async () => {
      rateLimiter.register('TEST', {
        maxAttempts: 1,
        windowMs: 60000,
        blockDurationMs: 60000,
      });

      const operation = vi.fn().mockResolvedValue('success');

      // First attempt succeeds
      await withRateLimit('TEST', 'user1', operation);

      // Second attempt should be rate limited
      await expect(async () => {
        await withRateLimit('TEST', 'user1', operation);
      }).rejects.toThrow(RateLimitError);
    });

    it('should reset on successful LOGIN', async () => {
      rateLimiter.register('LOGIN', {
        maxAttempts: 5,
        windowMs: 60000,
        blockDurationMs: 60000,
      });

      const operation = vi.fn().mockResolvedValue('success');

      // Make some failed attempts (in real scenario)
      rateLimiter.recordAttempt('LOGIN', 'user1');
      rateLimiter.recordAttempt('LOGIN', 'user1');
      expect(rateLimiter.getAttemptCount('LOGIN', 'user1')).toBe(2);

      // Successful login should reset
      await withRateLimit('LOGIN', 'user1', operation);
      expect(rateLimiter.getAttemptCount('LOGIN', 'user1')).toBe(0);
    });

    it('should keep attempt count on failure', async () => {
      rateLimiter.register('TEST', {
        maxAttempts: 5,
        windowMs: 60000,
        blockDurationMs: 60000,
      });

      const operation = vi.fn().mockRejectedValue(new Error('Operation failed'));

      try {
        await withRateLimit('TEST', 'user1', operation);
      } catch (error) {
        // Expected to throw
      }

      // Attempt count should still be 1 (not reset)
      expect(rateLimiter.getAttemptCount('TEST', 'user1')).toBe(1);
    });
  });

  describe('Pre-configured Rate Limits', () => {
    it('should have LOGIN rate limit configured', () => {
      expect(rateLimiter.isAllowed('LOGIN', 'test@example.com')).toBe(true);

      // Make 5 attempts (max for LOGIN)
      for (let i = 0; i < 5; i++) {
        rateLimiter.recordAttempt('LOGIN', 'test@example.com');
      }

      // Should be blocked after 5 attempts
      expect(rateLimiter.isAllowed('LOGIN', 'test@example.com')).toBe(false);
    });

    it('should have SIGNUP rate limit configured', () => {
      expect(rateLimiter.isAllowed('SIGNUP', 'test@example.com')).toBe(true);

      // Make 3 attempts (max for SIGNUP)
      for (let i = 0; i < 3; i++) {
        rateLimiter.recordAttempt('SIGNUP', 'test@example.com');
      }

      // Should be blocked after 3 attempts
      expect(rateLimiter.isAllowed('SIGNUP', 'test@example.com')).toBe(false);
    });

    it('should have AI_QUERY rate limit configured', () => {
      expect(rateLimiter.isAllowed('AI_QUERY', 'financial-advice')).toBe(true);

      // Make 20 attempts (max for AI_QUERY)
      for (let i = 0; i < 20; i++) {
        rateLimiter.recordAttempt('AI_QUERY', 'financial-advice');
      }

      // Should be blocked after 20 attempts
      expect(rateLimiter.isAllowed('AI_QUERY', 'financial-advice')).toBe(false);
    });
  });

  describe('RateLimitError', () => {
    it('should contain action and blocked seconds', () => {
      const error = new RateLimitError('LOGIN', 120);

      expect(error.action).toBe('LOGIN');
      expect(error.blockedSeconds).toBe(120);
      expect(error.message).toContain('LOGIN');
      expect(error.message).toContain('120');
    });

    it('should be instance of Error', () => {
      const error = new RateLimitError('TEST', 60);
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('Security Edge Cases', () => {
    it('should handle rapid sequential requests', async () => {
      rateLimiter.register('TEST', {
        maxAttempts: 3,
        windowMs: 60000,
        blockDurationMs: 60000,
      });

      // Simulate rapid requests
      const requests = Array(10)
        .fill(null)
        .map(() => {
          return new Promise(resolve => {
            const allowed = rateLimiter.isAllowed('TEST', 'user1');
            if (allowed) {
              rateLimiter.recordAttempt('TEST', 'user1');
            }
            resolve(allowed);
          });
        });

      const results = await Promise.all(requests);

      // Only first 3 should be allowed
      const allowedCount = results.filter(r => r === true).length;
      expect(allowedCount).toBeLessThanOrEqual(3);
    });

    it('should handle concurrent requests from different users', async () => {
      rateLimiter.register('TEST', {
        maxAttempts: 2,
        windowMs: 60000,
        blockDurationMs: 60000,
      });

      const user1Requests = Array(5)
        .fill(null)
        .map(async () => {
          const allowed = rateLimiter.isAllowed('TEST', 'user1');
          if (allowed) rateLimiter.recordAttempt('TEST', 'user1');
          return allowed;
        });

      const user2Requests = Array(5)
        .fill(null)
        .map(async () => {
          const allowed = rateLimiter.isAllowed('TEST', 'user2');
          if (allowed) rateLimiter.recordAttempt('TEST', 'user2');
          return allowed;
        });

      const [user1Results, user2Results] = await Promise.all([
        Promise.all(user1Requests),
        Promise.all(user2Requests),
      ]);

      // Each user should have their own limit
      expect(user1Results.filter(r => r).length).toBeLessThanOrEqual(2);
      expect(user2Results.filter(r => r).length).toBeLessThanOrEqual(2);
    });
  });
});
