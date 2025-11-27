const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = 8000;

// Supabase client
const SUPABASE_URL = 'https://twumznwbegoeqcplklnm.supabase.co';
const SUPABASE_KEY = 'KEY_MILIKMU';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Halaman utama
app.get('/', (req, res) => {
    res.render('index');
});

// ⭐ Halaman undangan (halaman kedua)
app.get('/undangan', (req, res) => {
    res.render('undangan');
});

// Submit RSVP
app.post('/api/rsvp', async (req, res) => {
    const { name, jumlah } = req.body;
    const { data, error } = await supabase
        .from('rsvp')
        .insert([{ name, jumlah }]);

    if (error) return res.status(500).json({ error: error.message });

    res.json({ message: `Terima kasih ${name}, konfirmasi diterima!` });
});

// Halaman admin
app.get('/admin', async (req, res) => {
    const { data: rsvps, error } = await supabase
        .from('rsvp')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return res.send('Terjadi kesalahan: ' + error.message);

    res.render('admin', { rsvps });
});

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://localhost:${PORT}`));
