import {
  Avatar,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, {
  FC,
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { Colors } from "../constants/colors";
import { CoinMarketInfo } from "../types";

const Title: FunctionComponent<PropsWithChildren<any>> = ({ children }) => {
  return <Typography sx={{ color: Colors.grey50 }}>{children}</Typography>;
};

const CoinMarketTable: FC<{ coins: CoinMarketInfo[] }> = ({ coins }) => {
  return (
    <TableContainer component={Paper} sx={{ width: 500 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Title>Name</Title>
            </TableCell>
            <TableCell align="right">
              <Title>Token</Title>
            </TableCell>
            <TableCell align="right">
              <Title>Price</Title>
            </TableCell>
            <TableCell align="right">
              <Title>24H</Title>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((row) => {
            return (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    fontSize: 16,
                    justifyContent: "flex-start",
                  }}
                >
                  <Avatar
                    alt={row.id}
                    src={row.image}
                    sx={{ marginRight: 1 }}
                  />
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.symbol.toUpperCase()}</TableCell>
                <TableCell align="right">
                  ${row.current_price.toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <Typography
                    color={
                      row.price_change_percentage_24h > 0 ? "green" : "red"
                    }
                  >
                    {row.price_change_percentage_24h.toFixed(2)}%
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CoinMarket: FC = () => {
  const [coins, setCoins] = useState<CoinMarketInfo[]>([]);
  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((r) => r.json())
      .then((data) => setCoins(data));
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
      }}
    >
      <Box>
        <Typography variant={"h4"}>Assets to deposit</Typography>
        <CoinMarketTable coins={coins} />
      </Box>
    </Box>
  );
};

export default CoinMarket;
