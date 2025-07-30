declare var process: {
  env: {
    [key: string]: string | undefined;
    PORT?: string;
    CLIENT_URL?: string;
    MONGO_URI?: string;
    JWT_SECRET?: string;
  };
};