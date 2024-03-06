import { ethers } from 'ethers';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  connectWalletFailure,
  connectWalletSuccess,
  CONNECT_WALLET_REQUEST,
  transferFailure,
  transferSuccess,
  TRANSFER_REQUEST,
  TransferRequestAction,
} from './actions';
import { WindowWithEthereum } from './types';
import history from '../../customHistory';

// The regular `window` object with `ethereum` injected by MetaMask
const windowWithEthereum = window as unknown as WindowWithEthereum;

/* This is the Dummy Token address, it identifies the token contract once deployed */
export const TOKEN_ADDRESS = process.env.REACT_APP_TOKEN_ADDRESS!;
if (!TOKEN_ADDRESS) {
  console.error(`Missing env variable REACT_APP_TOKEN_ADDRESS`);
}

/* This is the Dummy Token ABI (application binary interface)
  You will need this to interact with the deployed contract, ie:

  const provider = new.ethers.providers.Web3Provider(window.ethereum)
  const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider)
  const balance = await token.balanceOf(walletAddress) // --> returns the balance of DummyToken of the walletAddress
*/
export const TOKEN_ABI = [
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint)',
  'function transfer(address to, uint amount)',
];

export function* walletSaga() {
  yield takeEvery(CONNECT_WALLET_REQUEST, handleConnectWalletRequest);
  yield takeEvery(TRANSFER_REQUEST, handleTransferRequest);
}

function* handleConnectWalletRequest() {
  try {
    const provider = new ethers.providers.Web3Provider(
      windowWithEthereum.ethereum
    );
    yield call(() => provider.send('eth_requestAccounts', []));
    const signer = provider.getSigner();
    const address: string = yield call(() => signer.getAddress());

    const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider);
    const symbol: string = yield call(() => token.symbol());
    const balance: string = yield call(() => token.balanceOf(address));

    yield put(connectWalletSuccess(address, symbol, balance));
  } catch (error: any) {
    yield put(connectWalletFailure(error.message));
  }
}

function* handleTransferRequest(action: TransferRequestAction): any {
  try {
    const provider = new ethers.providers.Web3Provider(
      windowWithEthereum.ethereum
    );
    yield call(() => provider.send('eth_requestAccounts', []));
    const signer = provider.getSigner();
    const address: string = yield call(() => signer.getAddress());
    const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider);

    // ###################################################
    // // We send the transaction, and save its hash in the Dapp's state. This
    // // way we can indicate that we are waiting for it to be mined.
    // const tx = await this._token.transfer(to, amount);
    // this.setState({ txBeingSent: tx.hash });
    const tokenWithSigner = token.connect(signer);
    const tx = yield call(() =>
      tokenWithSigner.transfer(action.payload.address, action.payload.amount)
    );

    // // We use .wait() to wait for the transaction to be mined. This method
    // // returns the transaction's receipt.
    // const receipt = await tx.wait();
    const receipt = yield call(() => tx.wait());

    // // The receipt, contains a status flag, which is 0 to indicate an error.
    // if (receipt.status === 0) {
    //   // We can't know the exact error that made the transaction fail when it
    //   // was mined, so we throw this generic one.
    //   throw new Error("Transaction failed");
    // }
    if (receipt.status === 0) {
      throw new Error('Transaction failed');
    }

    // // If we got here, the transaction was successful, so you may want to
    // // update your state. Here, we update the user's balance.
    // await this._updateBalance();
    const balance: string = yield call(() => token.balanceOf(address));
    // ###################################################

    yield put(transferSuccess(balance));

    history.back();
  } catch (error: any) {
    yield put(transferFailure(error.message));
  }
}
