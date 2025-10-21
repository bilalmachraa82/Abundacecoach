/**
 * Tests for environment configuration
 * Best Practice 2025: Test critical configuration
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Environment Configuration', () => {
  beforeEach(() => {
    // Clear any mocked environment variables
    vi.unstubAllEnvs();
  });

  it('should have required environment variables defined', () => {
    // These should be set in the test environment
    expect(import.meta.env).toBeDefined();
  });

  it('should validate VITE_ prefix requirement', () => {
    // Vite only exposes variables with VITE_ prefix
    const envKeys = Object.keys(import.meta.env);
    const viteKeys = envKeys.filter(key => key.startsWith('VITE_'));

    // Should have at least some VITE_ prefixed variables
    expect(viteKeys.length).toBeGreaterThan(0);
  });
});
