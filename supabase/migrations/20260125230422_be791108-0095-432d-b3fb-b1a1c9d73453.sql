-- Create a simple page views counter table
CREATE TABLE public.page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_name TEXT NOT NULL DEFAULT 'home',
  view_count BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(page_name)
);

-- Enable RLS
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read view counts (public portfolio)
CREATE POLICY "Anyone can view page counts" 
ON public.page_views 
FOR SELECT 
USING (true);

-- Allow anyone to update view counts (for incrementing)
CREATE POLICY "Anyone can update page counts" 
ON public.page_views 
FOR UPDATE 
USING (true);

-- Insert initial home page record
INSERT INTO public.page_views (page_name, view_count) VALUES ('home', 0);

-- Create function to increment view count atomically
CREATE OR REPLACE FUNCTION public.increment_page_view(p_page_name TEXT DEFAULT 'home')
RETURNS BIGINT AS $$
DECLARE
  new_count BIGINT;
BEGIN
  UPDATE public.page_views 
  SET view_count = view_count + 1, updated_at = now()
  WHERE page_name = p_page_name
  RETURNING view_count INTO new_count;
  
  RETURN new_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;