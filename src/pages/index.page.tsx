import React from "react";
import { Box, Button, Container, Link, Typography } from "@mui/material";
import SimpleDeposit from "../components/SimpleDeposit";
import PageContainer from "../components/PageContainer";
import MainHeader from "../components/MainHeader";
import { Colors } from "../constants/colors";
import OurStory from "../components/OurStory";
import HowItWorks from "../components/HowItWorks";
import WhitePaper from "../components/WhitePaper";

const HeaderContent = () => {
  return (
    <Container maxWidth={"xl"}>
      <Typography
        variant={"h3"}
        color={"white"}
        fontWeight={"bold"}
        lineHeight={1.25}
      >
        Your expert
      </Typography>
      <Typography
        variant={"h3"}
        color={"white"}
        fontWeight={"bold"}
        lineHeight={1.25}
      >
        in anti-volatility insurance
      </Typography>
      <Typography
        variant={"h3"}
        color={"white"}
        fontWeight={"bold"}
        lineHeight={1.25}
      >
        solutions for digital assets
      </Typography>
      <Link href={"#how"} style={{ textDecoration: "none" }}>
        <Button
          variant={"contained"}
          sx={{
            borderRadius: 2,
            mt: 4,
            height: 48,
            textTransform: "none",
            backgroundColor: Colors.green20,
            "&:hover": {
              backgroundColor: Colors.green30,
            },
          }}
        >
          <Typography>Discover Solutions</Typography>
        </Button>
      </Link>
    </Container>
  );
};

const IndexPage = () => {
  return (
    <PageContainer>
      <MainHeader>
        <HeaderContent />
      </MainHeader>
      <Box
        sx={{
          backgroundColor: Colors.grey10,
        }}
      >
        <OurStory />
      </Box>
      <Box id={"how"}>
        <HowItWorks />
      </Box>
      <Box
        sx={{
          backgroundColor: Colors.grey10,
        }}
      >
        <WhitePaper />
      </Box>
      <Box>
        <SimpleDeposit />
      </Box>
    </PageContainer>
  );
};

export default IndexPage;
