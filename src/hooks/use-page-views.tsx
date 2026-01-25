import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const usePageViews = (pageName: string = "home") => {
  const [viewCount, setViewCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const incrementAndFetch = async () => {
      try {
        // Increment the view count using the database function
        const { data, error } = await supabase.rpc("increment_page_view", {
          p_page_name: pageName,
        });

        if (error) {
          console.error("Error incrementing view:", error);
          // Fallback: just fetch the current count
          const { data: fetchData } = await supabase
            .from("page_views")
            .select("view_count")
            .eq("page_name", pageName)
            .maybeSingle();
          
          if (fetchData) {
            setViewCount(fetchData.view_count);
          }
        } else {
          setViewCount(data);
        }
      } catch (err) {
        console.error("Error with page views:", err);
      } finally {
        setIsLoading(false);
      }
    };

    incrementAndFetch();
  }, [pageName]);

  return { viewCount, isLoading };
};

export default usePageViews;
