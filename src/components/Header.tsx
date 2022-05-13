import React, { FC, PropsWithChildren } from "react";
import bg from "../images/BG.png";
import { Box } from "@mui/material";

const Header: FC<PropsWithChildren<any>> = ({ children }) => {
  return (
    <Box
      width={"100%"}
      height={450}
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        boxSizing: "border-box",
        paddingTop: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default Header;
