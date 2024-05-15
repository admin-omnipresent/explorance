import { useState } from "react";
import { TourDatabaseResponse, WalkthroughData } from "~/types";
import { api } from "~/utils/api";

const useServerSideActions = () => {
  const [scriptData, setScriptData] = useState<WalkthroughData>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { refetch: fetchBucketContent } = api.r2.fetchBucketContent.useQuery(
    undefined,
    {
      enabled: false,
    }
  );

  const {
    refetch: fetchWalkthroughData,
    isLoading: isFetchingWalkthroughData,
  } = api.supabaseDB.fetchCampusTours.useQuery(undefined, {
    enabled: false,
  });

  const filterWalkthroughData = async () => {
    const data = await fetchWalkthroughData();
    const DB_response = data?.data?.DB_response;
    const filtered_DB_Response = DB_response?.map(
      (row_value: TourDatabaseResponse) => ({
        sequenceNumber: row_value.sequence_number,
        videoFile: row_value.tour_video,
        aiAvatarVideo: row_value.ai_video,
        videoDataType: row_value.video_type,
        captionsFile: row_value.captions_file,
      })
    );

    return filtered_DB_Response;
  };

  const loadExperience = async (walkthroughData: WalkthroughData) => {
    try {
      setIsLoading(true);
      const data = await fetchBucketContent();

      const updatedR2Data =
        data.data?.CDN_Response?.map((item) => ({
          ETag: item.ETag,
          Key: item.Key,
        })) ?? [];

      console.log(walkthroughData);

      // Ensures Script verification from R2 Bucket
      const filteredScriptData = walkthroughData.filter((script) => {
        return updatedR2Data.some((r2Item) => r2Item.Key === script.videoFile);
      });

      setScriptData([...filteredScriptData]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false); // Ensure to set loading state to false regardless of success or failure
    }
  };

  return {
    loadExperience,
    filterWalkthroughData,
    isFetchingWalkthroughData,
    isLoading,
    scriptData,
  };
};

export default useServerSideActions;
