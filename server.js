import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// Parse JSON request body
app.use(express.json());

// API endpoint for Gemini API proxy
app.post('/api/generate-plan', async (req, res) => {
    try {
        // Get API key from environment variables
        const apiKey = process.env.GEMINI_API_KEY;
        
        if (!apiKey) {
            return res.status(500).json({ 
                error: 'API key not configured. Please add GEMINI_API_KEY to your .env file.' 
            });
        }
        
        // Forward the request to the client-side code
        // The actual API call is handled in utils/geminiApi.js
        res.json({ 
            apiKey: apiKey 
        });
    } catch (error) {
        console.error('Error in generate-plan endpoint:', error);
        res.status(500).json({ error: error.message });
    }
});

// Serve the main HTML file for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 