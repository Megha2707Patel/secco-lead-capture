# Secco Lead Capture App

A small lead capture application built for the Secco Squared Junior Web Developer take-home task.

The app allows visitors to submit lead information, saves each lead to Supabase, forwards the saved lead to the provided webhook endpoint server-side, and displays submitted leads on a `/leads` dashboard.

## Live Routes

- `/` - Public lead capture form
- `/leads` - Submitted leads table sorted by most recent first

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase
- Vercel

## Features

- Public lead capture form
- Required full name and email fields
- Email validation
- Optional company and message fields
- Source dropdown: Google, Referral, Social, Other
- Loading state during submission
- Success confirmation after submission
- Clear error messages
- Duplicate email handling
- Supabase database persistence
- Server-side webhook POST after successful database insert
- Webhook failure logging without blocking successful submissions
- Server-side `/leads` page using Supabase service role key
- Supabase RLS configured so anonymous users cannot directly read leads from the client

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_publishable_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_secret_service_role_key
WEBHOOK_URL=https://webhook-receiver-flax.vercel.app/api/lead-webhook
CANDIDATE_NAME=Your Full Name
```
Running Locally

Install dependencies:
```
npm install
```
Start the development server:
```
npm run dev
```
Open:
```
http://localhost:3000
```
---Supabase Setup Notes

The app uses a leads table with these columns:

id
full_name
email
company
source
message
created_at

---RLS is enabled.

The anonymous role is allowed to insert leads, but anonymous users are not allowed to directly select/read leads from the client.

The /leads page reads data server-side using the service role key.

---Webhook Behavior

After a lead is successfully saved to Supabase, the API route sends the saved lead data to the provided webhook endpoint.

---The request includes:

X-Candidate-Name: Your Full Name

If the webhook call fails, the error is logged on the server, but the user still receives a successful submission response because the primary database action already succeeded.

---Notes

With more time, I would add authentication for the /leads dashboard, pagination/search for larger lead volumes, and more detailed webhook retry logging.


After saving:

```bash
git add README.md
git commit -m "Improve README documentation"
git push
