import { Box } from "@chakra-ui/react";
import { WalkthroughData } from "~/types";

import React, { useEffect, useState } from "react";
import VideoExperiencePage from "~/components/pages/tour/PageComponents/VideoExperiencePage";
import useServerSideActions from "~/hooks/useServerSideActions";

const CampusWalkthrough = () => {
  const [walkthroughData, setWalkthroughData] = useState<WalkthroughData>([]);
  const { filterWalkthroughData, isFetchingWalkthroughData } =
    useServerSideActions();

  useEffect(() => {
    const FetchData = async () => {
      const data = await filterWalkthroughData();
      console.log(data);
      setWalkthroughData([...(data ?? [])]);
    };

    FetchData().catch(console.error);
  }, [isFetchingWalkthroughData]);
  return (
    <Box bg="#121212" h="100vh">
      <VideoExperiencePage
        isFetchingWalkthroughData={isFetchingWalkthroughData}
        walkthroughData={walkthroughData}
      />
    </Box>
  );
};

export default CampusWalkthrough;
