# AILABSBG

## Authentication setup

This project uses Supabase Auth.

Create a Supabase project and add these environment variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_or_anon_key
VITE_PUBLIC_SITE_URL=http://localhost:5173
```

Do not use the service_role key in the frontend.

In Supabase, go to:

Authentication → URL Configuration

Set Site URL:

http://localhost:5173

For production, set it to your real domain.

Add Redirect URLs:

http://localhost:5173/*
https://your-domain.com/*

Enable Email/Password provider in:

Authentication → Providers → Email

Then run:

npm install
npm run dev
