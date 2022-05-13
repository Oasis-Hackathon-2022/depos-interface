import React, { FC, PropsWithChildren } from "react";
import { Box } from "@mui/material";

const PageContainer: FC<PropsWithChildren<any>> = ({ children }) => {
  return <Box sx={{ width: "100%" }}>{children}</Box>;
};

export default PageContainer;
