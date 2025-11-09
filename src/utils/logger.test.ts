/**
 * Tests for logger utility
 * Best Practice 2025: Test critical infrastructure
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { logger } from './logger';

describe('Logger', () => {
  beforeEach(() => {
    logger.clearLogs();
    vi.clearAllMocks();
  });

  it('logs debug messages', () => {
    logger.debug('Test debug message');
    const logs = logger.getLogs('debug');
    expect(logs).toHaveLength(1);
    expect(logs[0].message).toBe('Test debug message');
  });

  it('logs info messages', () => {
    logger.info('Test info message', { userId: '123' });
    const logs = logger.getLogs('info');
    expect(logs).toHaveLength(1);
    expect(logs[0].context).toEqual({ userId: '123' });
  });

  it('logs warning messages', () => {
    logger.warn('Test warning');
    const logs = logger.getLogs('warn');
    expect(logs).toHaveLength(1);
  });

  it('logs error messages with stack trace', () => {
    const error = new Error('Test error');
    logger.error('Error occurred', error);
    const logs = logger.getLogs('error');
    expect(logs).toHaveLength(1);
    expect(logs[0].stack).toBeDefined();
  });

  it('limits log history to maxLogs', () => {
    // Add 150 logs (maxLogs is 100)
    for (let i = 0; i < 150; i++) {
      logger.info(`Log ${i}`);
    }
    const logs = logger.getLogs();
    expect(logs.length).toBeLessThanOrEqual(100);
  });

  it('clears logs', () => {
    logger.info('Test');
    logger.clearLogs();
    expect(logger.getLogs()).toHaveLength(0);
  });

  it('filters logs by level', () => {
    logger.debug('Debug');
    logger.info('Info');
    logger.warn('Warn');
    logger.error('Error', new Error('test'));

    expect(logger.getLogs('debug')).toHaveLength(1);
    expect(logger.getLogs('info')).toHaveLength(1);
    expect(logger.getLogs('warn')).toHaveLength(1);
    expect(logger.getLogs('error')).toHaveLength(1);
  });
});
