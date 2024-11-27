// backend/src/auth/jwt-payload.interface.ts
export interface JwtPayload {
    sub: number; // Typically, this would be the user ID
    email: string; // The user's email
  }
  