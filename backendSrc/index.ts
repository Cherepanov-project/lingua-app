import { registerAllRoutes } from "./appReg";
import { router } from "./router";
import type {
  Fetcher,
  D1Database,
  ExecutionContext,
  Request,
} from "@cloudflare/workers-types";

export type Env = {
  DB: D1Database;
  ASSETS: Fetcher;
};

function handleCors(request: Request) {
  const headers = {
    "Access-Control-Allow-Origin": "http://localhost:5173", // http://localhost:5173 - для дев-сервера при разработке, перед деплоем на продакшн поменять на https://lingua-app-psi.vercel.app
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers });
  }

  return headers;
}

// Register all routes
registerAllRoutes(router);
// Static assets fallback
router.all("*", (request: Request, env: Env) => env.ASSETS.fetch(request));

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    if (request.method === "OPTIONS") {
      return handleCors(request);
    }

    const response = await router.fetch(request, env, ctx);

    const corsHeaders = handleCors(request);
    const finalResponse = new Response(response.body, response);
    Object.entries(corsHeaders).forEach(([key, value]) => {
      finalResponse.headers.set(key, value);
    });

    return finalResponse;
  },
};
