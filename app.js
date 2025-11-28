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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Halaman utama
app.get('/', (req, res) => {
    res.render('index');
});

// Halaman undangan
app.get('/undangan', (req, res) => {
    res.render('undangan');
});

// Halaman admin
app.get('/admin', async (req, res) => {
    const { data: rsvps, error } = await supabase
        .from('rsvp')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) return res.send('Error: ' + error.message);
    res.render('admin', { rsvps });
});

// API RSVP
app.post('/api/rsvp', async (req, res) => {
    const { name, jumlah } = req.body;
    const { error } = await supabase
        .from('rsvp')
        .insert([{ name, jumlah }]);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: `Terima kasih ${name}, RSVP diterima!` });
});

app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
