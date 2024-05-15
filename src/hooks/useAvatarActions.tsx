import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const useAvatarActions = () => {
  const [aiVideos, setAiVideos] = useState<
    { ETag: string | undefined; Key: string | undefined }[]
  >([]); // Corrected state initialization

  const { refetch: fetchBucketContent } = api.r2.fetchBucketContent.useQuery(
    undefined,
    {
      enabled: false,
    }
  );

  const loadAIExperience = async () => {
    try {
      const response = await fetchBucketContent();
      const videos = response.data?.CDN_Response;
      const aiVideos = videos?.filter((video) => video?.Key?.includes("AI"));
      const filteredAiVideoData =
        aiVideos?.map((item) => ({
          ETag: item.ETag,
          Key: item.Key,
        })) ?? [];

      // Set the filtered AI videos to the state
      setAiVideos([...filteredAiVideoData]);
    } catch (error) {
      // Handle errors here
      console.error("Error loading AI experience:", error);
    }
  };

  useEffect(() => {
    const asyncF = async () => {
      await loadAIExperience();
    };

    asyncF().catch(console.error);
  }, []);

  return { aiVideos }; // Export aiVideos state
};

export default useAvatarActions;
