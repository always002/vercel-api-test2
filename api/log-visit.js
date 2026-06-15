//import { sql } from "@vercel/postgres";
import { createPool } from "@vercel/postgres";

const pool = createPool();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url, userAgent, referrer, time } = req.body;

  try {
    // 自动建表（如果不存在）
    await pool.sql`
      CREATE TABLE IF NOT EXISTS visit_logs (
        id SERIAL PRIMARY KEY,
        url TEXT,
        user_agent TEXT,
        referrer TEXT,
        time BIGINT
      );
    `;

    // 插入访问记录
    await sql`
      INSERT INTO visit_logs (url, user_agent, referrer, time)
      VALUES (${url}, ${userAgent}, ${referrer}, ${time});
    `;

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
