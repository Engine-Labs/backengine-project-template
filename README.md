<p align="center">
  <a href="https://backengine.dev" target="blank"><img src="./logo.png" width="400" alt="Backengine Logo" /></a>
</p>

# Backengine Starter

This starter configures a Next.js app for use with [Backengine](https://backengine.dev).

## How to use

1. Rename `.env.example` to `.env` and update the values for `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the local development server
4. Login to view your project overview page (default credentials are `admin@backengine.dev` and `password`)

## Code Generation

The `__backengine__` directory in the root of the project contains code auto-generated from your Backengine database schema. 

