import { RootState } from '../types';

export const getState = (state: RootState) => state.wallet;
export const getAddress = (state: RootState) => getState(state).address || '';
export const getSymbol = (state: RootState) => getState(state).symbol || '';
export const getBalance = (state: RootState) => getState(state).balance || '';
export const isConnected = (state: RootState) => !!getAddress(state);
export const isConnecting = (state: RootState) => getState(state).isConnecting;
export const isSending = (state: RootState) => getState(state).isSending;
export const getError = (state: RootState) => getState(state).error;
