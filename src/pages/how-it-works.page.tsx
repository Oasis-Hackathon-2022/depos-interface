import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { Colors } from "../constants/colors";
import PageContainer from "../components/PageContainer";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";

const HowItWorksPage = () => {
  return (
    <PageContainer>
      <Header>
        <PageTitle>How it works</PageTitle>
        <Typography
          color={"white"}
          variant={"h5"}
          textAlign={"center"}
          lineHeight={1.5}
        >
          Choose the type of cover you want and get a quote.
        </Typography>
        <Button
          variant={"contained"}
          sx={{
            mt: 2,
            width: 240,
            height: 56,
            background: Colors.green50,
            "&:hover": { background: Colors.green50 },
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          <Typography>Download Whitepaper</Typography>
        </Button>
      </Header>
      <Container maxWidth={"lg"} sx={{ paddingY: 10 }}>
        <Typography variant={"h4"} lineHeight={2}>
          How can DePosit help you resist risk?
        </Typography>
        <Typography lineHeight={2} fontSize={18} color={Colors.grey30}>
          DePosit uses the power of Oasis so people can share market volatility
          risk together without the need for an insurance company.
        </Typography>
        <Typography lineHeight={2} fontSize={18} color={Colors.grey30}>
          A decentralized Insurance Vault is established to safeguard your
          assets against losses when the underlying price of the token falls
          greatly.
        </Typography>
        <Typography variant={"h4"} lineHeight={2} mt={4}>
          How can DePosit help you make money?
        </Typography>
        <Typography lineHeight={2} fontSize={18} color={Colors.grey30}>
          DePosit places your fund in a decentralized way to various DeFi
          protocols that provide reliable yield. You will receive Debt Token on
          deposit, and your can withdraw your asset using the Debt Token at ANY
          time!
        </Typography>
        <Typography variant={"h4"} lineHeight={2} mt={4}>
          How does DePosit ensure the safety of your money?
        </Typography>
        <Typography lineHeight={2} fontSize={18} color={Colors.grey30}>
          DePosit is open-source! Anyone can audit code and transactions to
          ensure that all funds are secure.
        </Typography>
      </Container>
    </PageContainer>
  );
};

export default HowItWorksPage;
