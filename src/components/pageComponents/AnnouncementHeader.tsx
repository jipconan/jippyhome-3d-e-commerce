import React, { useEffect, useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { announcements } from "../../constants/textContents";

const AnnouncementHeader: React.FC = () => {
  // Tracks the index of the current announcement
  const [currentIndex, setCurrentIndex] = useState(0);
  const holdTime = 3000;
  const slideTime = 500;
  const numberOfLines = announcements.length;

  useEffect(() => {
    // Sets up an interval to update the announcement index at the specified interval
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % numberOfLines);
    }, holdTime + slideTime);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, [holdTime, slideTime, numberOfLines]);

  return (
    <Flex
      as="header"
      align="center"
      justify="center"
      bg="gray.800"
      color="white"
      w="100%"
      p={4}
      position="relative"
      overflow="hidden"
      height="3.5vh"
    >
      {/* Container for the sliding announcements */}
      <Box
        display="flex"
        flexDirection="column"
        position="absolute"
        width="100%"
        height="100%"
        transition={`transform ${slideTime}ms ease-in-out`}
        transform={`translateY(-${currentIndex * 100}%)`}
      >
        {/* Render each announcement with fade effect based on visibility */}
        {announcements.map((announcement, index) => (
          <Text
            key={index}
            px={8}
            fontSize="sm"
            fontWeight="bold"
            lineHeight="3.5vh"
            textAlign="center"
            position="absolute"
            width="100%"
            top={`${index * 100}%`}
            opacity={currentIndex === index ? 1 : 0}
            transition={`opacity 1000ms ease-in-out`}
          >
            {announcement}
          </Text>
        ))}
      </Box>
    </Flex>
  );
};

export default AnnouncementHeader;
