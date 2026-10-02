import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';

const app = express();
const PORT = 3001;

// MIddleware
app.use(cors()); // Allow frontend to make requests
app.use(express.json()); // Parse incoming JSON requests

// Path to our JSON "database"
const DATA_FILE = path.resolve('data', 'leadboard.json');

// --- HELPER FUNCTIONS (Async/Await + Error Handling) ---

async function readLeaderboard() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // File doesn't exist yet, return default
            return {
                X: 0, O: 0, Draw: 0
            };
        }
        throw error;
    }
}

async function writeLeaderboard(data) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// --- API ENDPOINTS --

// GET: fetch current leaderboard
app.get('/api/leaderboard', async (req, res) => {
    try {
        const leaderboard = await readLeaderboard();
        res.json(leaderboard);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to read leaderboard'
        });
    }
});

// POST: Update leaderboard with a win
app.post('/api/leaderboard', async (req, res) => {
    try {
        const { winner } = req.body; // We expect { "winner": "X" } from the frontend

        // Error handling: Validate input
        if (!winner || !['X', 'O', 'Draw'].includes(winner)) {
            return res.status(400).json({
                error: 'Invalid winner value. Must be X, O, Draw.'
            });
        }

        const leaderboard = await readLeaderboard();
        leaderboard[winner] = (leaderboard[winner] || 0) + 1;

        await writeLeaderboard(leaderboard);
        res.json(leaderboard);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to update leaderboard'
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🌯 Backend server running on http://localhost:${PORT}`);
})