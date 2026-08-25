import { next } from "@vercel/edge";

export const config = {
  matcher: "/:path*",
};

function unauthorized() {
  return new Response("Autenticación requerida", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Novedades Leiva"' },
  });
}

export default function middleware(request: Request) {
  const auth = request.headers.get("authorization");

  if (auth?.startsWith("Basic ")) {
    const decoded = atob(auth.slice("Basic ".length));
    const separatorIndex = decoded.indexOf(":");
    const password = separatorIndex === -1 ? "" : decoded.slice(separatorIndex + 1);

    if (password && password === process.env.SITE_PASSWORD) {
      return next();
    }
  }

  return unauthorized();
}
