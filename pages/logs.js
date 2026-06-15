//import { sql } from "@vercel/postgres";
import { createPool } from "@vercel/postgres";

const pool = createPool();

export default async function Logs() {
  const { rows } = await pool.sql`
    SELECT * FROM visit_logs ORDER BY id DESC LIMIT 200
  `;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>访问记录（最新 200 条）</h1>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>URL</th>
            <th>User-Agent</th>
            <th>Referrer</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.url}</td>
              <td>{r.user_agent}</td>
              <td>{r.referrer}</td>
              <td>{new Date(Number(r.time)).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}