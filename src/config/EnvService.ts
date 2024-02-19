import dotenv from "dotenv";

class _EnvService {
  private port: number;
  private jwtSecret: string;
  private searchMusicUrl: string;

  constructor() {
    dotenv.config();
    
    this.port = Number(process.env.APP_PORT || 3000);
    this.jwtSecret = this.validate(process.env.JWT_SECRET, 'JWT_SECRET');
    this.searchMusicUrl = this.validate(process.env.SEARCH_MUSIC_URL, 'SEARCH_MUSIC_URL')
  }

  private validate(value: string | undefined, key: string): string {
    if (!value) {
      const message = `${key} env variable is required but not present in environment!!!`;
      console.error(message)
      throw new Error(message);
    }
    return value;
  }

  getAppPort(): number {
    return this.port;
  }

  getJwtSecret() {
    return this.jwtSecret;
  }

  getSearchMusicUrl(): string {
    return this.searchMusicUrl
  }
}

export const EnvService = new _EnvService();
