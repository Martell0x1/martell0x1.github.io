-- Fix function search path vulnerability
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- The UPDATE policy with USING(true) is intentional for this public counter.
-- This is a visitor counter for a public portfolio - there's no user-specific data to protect.
-- Adding a comment to document this decision:
COMMENT ON POLICY "Anyone can update page counts" ON public.page_views IS 'Intentionally permissive - public visitor counter for portfolio site';