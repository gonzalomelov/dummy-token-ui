import { connect } from 'react-redux';
import {
  connectWalletRequest,
  transferRequest,
} from '../../modules/wallet/actions';
import {
  getAddress,
  getSymbol,
  getBalance,
  getError,
  isConnected,
  isConnecting,
  isSending,
} from '../../modules/wallet/selectors';
import { RootState } from '../../modules/types';
import { MapDispatch, MapDispatchProps, MapStateProps } from './App.types';
import App from './App';

const mapState = (state: RootState): MapStateProps => ({
  address: getAddress(state),
  symbol: getSymbol(state),
  balance: getBalance(state),
  isConnected: isConnected(state),
  isConnecting: isConnecting(state),
  isSending: isSending(state),
  error: getError(state),
});

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onConnect: () => dispatch(connectWalletRequest()),
  onSend: (amount: number, address: string) =>
    dispatch(transferRequest(amount, address)),
});

export default connect(mapState, mapDispatch)(App);
