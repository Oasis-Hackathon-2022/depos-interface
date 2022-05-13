import React from "react";
import { Container } from "@mui/material";
import SimpleDeposit from "../components/SimpleDeposit";
import CoinMarket from "../components/CoinMarket";
import PageContainer from "../components/PageContainer";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";

const DoItNowPage = () => {
  return (
    <PageContainer>
      <Header>
        <PageTitle>Do it now!</PageTitle>
      </Header>
      <Container
        maxWidth={"xl"}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <SimpleDeposit />
        {/*<CoinMarket />*/}
      </Container>
    </PageContainer>
  );
};

export default DoItNowPage;
