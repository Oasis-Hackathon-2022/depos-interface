import { createTheme } from "@mui/material";
import { Colors } from "../constants/colors";

const Normal = createTheme({
  typography: {
    fontFamily: "Fira Sans",
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          width: 48,
          height: 48,
          "&.Mui-active": {
            color: `${Colors.blue100} !important`,
          },
        },
      },
    },
    MuiStepContent: {
      styleOverrides: {
        root: {
          marginLeft: 24,
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        root: {
          marginLeft: 24,
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          paddingRight: 0,
        },
      },
    },
  },
});

export default Normal;
