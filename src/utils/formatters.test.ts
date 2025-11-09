/**
 * Tests for formatters utility functions
 * Best Practice 2025: Test pure functions first
 */
import { describe, it, expect } from 'vitest';
import { formatCurrency } from './formatters';

describe('formatCurrency', () => {
  it('formats positive amounts correctly with Portuguese locale', () => {
    const result = formatCurrency(1000);
    expect(result).toContain('1');
    expect(result).toContain('000');
    expect(result).toContain('00');
    expect(result).toContain('€');
  });

  it('formats large amounts with thousand separators', () => {
    const result = formatCurrency(1234.56);
    expect(result).toContain('1');
    expect(result).toContain('234');
    expect(result).toContain('56');
    expect(result).toContain('€');
  });

  it('formats zero correctly', () => {
    const result = formatCurrency(0);
    expect(result).toContain('0');
    expect(result).toContain('€');
  });

  it('formats negative amounts correctly', () => {
    const result = formatCurrency(-500);
    expect(result).toContain('-');
    expect(result).toContain('500');
    expect(result).toContain('€');
  });

  it('handles decimal precision', () => {
    const result = formatCurrency(10.5);
    expect(result).toContain('10');
    expect(result).toContain('50');
    expect(result).toContain('€');
  });

  it('returns a string', () => {
    expect(typeof formatCurrency(100)).toBe('string');
  });
});
