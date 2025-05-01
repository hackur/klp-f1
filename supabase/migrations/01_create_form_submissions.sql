-- Create form_submissions table
CREATE TABLE IF NOT EXISTS public.form_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  step INTEGER NOT NULL,
  data JSONB NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('in_progress', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_form_submissions_status 
  ON public.form_submissions(status);
CREATE INDEX IF NOT EXISTS idx_form_submissions_submitted_at 
  ON public.form_submissions(submitted_at);

-- Enable RLS but allow all access for now since we're using service role
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access" ON public.form_submissions FOR ALL USING (true);
