import { Box, Grid, GridItem, Spacer, Text } from "@chakra-ui/react";
// import {} from "@numairawan/video-duration";

import useVideoControllerActions from "~/hooks/useVideoControllerActions";

const walkthroughs = [
  {
    image: "/navigation-images/library.png",
    title: "Library Walkthrough",
    duration: "2 min 23 sec",
    sequenceNumber: 2,
  },
  {
    image: "/navigation-images/sarc.png",
    title: "SARC Walkthrough",
    duration: "1 min 03 sec",
    sequenceNumber: 3,
  },
  {
    image: "/navigation-images/hostel.png",
    title: "Hostels Walkthrough",
    duration: "2 min 23 sec",
    sequenceNumber: 4,
  },
  {
    image: "/navigation-images/isc.png",
    title: "ISC Walkthrough",
    duration: "2 min 23 sec",
    sequenceNumber: 5,
  },
];

interface TourNavigationProps {
  displayNavigationModal: boolean;
  hideNavigationModal: () => void;
}

const TourNavigation: React.FC<TourNavigationProps> = ({
  displayNavigationModal,
  hideNavigationModal,
}) => {
  const { handleSkipNavigation } = useVideoControllerActions();

  return (
    <Box display={displayNavigationModal ? "" : "none"} position="absolute">
      <Grid
        templateColumns="1fr 1fr"
        templateRows="1fr 1fr"
        gap={4}
        p={4}
        // bgColor="rgba(0, 0, 0, 0.5)"
        bg="rgba(0, 0, 0, 0.6)"
        backdropFilter="blur(10px)"
        borderRadius="20px"
        boxShadow="md"
        textColor="white"
      >
        {walkthroughs.map(({ image, title, duration, sequenceNumber }, i) => (
          <GridItem
            onClick={() => {
              void handleSkipNavigation(sequenceNumber);
              hideNavigationModal();
            }}
            as={Box}
            key={i}
            bg="rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(10px)"
            borderRadius="20px"
            border="1px solid rgba(255, 255, 255, 0.2)"
            p={4}
            userSelect="none"
            cursor="pointer"
            transition="all 0.3s ease-in"
            _hover={{
              border: "1px solid rgba(255, 255, 255, 0.1)",
              bg: "rgba(255, 255, 255, 0.2)",
            }}
          >
            <Box
              as="div"
              height="200px"
              width="300px"
              backgroundImage={`url('${image}')`}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              borderRadius="16px"
            />
            <Spacer h="1rem" />
            <Box
              bgColor="rgba(255, 255, 255, 0.1)"
              backdropFilter="blur(10px)"
              borderRadius="16px"
              p={4}
            >
              <Text>{title}</Text>
              <Text color="#B4B4B4">{duration}</Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default TourNavigation;
