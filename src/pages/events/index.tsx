import React, { useEffect, useState } from "react";
import EventsLandingPage from "~/components/pages/events/PageComponents/EventsLandingPage";
import useEventActions from "~/hooks/useEventActions";

const CampusEvents = () => {
  const { handleTestSearch, handleCampusFetchData, campusEventsData } =
    useEventActions();

  useEffect(() => {
    const asyncF = async () => {
      await handleCampusFetchData();
    };

    asyncF().catch(console.error);
  }, []);

  return (
    <EventsLandingPage
      handleSearch={handleTestSearch}
      campusEventsData={campusEventsData}
    />
  );
};

export default CampusEvents;
