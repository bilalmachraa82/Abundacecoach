/**
 * Client-side Rate Limiter
 * Best Practice 2025: Prevent brute force attacks and API abuse
 * OWASP A07:2021 - Identification and Authentication Failures
 */

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
  blockDurationMs: number;
}

interface AttemptRecord {
  count: number;
  firstAttemptTime: number;
  blockedUntil?: number;
}

class RateLimiter {
  private attempts: Map<string, AttemptRecord> = new Map();
  private configs: Map<string, RateLimitConfig> = new Map();

  /**
   * Register a rate limit configuration for a specific action
   */
  register(action: string, config: RateLimitConfig): void {
    this.configs.set(action, config);
  }

  /**
   * Check if an action is allowed (not rate limited)
   */
  isAllowed(action: string, identifier: string = 'default'): boolean {
    const key = `${action}:${identifier}`;
    const config = this.configs.get(action);

    if (!config) {
      console.warn(`Rate limiter: No configuration found for action "${action}"`);
      return true;
    }

    const now = Date.now();
    const record = this.attempts.get(key);

    // Check if currently blocked
    if (record?.blockedUntil && now < record.blockedUntil) {
      return false;
    }

    // Clean up old records
    if (record && now - record.firstAttemptTime > config.windowMs) {
      this.attempts.delete(key);
      return true;
    }

    return true;
  }

  /**
   * Record an attempt for an action
   */
  recordAttempt(action: string, identifier: string = 'default'): void {
    const key = `${action}:${identifier}`;
    const config = this.configs.get(action);

    if (!config) {
      return;
    }

    const now = Date.now();
    const record = this.attempts.get(key);

    if (!record) {
      this.attempts.set(key, {
        count: 1,
        firstAttemptTime: now,
      });
      return;
    }

    // Reset if outside window
    if (now - record.firstAttemptTime > config.windowMs) {
      this.attempts.set(key, {
        count: 1,
        firstAttemptTime: now,
      });
      return;
    }

    // Increment attempt count
    record.count++;

    // Block if exceeded max attempts
    if (record.count >= config.maxAttempts) {
      record.blockedUntil = now + config.blockDurationMs;
    }
  }

  /**
   * Get remaining time until unblocked (in seconds)
   */
  getBlockedTimeRemaining(action: string, identifier: string = 'default'): number {
    const key = `${action}:${identifier}`;
    const record = this.attempts.get(key);

    if (!record?.blockedUntil) {
      return 0;
    }

    const remaining = Math.max(0, record.blockedUntil - Date.now());
    return Math.ceil(remaining / 1000);
  }

  /**
   * Manually reset attempts for an action/identifier
   */
  reset(action: string, identifier: string = 'default'): void {
    const key = `${action}:${identifier}`;
    this.attempts.delete(key);
  }

  /**
   * Clear all rate limit records
   */
  clear(): void {
    this.attempts.clear();
  }

  /**
   * Get current attempt count
   */
  getAttemptCount(action: string, identifier: string = 'default'): number {
    const key = `${action}:${identifier}`;
    return this.attempts.get(key)?.count || 0;
  }
}

// Singleton instance
export const rateLimiter = new RateLimiter();

// Pre-configured rate limits
export const RATE_LIMITS = {
  // Auth operations
  LOGIN: {
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
    blockDurationMs: 30 * 60 * 1000, // 30 minutes
  },
  SIGNUP: {
    maxAttempts: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
    blockDurationMs: 60 * 60 * 1000, // 1 hour
  },
  PASSWORD_RESET: {
    maxAttempts: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
    blockDurationMs: 60 * 60 * 1000, // 1 hour
  },
  // API operations
  AI_QUERY: {
    maxAttempts: 20,
    windowMs: 60 * 1000, // 1 minute
    blockDurationMs: 5 * 60 * 1000, // 5 minutes
  },
  TRANSACTION_CREATE: {
    maxAttempts: 30,
    windowMs: 60 * 1000, // 1 minute
    blockDurationMs: 2 * 60 * 1000, // 2 minutes
  },
} as const;

// Register default rate limits
Object.entries(RATE_LIMITS).forEach(([action, config]) => {
  rateLimiter.register(action, config);
});

/**
 * Rate limit error class
 */
export class RateLimitError extends Error {
  constructor(
    public action: string,
    public blockedSeconds: number
  ) {
    super(`Rate limit exceeded for ${action}. Try again in ${blockedSeconds} seconds.`);
    this.name = 'RateLimitError';
  }
}

/**
 * Wrapper function to apply rate limiting to async operations
 */
export async function withRateLimit<T>(
  action: string,
  identifier: string,
  operation: () => Promise<T>
): Promise<T> {
  if (!rateLimiter.isAllowed(action, identifier)) {
    const blockedSeconds = rateLimiter.getBlockedTimeRemaining(action, identifier);
    throw new RateLimitError(action, blockedSeconds);
  }

  rateLimiter.recordAttempt(action, identifier);

  const result = await operation();
  // Reset on success for auth operations
  if (action === 'LOGIN' || action === 'SIGNUP') {
    rateLimiter.reset(action, identifier);
  }
  return result;
}
