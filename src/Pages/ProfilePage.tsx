import React from "react";
import { Grid, GridItem, Box, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// ProfileNav component to display navigation links
const ProfileNav: React.FC = () => {
  return (
    <Box className="ProfileNav" p={8} h="auto">
      <Flex gap="20px" direction="column">
        <Link to="/profile">
          <div className="font-semibold">My Profile</div>
        </Link>
        <Link to={`/profile/mysavedjobs`}>
          <div>
            <span className="font-semibold">My saved jobs</span>
            <br />
            <span className="font-regular">(coming soon)</span>
          </div>
        </Link>
      </Flex>
    </Box>
  );
};

// Main ProfilePage component
const ProfilePage: React.FC = () => {
  return (
    <Grid
      className="ProfilePage"
      templateAreas={`"nav main"`}
      gridTemplateRows={"100% 1fr"}
      gridTemplateColumns={"300px 1fr"}
      bgColor="gwhite"
    >
      <GridItem
        pl="2"
        bg="lightgray"
        alignContent="start"
        area={"nav"}
        p={8}
        h="auto"
      >
        <Heading fontSize="2xl">My Profile</Heading>
        <ProfileNav />
      </GridItem>
    </Grid>
  );
};

export default ProfilePage;
