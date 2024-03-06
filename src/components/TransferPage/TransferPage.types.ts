import { AnyAction, Dispatch } from 'redux';
import { TransferRequestAction } from '../../modules/wallet/actions';

export type Props = {
  balance: string;
  isSending: boolean;
  error: string | null;
  onSend: (amount: number, address: string) => void;
};

export type MapStateProps = Pick<Props, 'balance' | 'isSending' | 'error'>;
export type MapDispatchProps = Pick<Props, 'onSend'>;
export type MapDispatch = Dispatch<TransferRequestAction | AnyAction>;
