import React, { FC, PropsWithChildren } from "react";
import { Box } from "@mui/material";
import bg from "../images/BG_main.png";

const MainHeader: FC<PropsWithChildren<any>> = ({ children }) => {
  return (
    <Box
      width={"100%"}
      height={700}
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "60%",
        backgroundSize: "cover",
        boxSizing: "border-box",
        paddingTop: 20,
      }}
    >
      {children}
    </Box>
  );
};

export default MainHeader;
