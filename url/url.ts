import { randomBytes } from "crypto";
import { api, APIError } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const db = new SQLDatabase("url", { migrations: "./migrations" });

interface URL {
  id: string;
  url: string;
}

interface ShortBody {
  url: string;
}

export const shortUrl = api(
  { expose: true, method: "POST", path: "/url" },
  async ({ url }: ShortBody): Promise<URL> => {
    const id = randomBytes(6).toString("base64url");
    await db.exec`INSERT INTO URL (id, original_url) VALUES (${id}, ${url})`;
    return { id, url };
  }
);

export const getUrl = api(
  { method: "GET", path: "/url/:id", expose: true },
  async ({ id }: { id: string }): Promise<URL> => {
    console.log(id, "id");
    const row =
      await db.queryRow`SELECT original_url from url WHERE id = ${id}`;
    if (!row) throw APIError.notFound("url not found");
    return { id, url: row.original_url };
  }
);
