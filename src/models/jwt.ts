export interface JwtBody {
  userId: number;
  jti: string;
  iat: number;
  exp: number;
}
