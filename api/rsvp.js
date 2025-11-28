import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, jumlah } = req.body;

  const { error } = await supabase
    .from("rsvp")
    .insert([{ name, jumlah }]);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ message: "RSVP diterima!" });
}
