import React, { FC } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { ROUTERS } from "../routes";
import logo from "../images/logo.png";
import { Colors } from "../constants/colors";

const NavItem: FC<{ title: string; to?: string; external?: boolean }> = ({
  title,
  to,
  external,
}) => {
  return (
    <Box sx={{ width: 120 }}>
      {to ? (
        external ? (
          <a
            href={to}
            target={"_blank"}
            style={{ textDecoration: "none" }}
            rel={"noreferrer noopenner"}
          >
            <Typography color={"white"}>{title}</Typography>
          </a>
        ) : (
          <Link to={to} style={{ textDecoration: "none" }}>
            <Typography sx={{ color: "white" }}>{title}</Typography>
          </Link>
        )
      ) : (
        <Typography sx={{ color: "white" }}>{title}</Typography>
      )}
    </Box>
  );
};

const NavBar: FC = () => {
  return (
    <AppBar
      position={"absolute"}
      sx={{ background: "transparent", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box>
            <Link to={ROUTERS.ROOT}>
              <img alt={"logo"} src={logo} />
            </Link>
          </Box>
          <Box sx={{ flex: 1 }} />
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: 600,
            }}
          >
            <NavItem title={"Home"} to={ROUTERS.Home} />
            <NavItem title={"Our Story"} to={ROUTERS.OUR_STORY} />
            {/*<NavItem title={"Hot it works"} to={ROUTERS.HOW_IT_WORKS} />*/}
            {/*<NavItem title={"Do it now"} to={ROUTERS.DO_IT_NOW}/>*/}
            <NavItem
              title={"Documents"}
              to={"https://deposit-1.gitbook.io/deposit-docs/"}
              external
            />
            <Link to={ROUTERS.APP} style={{ textDecoration: "none" }}>
              <Button
                variant={"contained"}
                color={"primary"}
                sx={{
                  borderRadius: 1,
                  backgroundColor: "white",
                  "&:hover": { backgroundColor: "white" },
                }}
              >
                <Typography color={Colors.blue100}>Launch APP</Typography>
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
