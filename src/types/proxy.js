/* eslint-disable */
import Web3 from "web3";
import IPool from "../contracts/IPool.sol/IPool.json";
import IERC20 from "../contracts/IPool.sol/IERC20.json";
import { POOL, USDC } from "../constants/contractAddresses";

let provider;
let web3;
let message;

let pool;

const ALLOWANCE = BigInt(10 ** 25);

export const initWeb3Account = async (callback) => {
  if (window.ethereum) {
    provider = window.ethereum;
    try {
      await window.ethereum.enable();
    } catch (error) {
      console.error("User denied account access");
    }
  } else {
    provider = new Web3.providers.HttpProvider(
      "https://testnet.emerald.oasis.dev"
    );
  }
  web3 = new Web3(provider);

  web3.eth.getAccounts((err, accs) => {
    if (err != null) {
      console.error("无法获取账号， 是否安装了 Metamask");
      message = "";
      return;
    }

    if (accs.length === 0) {
      console.error("无法获取账号，Metamask 时候正cd 确配置.");
      return;
    }
    // this.account = ;
    callback(web3, accs[0]);

    ethereum.on("accountsChanged", (accounts) => {
      console.error("accountsChanged");
      callback(web3, accounts[0]);
    });
  });
  initPoolContract(web3);
};

const initPoolContract = (web3) => {
  pool = new web3.eth.Contract(IPool.abi, POOL);
};

export const getGammaFactor = async () => {
  const result = await pool.methods.GetGammaFactor().call();
  console.log(result);
};

export const timeDeposit = async (
  account,
  asset,
  amount,
  time,
  handleSuccess,
  handleError
) => {
  await pool.methods
    .timeDeposit(asset, amount, time)
    .send({
      from: account,
    })
    .on("receipt", function (receipt) {
      handleSuccess(receipt);
    })
    .on("error", function (error) {
      handleError(error);
    });
};

export const getAllowance = async (account) => {
  const approval = new web3.eth.Contract(IERC20.abi, USDC);
  return await approval.methods.allowance(account, POOL).call();
};

export const approval = async (account) => {
  const approval = new web3.eth.Contract(IERC20.abi, USDC);
  await approval.methods
    .approve(POOL, ALLOWANCE)
    .send({
      from: account,
    })
    .on("receipt", (receipt) => {
      console.log(receipt);
    });
};

export const withdraw = async (account, id, handleSuccess, handleError) => {
  await pool.methods
    .timeWithdraw(id)
    .send({ from: account })
    .on("receipt", function (receipt) {
      handleSuccess(receipt);
    })
    .on("error", function (error) {
      handleError(error);
    });
};

export const viewDeposits = async (currentAccount) => {
  return await pool.methods
    .getUserTimeDeposit(USDC)
    .call({ from: currentAccount });
};
