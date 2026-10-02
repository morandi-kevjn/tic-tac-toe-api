# Tic-Tac-Toe API 🏆

A simple Node.js and Express backend API for the React Tic-Tac-Toe game. It stores the win/loss/draw leaderboard in a local JSON file.

## 🛠️ Tech Stack
- **Node.js**
- **Express** (Web framework)
- **CORS** (Cross-Origin Resource Sharing)
- **File System (`fs/promises`)** (For reading and writing JSON data)

## 🚀 How to Run
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. The API will be available at `http://localhost:3001`

## 📡 API Endpoints

### GET `/api/leaderboard`
Returns the current leaderboard scores.
**Response:**
```json
{
  "X": 0,
  "O": 0,
  "Draw": 0
}