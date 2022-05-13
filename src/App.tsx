import React from "react";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/index.page";
import HowItWorksPage from "./pages/how-it-works.page";
import DoItNowPage from "./pages/do-it-now.page";
import OurStoryPage from "./pages/our-story.page";
import { ROUTERS } from "./routes";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "@mui/material";
import Normal from "./themes/normal";
import PageFooter from "./components/PageFooter";
import JohnnyStoryPage from "./pages/johnny-story.page";

function App() {
  return (
    <ThemeProvider theme={Normal}>
      <NavBar />
      <Routes>
        <Route path={ROUTERS.ROOT} element={<IndexPage />} />
        <Route path={ROUTERS.Home} element={<IndexPage />} />
        <Route path={ROUTERS.HOW_IT_WORKS} element={<HowItWorksPage />} />
        <Route path={ROUTERS.JOHNNY_STORY} element={<JohnnyStoryPage />} />
        <Route path={ROUTERS.DO_IT_NOW} element={<DoItNowPage />} />
        <Route path={ROUTERS.APP} element={<DoItNowPage />} />
        <Route path={ROUTERS.OUR_STORY} element={<OurStoryPage />} />
      </Routes>
      <PageFooter />
    </ThemeProvider>
  );
}

export default App;
