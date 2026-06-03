import { getStore } from "@netlify/blobs";

const MAX_VISITORS = 5;
const CORS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }

  const store = getStore("kavya-visitors");

  // GET: check current count
  if (req.method === "GET") {
    const countStr = await store.get("count");
    const count = parseInt(countStr || "0");
    return new Response(
      JSON.stringify({ count, allowed: count < MAX_VISITORS, max: MAX_VISITORS }),
      { status: 200, headers: CORS }
    );
  }

  // POST: try to claim a visitor slot
  if (req.method === "POST") {
    const countStr = await store.get("count");
    const count = parseInt(countStr || "0");

    if (count >= MAX_VISITORS) {
      return new Response(
        JSON.stringify({ allowed: false, count, max: MAX_VISITORS }),
        { status: 200, headers: CORS }
      );
    }

    const newCount = count + 1;
    await store.set("count", String(newCount));

    return new Response(
      JSON.stringify({ allowed: true, count: newCount, max: MAX_VISITORS }),
      { status: 200, headers: CORS }
    );
  }

  return new Response("Method Not Allowed", { status: 405, headers: CORS });
};

export const config = { path: "/api/access" };
