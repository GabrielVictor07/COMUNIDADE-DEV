import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Inicializar apenas se as variáveis estiverem configuradas
const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) 
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    }) 
  : null;

// Permite 5 tentativas por minuto por IP para rotas de autenticação
const ratelimit = redis ? new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  analytics: true,
}) : null;

// Paths that require authentication
const protectedPaths = ["/dashboard", "/aulas", "/ebooks", "/comunidade", "/admin"];
// Paths that are used FOR authentication (users shouldn't access if ALREADY logged in)
const authPaths = ["/login", "/cadastro", "/admin/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Rate limiting para rotas sensíveis
  if (pathname.startsWith("/api/auth/login") || pathname.startsWith("/api/auth/register") || pathname.startsWith("/api/auth/reset-password") || pathname.startsWith("/api/auth/forgot-password")) {
    if (ratelimit) {
      const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
      const { success } = await ratelimit.limit(`ratelimit_${ip}`);
      if (!success) {
        return NextResponse.json(
          { success: false, message: "Muitas tentativas. Tente novamente mais tarde." },
          { status: 429 }
        );
      }
    }
  }

  const token = await getToken({ req: request });
  const isAuth = !!token;

  const isAuthPage = authPaths.includes(pathname);

  if (isAuthPage && isAuth) {
    if (pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // A route is protected if it starts with any protected path AND is not an auth page
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path)) && !isAuthPage;

  if (isProtected && !isAuth) {
    // Se tentou acessar /admin (e não é /admin/login), manda pro /admin/login
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    // Caso contrário, manda pro login de alunos
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/aulas/:path*",
    "/ebooks/:path*",
    "/comunidade/:path*",
    "/admin/:path*",
    "/login",
    "/cadastro",
    "/api/auth/:path*"
  ],
};
