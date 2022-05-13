import React, { FC, PropsWithChildren } from "react";
import { Typography } from "@mui/material";

const PageTitle: FC<PropsWithChildren<any>> = ({ children }) => {
  return (
    <Typography variant={"h2"} color={"white"} textAlign={"center"}>
      {children}
    </Typography>
  );
};

export default PageTitle;
