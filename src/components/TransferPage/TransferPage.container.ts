import { connect } from 'react-redux';
import { transferRequest } from '../../modules/wallet/actions';
import {
  getBalance,
  getError,
  isSending,
} from '../../modules/wallet/selectors';
import { RootState } from '../../modules/types';
import {
  MapDispatch,
  MapDispatchProps,
  MapStateProps,
} from './TransferPage.types';
import TransferPage from './TransferPage';

const mapState = (state: RootState): MapStateProps => ({
  balance: getBalance(state),
  isSending: isSending(state),
  error: getError(state),
});

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onSend: (amount: number, address: string) =>
    dispatch(transferRequest(amount, address)),
});

export default connect(mapState, mapDispatch)(TransferPage);
