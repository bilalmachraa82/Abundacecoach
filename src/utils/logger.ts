/**
 * Centralized Logging Service
 * Best Practice 2025: Replace console.error with structured logging
 * Supports different log levels and future integration with services like Sentry
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  timestamp: Date;
  stack?: string;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 100; // Keep last 100 logs in memory

  private log(level: LogLevel, message: string, context?: Record<string, unknown>, error?: Error) {
    const entry: LogEntry = {
      level,
      message,
      context,
      timestamp: new Date(),
      stack: error?.stack,
    };

    // Add to in-memory log
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Console output in development
    if (import.meta.env.DEV) {
      const prefix = `[${level.toUpperCase()}]`;
      const formattedMessage = `${prefix} ${message}`;

      switch (level) {
        case 'debug':
          console.debug(formattedMessage, context || '');
          break;
        case 'info':
          console.info(formattedMessage, context || '');
          break;
        case 'warn':
          console.warn(formattedMessage, context || '');
          break;
        case 'error':
          console.error(formattedMessage, context || '', error || '');
          break;
      }
    }

    // TODO: Send to monitoring service (Sentry, LogRocket, etc.) in production
    if (import.meta.env.PROD && level === 'error') {
      // Future integration with Sentry:
      // Sentry.captureException(error || new Error(message), { extra: context });
    }
  }

  debug(message: string, context?: Record<string, unknown>) {
    this.log('debug', message, context);
  }

  info(message: string, context?: Record<string, unknown>) {
    this.log('info', message, context);
  }

  warn(message: string, context?: Record<string, unknown>) {
    this.log('warn', message, context);
  }

  error(message: string, error?: Error, context?: Record<string, unknown>) {
    this.log('error', message, context, error);
  }

  getLogs(level?: LogLevel): LogEntry[] {
    if (level) {
      return this.logs.filter(log => log.level === level);
    }
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
  }
}

export const logger = new Logger();
