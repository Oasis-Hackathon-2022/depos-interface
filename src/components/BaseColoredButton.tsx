import React, { FC, PropsWithChildren } from "react";
import { Button, SxProps } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const BaseColoredButton: FC<
  PropsWithChildren<{
    sx?: SxProps;
    onClick?: () => void;
    disable?: boolean;
    loading?: boolean;
  }>
> = ({ children, sx, onClick, disable = false, loading = false }) => {
  return loading ? (
    <LoadingButton
      loading
      variant={"contained"}
      sx={{ height: "48px", mt: 2, ...sx }}
    />
  ) : disable ? (
    <Button
      variant={"contained"}
      disabled
      sx={{
        width: 160,
        height: 48,
        mt: 2,
        textTransform: "none",
        ...sx,
      }}
    >
      {children}
    </Button>
  ) : (
    <Button
      sx={{
        background: "linear-gradient(to right, #012ADA, #194BFF)",
        width: 160,
        height: 48,
        mt: 2,
        textTransform: "none",
        ...sx,
      }}
      onClick={onClick}
      variant={"contained"}
    >
      {children}
    </Button>
  );
};

export default BaseColoredButton;
