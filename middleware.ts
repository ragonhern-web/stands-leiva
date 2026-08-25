import { next } from "@vercel/edge";

export const config = {
  matcher: "/:path*",
};

const COOKIE_NAME = "site_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 días

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function loginPage(error?: string) {
  return new Response(
    `<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Novedades Leiva</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #0f172a; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
  form { background: #fff; padding: 2.5rem 2rem; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.35); width: 100%; max-width: 340px; }
  h1 { font-size: 1.05rem; margin: 0 0 1.5rem; color: #0f172a; text-align: center; font-weight: 800; }
  input { width: 100%; padding: 0.75rem 1rem; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 1rem; margin-bottom: 1rem; }
  input:focus { outline: 2px solid #169b22; border-color: #169b22; }
  button { width: 100%; padding: 0.75rem 1rem; border: none; border-radius: 10px; background: #169b22; color: #fff; font-weight: 700; font-size: 1rem; cursor: pointer; }
  button:hover { background: #10801c; }
  p.error { color: #dc2626; font-size: 0.85rem; margin: -0.75rem 0 1rem; text-align: center; }
</style>
</head>
<body>
  <form method="POST">
    <h1>Acceso privado · Novedades Leiva</h1>
    ${error ? `<p class="error">${error}</p>` : ""}
    <input type="password" name="password" placeholder="Contraseña" autofocus required />
    <button type="submit">Entrar</button>
  </form>
</body>
</html>`,
    {
      status: 401,
      headers: { "content-type": "text/html; charset=utf-8" },
    },
  );
}

export default async function middleware(request: Request) {
  const sitePassword = process.env.SITE_PASSWORD;
  if (!sitePassword) {
    return loginPage("Configuración pendiente.");
  }

  const validHash = await sha256Hex(sitePassword);
  const cookie = request.headers.get("cookie") ?? "";
  const cookieMatch = cookie.match(new RegExp(`${COOKIE_NAME}=([a-f0-9]+)`));

  if (cookieMatch?.[1] === validHash) {
    return next();
  }

  if (request.method === "POST") {
    const form = await request.formData();
    const password = form.get("password");

    if (typeof password === "string" && password === sitePassword) {
      const url = new URL(request.url);
      return new Response(null, {
        status: 303,
        headers: {
          location: url.pathname + url.search,
          "set-cookie": `${COOKIE_NAME}=${validHash}; Path=/; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; Secure; SameSite=Lax`,
        },
      });
    }

    return loginPage("Contraseña incorrecta.");
  }

  return loginPage();
}
