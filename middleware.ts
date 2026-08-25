import { next } from "@vercel/edge";

export const config = {
  matcher: "/((?!favicon.webp).*)",
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
<link rel="icon" type="image/webp" href="/favicon.webp" />
<style>
  * { box-sizing: border-box; }
  html, body { height: 100%; }
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0a0b0d;
    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    overflow: hidden;
    position: relative;
    padding: 1.5rem;
  }

  .glow {
    position: fixed;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
  }
  .glow--green  { width: 520px; height: 520px; top: -140px; left: -120px;  background: radial-gradient(circle, rgba(46,223,82,0.55) 0%, rgba(46,223,82,0) 70%); }
  .glow--yellow { width: 460px; height: 460px; bottom: -160px; right: -100px; background: radial-gradient(circle, rgba(255,225,0,0.35) 0%, rgba(255,225,0,0) 70%); }
  .glow--orange { width: 420px; height: 420px; top: 30%; right: -180px; background: radial-gradient(circle, rgba(245,166,35,0.30) 0%, rgba(245,166,35,0) 70%); }

  .watermark {
    position: fixed;
    left: 50%;
    bottom: -4vw;
    transform: translateX(-50%);
    font-size: clamp(4rem, 18vw, 13rem);
    font-weight: 900;
    letter-spacing: -0.03em;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255,255,255,0.06);
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
    z-index: 0;
  }

  main {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 380px;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.9rem;
    margin-bottom: 1.5rem;
    border-radius: 999px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.65);
    backdrop-filter: blur(8px);
  }

  img.logo {
    height: 46px;
    width: 46px;
    object-fit: contain;
    margin-bottom: 1.1rem;
    border-radius: 12px;
    background: #fff;
    padding: 6px;
  }

  h1 {
    margin: 0 0 0.5rem;
    font-size: clamp(1.7rem, 5vw, 2.2rem);
    font-weight: 900;
    letter-spacing: -0.02em;
    text-align: center;
    line-height: 1.15;
  }

  p.subtitle {
    margin: 0 0 2rem;
    text-align: center;
    font-size: 0.95rem;
    color: rgba(255,255,255,0.55);
    max-width: 320px;
    line-height: 1.5;
  }

  form {
    width: 100%;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 20px;
    padding: 1.75rem;
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow: 0 30px 80px rgba(0,0,0,0.5);
  }

  input {
    width: 100%;
    padding: 0.85rem 1rem;
    border: 1px solid rgba(255,255,255,0.16);
    border-radius: 12px;
    background: rgba(0,0,0,0.25);
    color: #fff;
    font-size: 1rem;
    margin-bottom: 1rem;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  input::placeholder { color: rgba(255,255,255,0.35); }
  input:focus {
    outline: none;
    border-color: #2edf52;
    box-shadow: 0 0 0 3px rgba(46,223,82,0.25);
  }

  button {
    width: 100%;
    padding: 0.85rem 1rem;
    border: none;
    border-radius: 12px;
    background: linear-gradient(135deg, #2edf52 0%, #169b22 48%, #093d0d 100%);
    color: #fff;
    font-weight: 800;
    font-size: 1rem;
    letter-spacing: 0.01em;
    cursor: pointer;
    transition: filter 0.15s, transform 0.15s;
  }
  button:hover { filter: brightness(1.08); }
  button:active { transform: scale(0.98); }

  p.error {
    color: #ff8080;
    background: rgba(226,27,35,0.12);
    border: 1px solid rgba(226,27,35,0.3);
    border-radius: 10px;
    padding: 0.55rem 0.8rem;
    font-size: 0.82rem;
    margin: -0.35rem 0 1rem;
    text-align: center;
  }

  footer {
    margin-top: 1.75rem;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    text-align: center;
  }
</style>
</head>
<body>
  <div class="glow glow--green"></div>
  <div class="glow glow--yellow"></div>
  <div class="glow glow--orange"></div>
  <div class="watermark">LEIVA</div>

  <main>
    <span class="badge">🔒 Acceso privado</span>
    <img class="logo" src="/favicon.webp" alt="Novedades Leiva" />
    <h1>¡Bienvenido!</h1>
    <p class="subtitle">Introduce la contraseña para acceder a todo el catálogo de Novedades Leiva.</p>
    <form method="POST">
      ${error ? `<p class="error">${error}</p>` : ""}
      <input type="password" name="password" placeholder="Contraseña" autofocus required />
      <button type="submit">Acceder al catálogo</button>
    </form>
    <footer>Novedades Leiva S.L. · Desde 1996</footer>
  </main>
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
