import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for AI Assistant
  app.post('/api/ai-assistant', async (req, res) => {
    try {
      const { message, history, currentPage, siteContext } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required and must be a string.' });
      }

      const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || process.env.ANTHROPIC_API_KEY;

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey === 'your_api_key_here') {
        return res.status(500).json({ 
          error: 'В момента AI асистентът не е свързан с API ключ.' 
        });
      }

      if (message.length > 500) {
        return res.status(400).json({
          error: 'Въпросът е твърде дълъг. Опитай с по-кратко съобщение.'
        });
      }

      // Initialize Gemini Client
      const ai = new GoogleGenAI({ apiKey });
      
      const systemPrompt = `You are AI Навигатор, the helpful AI assistant inside AILABSBG — the first premium AI School and AI Community platform in Bulgaria. Your role is to help users understand the platform, choose where to start, learn how to use AI practically, navigate lessons, prompts, events, community features, and answer beginner-friendly questions about AI.

Answer in Bulgarian by default. If the user writes in English, answer in English.

Be clear, practical, friendly, and direct. Keep answers concise but useful. Do not sound robotic. Do not overhype. Do not pretend to access private user data unless it is provided in the current conversation. Do not claim that a feature exists if it does not exist in the provided site context.

AILABSBG includes:
- Home: introduction to the AI School / AI Community
- Community: place for posts, discussions, AI creators, founders, learners, and questions
- Prompts: prompt library with reusable AI prompt templates
- Lessons: AI learning modules and 3-day AI intensive
- Events: workshops, webinars, and live AI sessions
- Profile: user profile, bio, tools, badges, saved content
- Admin: admin-only area for managing users, posts, events, and prompts

Your goal is to guide the user toward the most useful next action.

For beginners, suggest starting with Lessons, then Prompts, then Community.
For business users, suggest identifying one repetitive task and building an AI workflow around it.
For creators, suggest prompts for content, scripts, hooks, editing, and marketing.
For confused users, explain the platform simply.

Never give dangerous, illegal, or misleading advice.
If unsure, say so clearly and suggest the closest useful section of the platform.

Context:
Current Page: ${currentPage || 'unknown'}
Site Context: ${siteContext || 'AILABSBG Platform'}
`;

      let aiHistory = [{ role: 'user', parts: [{ text: systemPrompt }]}, { role: 'model', parts: [{ text: 'Разбрах. Аз съм AI Навигатор в AILABSBG. Как мога да помогна?' }] }];
      if (history && Array.isArray(history)) {
        // take last 6 messages
        const recentHistory = history.slice(-6);
        for (const msg of recentHistory) {
          if (msg.role && msg.content) {
            aiHistory.push({
              role: msg.role === 'user' ? 'user' : 'model',
              parts: [{ text: msg.content }]
            });
          }
        }
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [...aiHistory, { role: 'user', parts: [{ text: message }] }],
        config: {
          temperature: 0.7,
        }
      });

      return res.json({ answer: response.text });
    } catch (error: any) {
      console.error('AI Error:', error);
      return res.status(500).json({ 
        error: 'Възникна проблем с AI отговора. Опитай отново след малко.' 
      });
    }
  });


  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist/client');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
