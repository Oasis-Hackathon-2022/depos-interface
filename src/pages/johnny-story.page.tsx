import React, { FC, PropsWithChildren } from "react";
import PageContainer from "../components/PageContainer";
import PageTitle from "../components/PageTitle";
import { Box, Container, SxProps, Typography } from "@mui/material";
import Header from "../components/Header";
import { Colors } from "../constants/colors";
import chart1 from "../images/chart1.png";
import chart2 from "../images/chart2.png";
import { Link } from "react-router-dom";

const BaseText: FC<PropsWithChildren<{ sx?: SxProps }>> = ({
  children,
  sx,
}) => {
  return (
    <Typography lineHeight={"24px"} mt={2} color={Colors.black100} sx={sx}>
      {children}
    </Typography>
  );
};

const JohnnyStoryPage = () => {
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
      <Container
        maxWidth={"lg"}
        sx={{ display: "flex", flexDirection: "column", paddingY: 10 }}
      >
        <Box sx={{ width: 400 }}>
          <Typography variant={"h4"} fontWeight={"bold"} color={Colors.black10}>
            A story about how Johnny totally messed up his investment
          </Typography>
          <BaseText>
            Read this story about how Johnny totally messed up his investment in
            crypto.
          </BaseText>
        </Box>
        <Box sx={{ mt: 4 }}>
          <BaseText>
            Johnny was born in 2001 and, thanks to his father, he got his
            personal computer at the very age of 12. That year, he was doing his
            last stage of primary school and it was all of a sudden he read
            about Bitcoin on newspaper. This young man was intellectually born
            to be a businessman perhaps, that he realized without hesitation
            Bitcoin is going to be the next trend. It turns out he was right,
            when he read about the article the prize was at 0.X dollar and no
            more than 10 years later it had reached 69,000 in the highest,
            clinging to 40,000 in a stable manner.
          </BaseText>
          <Box
            sx={{
              height: 48,
              borderLeft: `4px solid ${Colors.blue100}`,
              mt: 2,
              pl: 2,
              mb: 2,
            }}
          >
            <BaseText sx={{ color: Colors.blue100, lineHeight: "48px" }}>
              His father would regret not giving him the 5 dollars to buy some
              Bitcoins at that afternoon 10 years ago, perhaps this is the
              chance to get rich.
            </BaseText>
          </Box>
          <BaseText>
            Johnny was a stubborn boy and he jumped back to crypto at 2019. When
            he came back the market goes like this:
          </BaseText>
          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <img alt={"chart1"} src={chart1} />
          </Box>
          <BaseText>
            Splendid, right? That’s what Johnny thinks at that time. He devoted
            his only 2000 dollars ( He’s a college student) to it and got a
            fantastic return. He felt like the world is in his hand.
          </BaseText>
          <BaseText>
            So he kept his money in the market and even leveraged 2x. Every
            night he went to sleep feeling safe and sound.
          </BaseText>
          <BaseText>
            Until that day, he went to sleep at night but was ringed up in
            mid-night by his co-investor: “ Check the market now!”
          </BaseText>
          <BaseText>In panic he opened the laptop only seeing this:</BaseText>
          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <img alt={"chart2"} src={chart2} />
          </Box>
          <BaseText>
            (This is a four-hour line of the market of that 2 weeks.)
          </BaseText>
          <BaseText>
            At the beginning he does not believe Bitcoin would ever crush so he
            even suggested his co-investor to invest more. But he found out that
            every time the coin began to crush he had never had the chance to
            save his money by selling immediately: The market always crushes
            when he was sleeping. After a long fight he lost all his money which
            he earned in a month in one week. For a student like Johnny, he can
            be said broke.
          </BaseText>
          <BaseText>
            This is not a fiction. On the contrary this is a true story happened
            to the product manager Zixuan Cheng of the Deposit(Depo) Coin. As he
            and his colleagues hates money lost because of not being able to
            take care of the market, or simply because they are asleep, they
            invented Deposit.
          </BaseText>
          <BaseText>
            To know more about deposit, you can download our whitepaper :{" "}
            <Link
              to={"Download"}
              style={{
                textDecoration: "none",
                color: Colors.blue100,
              }}
            >
              {" "}
              Whitepaper.pdf{" "}
            </Link>
          </BaseText>
        </Box>
      </Container>
    </PageContainer>
  );
};

export default JohnnyStoryPage;
