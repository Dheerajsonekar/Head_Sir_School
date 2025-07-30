declare var process: {
  env: {
    [key: string]: string | undefined;
    PORT?: string;
    CLIENT_URL?: string;
    MONGO_URI?: string;
    JWT_SECRET?: string;
  };
  exit(code?: number): never;
};

declare var console: {
  log(...data: any[]): void;
  error(...data: any[]): void;
  warn(...data: any[]): void;
  info(...data: any[]): void;
};

declare var Buffer: {
  from(data: string | number[] | ArrayBuffer, encoding?: string): any;
  isBuffer(obj: any): boolean;
};