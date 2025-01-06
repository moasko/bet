export enum ErrorType {
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  VALIDATION = 'VALIDATION',
  DATABASE = 'DATABASE',
  NETWORK = 'NETWORK',
  WALLET = 'WALLET',
  BET = 'BET',
  UNKNOWN = 'UNKNOWN'
}

export interface AppError {
  type: ErrorType;
  message: string;
  code?: string;
  timestamp: Date;
  data?: any;
}

export class ApplicationError extends Error {
  type: ErrorType;
  code?: string;
  timestamp: Date;
  data?: any;

  constructor(type: ErrorType, message: string, code?: string, data?: any) {
    super(message);
    this.type = type;
    this.code = code;
    this.timestamp = new Date();
    this.data = data;
    this.name = 'ApplicationError';
  }

  toJSON(): AppError {
    return {
      type: this.type,
      message: this.message,
      code: this.code,
      timestamp: this.timestamp,
      data: this.data
    };
  }
}
