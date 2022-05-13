import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { Colors } from "../constants/colors";
import image1 from "../images/image1.png";
import BaseColoredButton from "./BaseColoredButton";
import { Link } from "react-router-dom";
import { ROUTERS } from "../routes";

const OurStory = () => {
  return (
    <Container maxWidth={"xl"}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingY: 10,
          alignItems: "center",
          gap: 10,
        }}
      >
        <Box>
          <Typography color={Colors.blue100} variant={"h5"} fontWeight={"bold"}>
            Our Story
          </Typography>
          <Typography color={Colors.black100} variant={"h3"}>
            A story about how Johnny totally messed up his investment
          </Typography>
          <Typography color={Colors.black100} sx={{ mt: 2 }} variant={"h6"}>
            Read this story about how Johnny totally messed up his investment in
            crypto.
          </Typography>
          <Link
            to={ROUTERS.JOHNNY_STORY}
            style={{ textDecoration: "none" }}
            onClick={() => window.scrollTo(0, 0)}
          >
            <BaseColoredButton>More</BaseColoredButton>
          </Link>
        </Box>
        <img src={image1} alt={"image1"} />
      </Box>
    </Container>
  );
};

export default OurStory;
