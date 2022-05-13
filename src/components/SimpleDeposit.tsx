import React, {
  FC,
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Colors } from "../constants/colors";
import { CoinMarketInfo, TimeDeposit } from "../types";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { addDays, differenceInDays, format } from "date-fns";
import {
  initWeb3Account,
  timeDeposit,
  getAllowance,
  approval,
  withdraw,
  viewDeposits,
} from "../types/proxy";
import BaseColoredButton from "./BaseColoredButton";
import { USDC } from "../constants/contractAddresses";
import { LoadingButton } from "@mui/lab";

const Title: FunctionComponent<PropsWithChildren<any>> = ({ children }) => {
  return <Typography sx={{ color: Colors.grey50 }}>{children}</Typography>;
};

// const COINS = ["ethereum", "usd-coin", "wrapped-bitcoin"];
const COINS = ["usd-coin"];

const digit = new RegExp("^(-?\\d+.?(\\d+)?)$");

const ONE_MONTH = 30;
const THREE_MONTH = 90;
const HALF_YEAR = 180;

const SimpleDeposit: FC = () => {
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const [coins, setCoins] = useState<CoinMarketInfo[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<CoinMarketInfo | null>(null);
  const [value, setValue] = useState("");
  const [currencyValue, setCurrencyValue] = useState(0);
  const [isValueValid, setValueValid] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(
    addDays(today, ONE_MONTH)
  );
  const [storageDuration, setStorageDuration] = useState(ONE_MONTH);

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COINS.join(
        "%2C"
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCoins(data);
      });
  }, []);
  useEffect(() => {
    if (coins.length > 0) {
      setSelectedCoin(coins[0]);
    }
  }, [coins]);
  useEffect(() => {
    if (isValueValid && selectedCoin) {
      const v = parseFloat(value) * selectedCoin.current_price || 0;
      setCurrencyValue(v);
    } else {
      setCurrencyValue(0);
    }
  }, [value, isValueValid, selectedCoin]);

  useEffect(() => {
    setStorageDuration(differenceInDays(selectedDate, today));
  }, [selectedDate, today]);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value !== "") {
      if (value.startsWith("-")) {
        setValueValid(false);
      } else {
        setValueValid(digit.test(value));
      }
    } else {
      setValueValid(true);
    }
    setValue(value);
  };

  const [account, setAccount] = useState("");

  const getAccountCB = async (web3: any, account: string) => {
    setAccount(account);
  };

  useEffect(() => {
    if (account) {
      handleAllowance();
      handleViewDeposits();
    }
  }, [account]);

  const handleConnectWallet = async () => {
    await initWeb3Account(getAccountCB);
  };

  const [isDepositing, setDepositing] = useState(false);

  const handleTimeDeposit = async () => {
    setDepositing(true);
    await timeDeposit(
      account,
      USDC,
      BigInt(value) * BigInt(10 ** 18),
      storageDuration * 24 * 60 * 60,
      (receipt: any) => {
        console.log(receipt);
        setDepositing(false);
        handleViewDeposits();
      },
      (error: any) => {
        console.log(error);
        setDepositing(false);
        handleErrorMessage(error, "Deposit Failed");
      }
    );
  };

  const [shouldShowApproval, setShowApproval] = useState(false);

  const handleAllowance = async () => {
    const allowance = await getAllowance(account);
    console.log("allowance", allowance);
    if (parseInt(allowance) === 0) {
      setShowApproval(true);
    } else {
      setShowApproval(false);
    }
  };

  const [isApproving, setApproving] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleErrorMessage = (error: any, placeholder: string) => {
    if (typeof error === "string") {
      setErrorMessage(error);
      return;
    }
    if (typeof error === "object") {
      if (error.message) {
        setErrorMessage(error.message);
      }
      return;
    }
    setErrorMessage(placeholder);
  };

  const handleApproval = async () => {
    try {
      setApproving(true);
      await approval(account);
      setApproving(false);
      setShowApproval(false);
    } catch (error) {
      console.error(error);
      setApproving(false);
      handleErrorMessage(error, "Approval failed");
      setAccount("");
      setShowApproval(false);
    }
  };

  const [deposits, setDeposits] = useState<TimeDeposit[]>([]);

  const handleViewDeposits = async () => {
    const result = (
      (await viewDeposits(account)) as [
        [string, string, string, string, string, string, boolean]
      ]
    ).map((d) => {
      const [user, asset, id, time, amount, price, isWithdraw] = d;
      return {
        user,
        asset,
        id,
        time: `${format(new Date(parseInt(time) * 1000), "yyyy/MM/dd")}`,
        amount: `${BigInt(amount) / BigInt(10 ** 18)}`,
        price: `$ ${parseInt(price) / 1000000}`,
        isWithdraw,
      };
    });
    setDeposits(result.filter((d) => !d.isWithdraw));
  };

  const handleRejectApproval = async () => {
    setAccount("");
    setShowApproval(false);
  };

  const setWithdrawing = (value: boolean, id: string) => {
    setWithdrawingTable({
      ...withdrawingTable,
      ...{ [id]: value },
    });
  };

  const [withdrawingTable, setWithdrawingTable] = useState<{
    [id: string]: boolean;
  }>({});

  useEffect(() => {
    setWithdrawingTable(
      deposits.reduce<{ [id: string]: boolean }>((acc, cur) => {
        acc[cur.id] = false;
        return acc;
      }, {})
    );
  }, [deposits]);

  const handleWithdraw = async (id: number) => {
    setWithdrawing(true, `${id}`);
    await withdraw(
      account,
      id,
      (receipt: any) => {
        console.log(receipt);
        setWithdrawing(false, `${id}`);
        handleViewDeposits();
      },
      (error: any) => {
        setWithdrawing(false, `${id}`);
        console.error(error);
        handleErrorMessage(error, "Withdraw failed");
      }
    );
  };

  return (
    <Container
      maxWidth={"xl"}
      sx={{
        mb: 2,
        paddingY: 10,
      }}
    >
      <Box sx={{ width: "960px", marginLeft: "auto", marginRight: "auto" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant={"h6"} component={"span"} color={Colors.blue100}>
            Deposit now
          </Typography>
          <Typography variant={"h4"} component={"span"}>
            Calculator
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Card
                variant={"outlined"}
                sx={{
                  width: 400,
                  padding: 2,
                  borderRadius: 4,
                  borderColor: Colors.black100,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant={"h6"} fontWeight={"bold"}>
                    You pay
                  </Typography>
                  {/*<Button>*/}
                  {/*    <Typography color={Colors.blue100}>Max</Typography>*/}
                  {/*</Button>*/}
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box sx={{ alignSelf: "flex-end" }}>
                    <TextField
                      type={"text"}
                      error={!isValueValid}
                      value={value}
                      placeholder={"0"}
                      onChange={onValueChange}
                      sx={{ m: 1, width: "25ch", textAlign: "right" }}
                      variant={"standard"}
                      inputProps={{
                        min: 0,
                        style: { textAlign: "right" },
                      }}
                      InputProps={{
                        disableUnderline: true,
                        endAdornment: (
                          <InputAdornment position={"end"}>
                            <Typography
                              sx={{
                                fontSize: 16,
                                fontWeight: "bold",
                              }}
                            >
                              {selectedCoin?.symbol.toUpperCase()}
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <Box sx={{ alignSelf: "flex-end", paddingRight: 2 }}>
                    <Typography>= $ {currencyValue.toFixed(2)}</Typography>
                  </Box>
                </Box>
              </Card>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  mt: 2,
                }}
              >
                {coins.map((coin) => {
                  return (
                    <Button
                      key={`coin-${coin.id}`}
                      component={"span"}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        border: "1px solid grey",
                        padding: 1,
                        borderRadius: 4,
                        mr: 1,
                      }}
                      onClick={() => setSelectedCoin(coin)}
                    >
                      <Avatar
                        alt={coin.id}
                        src={coin.image}
                        sx={{ marginRight: 1, width: 24, height: 24 }}
                      />
                      <Typography color={Colors.black100}>
                        {coin.symbol.toUpperCase()}
                      </Typography>
                    </Button>
                  );
                })}
              </Box>
            </Box>
            <Box>
              <Card
                variant={"outlined"}
                sx={{
                  width: 400,
                  padding: 2,
                  borderRadius: 4,
                  borderColor: Colors.black100,
                }}
              >
                <Box>
                  <Typography variant={"h6"} fontWeight={"bold"}>
                    Storage duration
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Button
                    sx={{
                      border: "1px solid grey",
                      borderRadius: 8,
                      borderColor:
                        storageDuration === ONE_MONTH
                          ? Colors.black100
                          : Colors.grey50,
                    }}
                    onClick={() => {
                      setStorageDuration(ONE_MONTH);
                      setSelectedDate(addDays(today, ONE_MONTH));
                    }}
                  >
                    <Typography
                      fontSize={14}
                      color={
                        storageDuration === ONE_MONTH
                          ? Colors.black100
                          : Colors.grey50
                      }
                    >
                      One month
                    </Typography>
                  </Button>
                  <Button
                    sx={{
                      border: "1px solid grey",
                      borderRadius: 8,
                      borderColor:
                        storageDuration === THREE_MONTH
                          ? Colors.black100
                          : Colors.grey50,
                    }}
                    onClick={() => {
                      setStorageDuration(THREE_MONTH);
                      setSelectedDate(addDays(today, THREE_MONTH));
                    }}
                  >
                    <Typography
                      fontSize={14}
                      color={
                        storageDuration === THREE_MONTH
                          ? Colors.black100
                          : Colors.grey50
                      }
                    >
                      Three months
                    </Typography>
                  </Button>
                  <Button
                    sx={{
                      border: "1px solid grey",
                      borderRadius: 8,
                      borderColor:
                        storageDuration === HALF_YEAR
                          ? Colors.black100
                          : Colors.grey50,
                    }}
                    onClick={() => {
                      setStorageDuration(HALF_YEAR);
                      setSelectedDate(addDays(today, HALF_YEAR));
                    }}
                  >
                    <Typography
                      fontSize={14}
                      color={
                        storageDuration === HALF_YEAR
                          ? Colors.black100
                          : Colors.grey50
                      }
                    >
                      Half year
                    </Typography>
                  </Button>
                </Box>
                <Box sx={{ mt: 1, mb: 2 }}>
                  <Typography>Customization</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ mr: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        disabled
                        todayText={"Today"}
                        label="Start"
                        value={today}
                        onChange={(newValue) => {
                          // handleDateChange(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Box>
                  <Box>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="End"
                        value={selectedDate}
                        onChange={(newValue) => {
                          newValue && setSelectedDate(newValue);
                        }}
                        shouldDisableDate={(day) => {
                          if (day) {
                            day.setHours(0, 0, 0, 0);
                            return differenceInDays(day, today) < 30;
                          }
                          return false;
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
              </Card>
            </Box>
          </Box>
          {account ? (
            <Box sx={{ mt: 2, display: "flex", flexDirection: "column" }}>
              <Typography>Your account: {account}</Typography>
              <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
                <BaseColoredButton
                  loading={isDepositing}
                  sx={{ height: 32 }}
                  onClick={handleTimeDeposit}
                  disable={BigInt(value) <= 0}
                >
                  <Typography>Deposit now</Typography>
                </BaseColoredButton>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
              }}
            >
              {!account && (
                <BaseColoredButton
                  sx={{ height: 32 }}
                  onClick={handleConnectWallet}
                >
                  <Typography>Connect Wallet</Typography>
                </BaseColoredButton>
              )}
            </Box>
          )}
        </Box>
        <Dialog open={shouldShowApproval}>
          <DialogTitle>{"Please approve for Deposit"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              We detected that you have not approved an allowance to Deposit
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {isApproving ? (
              <LoadingButton loading />
            ) : (
              <>
                <Button onClick={handleRejectApproval}>Disagree</Button>
                <Button onClick={handleApproval} autoFocus>
                  Ok, Approve
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>
        <Dialog open={!!errorMessage}>
          <DialogTitle>{"Transaction Failed"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Transaction has failed, reason: {errorMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setErrorMessage("")} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      {deposits.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Typography
            color={Colors.black100}
            textAlign={"center"}
            variant={"h4"}
          >
            Your Deposits
          </Typography>
          <TableContainer component={Paper} sx={{ width: "100%", mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Title>ID</Title>
                  </TableCell>
                  <TableCell align="right">
                    <Title>Asset</Title>
                  </TableCell>
                  <TableCell align="right">
                    <Title>Time</Title>
                  </TableCell>
                  <TableCell align="right">
                    <Title>Amount</Title>
                  </TableCell>
                  <TableCell align="right">
                    <Title>Price</Title>
                  </TableCell>
                  {/*<TableCell align="right">*/}
                  {/*    <Title>User</Title>*/}
                  {/*</TableCell>*/}
                  <TableCell align="right">
                    <Title>Action</Title>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deposits.map((d) => {
                  return (
                    <TableRow
                      key={d.id}
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
                        {d.id}
                      </TableCell>
                      <TableCell align="right">
                        {selectedCoin ? (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Avatar
                              alt={selectedCoin.id}
                              src={selectedCoin.image}
                              sx={{ marginRight: 1, width: 24, height: 24 }}
                            />
                            <Typography color={Colors.black100}>
                              {selectedCoin.symbol.toUpperCase()}
                            </Typography>
                          </Box>
                        ) : (
                          <Typography>{d.asset}</Typography>
                        )}
                      </TableCell>
                      <TableCell align="right">{d.time}</TableCell>
                      <TableCell align="right">{d.amount}</TableCell>
                      <TableCell align="right">{d.price}</TableCell>
                      {/*<TableCell align="right">{d.user}</TableCell>*/}
                      <TableCell align="right" valign={"middle"}>
                        {!d.isWithdraw && (
                          <BaseColoredButton
                            loading={withdrawingTable[d.id]}
                            sx={{ height: 32, mt: 0 }}
                            onClick={() => handleWithdraw(parseInt(d.id))}
                          >
                            <Typography>Withdraw</Typography>
                          </BaseColoredButton>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Container>
  );
};

export default SimpleDeposit;
