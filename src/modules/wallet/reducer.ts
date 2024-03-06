import { AnyAction } from 'redux';
import {
  ConnectWalletFailureAction,
  ConnectWalletSuccessAction,
  CONNECT_WALLET_FAILURE,
  CONNECT_WALLET_REQUEST,
  CONNECT_WALLET_SUCCESS,
  TransferFailureAction,
  TransferSuccessAction,
  TRANSFER_FAILURE,
  TRANSFER_REQUEST,
  TRANSFER_SUCCESS,
} from './actions';
import { WalletState } from './types';

const INITIAL_STATE: WalletState = {
  address: null,
  symbol: null,
  balance: null,
  isConnecting: false,
  isSending: false,
  error: null,
};

export function walletReducer(
  state: WalletState = INITIAL_STATE,
  action: AnyAction
): WalletState {
  switch (action.type) {
    case CONNECT_WALLET_REQUEST: {
      return {
        ...state,
        isConnecting: true,
        error: null,
      };
    }
    case CONNECT_WALLET_SUCCESS: {
      const { address, symbol, balance } =
        action.payload as ConnectWalletSuccessAction['payload'];
      return {
        ...state,
        isConnecting: false,
        address,
        symbol,
        balance,
        error: null,
      };
    }

    case CONNECT_WALLET_FAILURE: {
      const { error } = action.payload as ConnectWalletFailureAction['payload'];
      return {
        ...state,
        isConnecting: false,
        error,
      };
    }

    case TRANSFER_REQUEST: {
      return {
        ...state,
        isSending: true,
        error: null,
      };
    }

    case TRANSFER_SUCCESS: {
      const { balance } = action.payload as TransferSuccessAction['payload'];
      return {
        ...state,
        isSending: false,
        balance,
        error: null,
      };
    }

    case TRANSFER_FAILURE: {
      const { error } = action.payload as TransferFailureAction['payload'];
      return {
        ...state,
        isSending: false,
        error,
      };
    }

    default:
      return state;
  }
}
