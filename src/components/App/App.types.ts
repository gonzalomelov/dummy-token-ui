import { AnyAction, Dispatch } from 'redux';
import {
  ConnectWalletRequestAction,
  TransferRequestAction,
} from '../../modules/wallet/actions';

export type Props = {
  address: string;
  symbol: string;
  balance: string;
  isConnected: boolean;
  isConnecting: boolean;
  isSending: boolean;
  error: string | null;
  onConnect: () => void;
  onSend: (amount: number, address: string) => void;
};

export type MapStateProps = Pick<
  Props,
  | 'address'
  | 'symbol'
  | 'balance'
  | 'isConnected'
  | 'isConnecting'
  | 'isSending'
  | 'error'
>;
export type MapDispatchProps = Pick<Props, 'onConnect' | 'onSend'>;
export type MapDispatch = Dispatch<
  ConnectWalletRequestAction | TransferRequestAction | AnyAction
>;
