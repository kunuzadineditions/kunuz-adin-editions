import { promises as fs } from "fs";
import path from "path";

const WAITLIST_PATH = path.join(process.cwd(), "waitlist.json");

async function readWaitlist(): Promise<string[]> {
  try {
    const raw = await fs.readFile(WAITLIST_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Adresse email invalide." }, { status: 400 });
  }

  const list = await readWaitlist();

  if (list.includes(email)) {
    return Response.json({ message: "already_registered" }, { status: 200 });
  }

  list.push(email);
  await fs.writeFile(WAITLIST_PATH, JSON.stringify(list, null, 2), "utf-8");

  return Response.json({ message: "registered" }, { status: 201 });
}
