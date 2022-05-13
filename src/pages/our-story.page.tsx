import React from "react";
import { Carousel } from "react-responsive-carousel";
import PageContainer from "../components/PageContainer";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import { Box, Card, Container, Typography } from "@mui/material";
import BaseColoredButton from "../components/BaseColoredButton";
import { Colors } from "../constants/colors";
import Members from "../components/Members";
import image2 from "../images/image2.png";
import image3 from "../images/image3.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { ROUTERS } from "../routes";

const CIRCLE_SIZE = 60;

const CarouselItem = () => {
  return (
    <Box
      sx={{
        marginBottom: 4,
      }}
    >
      <Card
        sx={{
          borderRadius: 2,
          padding: 2,
          boxShadow: "none",
          height: 240,
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography textAlign={"center"} sx={{ mt: 4 }}>
          See through the curves!
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-end",
            gap: 2,
            mt: 4,
          }}
        >
          <Box
            sx={{
              width: CIRCLE_SIZE,
              height: CIRCLE_SIZE,
              borderRadius: CIRCLE_SIZE / 2,
              backgroundColor: "#eea83e",
            }}
          />
          <Box>
            <Typography fontWeight={"bold"} textAlign={"left"}>
              Zixuan
            </Typography>
            <Typography color={Colors.grey20}>Project Manager</Typography>
          </Box>
          <Box>
            <img src={image3} alt={"image3"} />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

const OurStoryPage = () => {
  return (
    <PageContainer>
      <Header>
        <PageTitle>Our Story</PageTitle>
        <Typography
          color={"white"}
          textAlign={"center"}
          sx={{ mt: 2 }}
          variant={"h5"}
        >
          From a real-life story to a Defi project - Here is Depo
        </Typography>
      </Header>
      <Box sx={{ width: "100%", backgroundColor: Colors.grey10 }}>
        <Container
          maxWidth={"xl"}
          sx={{ paddingY: 10, display: "flex", flexDirection: "row", gap: 20 }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant={"h3"} fontWeight={"bold"}>
              A story about how Johnny totally messed up his investment
            </Typography>
            <Typography sx={{ mt: 1 }} color={Colors.grey20} fontSize={18}>
              Read this story about how Johnny totally messed up his investment
              in crypto.
            </Typography>
            <Link to={ROUTERS.JOHNNY_STORY}>
              <BaseColoredButton>
                <Typography>Read More</Typography>
              </BaseColoredButton>
            </Link>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography color={Colors.grey20} fontSize={18}>
              To protect your assets from the danger of market uncertainty, we
              provide deposit as a financial tool to utilize your benefit and
              safety during short-term and long-term market risk. We generate
              interest with every bit of coin you reserved and provide those
              interest accordingly with the float of future coin price (The
              price is set by you).
            </Typography>
            <Typography sx={{ mt: 3 }} color={Colors.grey20} fontSize={18}>
              With a carefully designed mathematic model, you will get a higher
              return than normal products at the market place and, if the price
              of the coin goes lower, you’ll get more! (By your type of coin and
              depo coin)
            </Typography>
          </Box>
        </Container>
      </Box>
      <Container maxWidth={"xl"} sx={{ paddingY: 10 }}>
        <Typography variant={"h3"} textAlign={"center"}>
          Who we are?
        </Typography>
        <Typography variant={"h5"} textAlign={"center"}>
          Our Team Member & Roles
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Members />
        </Box>
      </Container>
      <Box sx={{ width: "100%", backgroundColor: Colors.grey10, paddingY: 10 }}>
        <Container
          maxWidth={"xl"}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant={"h4"}
            width={800}
            fontWeight={"bold"}
            textAlign={"center"}
          >
            Provide ballast for your assets in relation to currency price
            fluctuations
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              mt: 4,
            }}
          >
            <img src={image2} alt={"image2"} />
            <Box sx={{ width: "480px" }}>
              <Carousel showArrows={false} showStatus={false} autoPlay={true}>
                <CarouselItem />
                <CarouselItem />
              </Carousel>
            </Box>
          </Box>
        </Container>
      </Box>
    </PageContainer>
  );
};

export default OurStoryPage;
