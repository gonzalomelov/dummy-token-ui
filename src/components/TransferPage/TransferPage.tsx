import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Center,
  Footer,
  Header,
  Navbar,
  Page,
  Field,
  Segment,
  HeaderMenu,
  Form,
} from 'decentraland-ui'
import { Props } from './TransferPage.types'
import './TransferPage.css'

const TransferPage: React.FC<Props> = ({
  balance,
  onSend,
  isSending,
  error,
}) => {
  const [amount, setAmount] = useState('');

  const [toAddress, setToAddress] = useState('');
  const [isInvalidAddress, setIsInvalidAddress] = useState(false);

  // Redirect to the Connect page if trying to access Transfer without a wallet
  let navigate = useNavigate();
  useEffect(() => {
    if (!balance) {
     navigate('/', {replace: true});
    }
  }, [balance, navigate]);

  let dummy = parseFloat(amount)
  if (amount.length === 0 || isNaN(Number(amount)) || dummy < 0) {
    dummy = 0;
  }
  const isInvalidAmount = dummy <= 0
  
  const hasInsufficientDUMMY = !!amount && dummy > parseFloat(balance)

  const isDisabled =
    isInvalidAmount ||
    !toAddress ||
    isInvalidAddress ||
    hasInsufficientDUMMY ||
    isSending;

  return (
    <>
      <Navbar />
      <Page className="TransferPage">
        <Center>
          <Segment size="tiny">
            <HeaderMenu>
              <HeaderMenu.Left>
                <Header>Transfer</Header>
              </HeaderMenu.Left>
            </HeaderMenu>
            <Form onSubmit={() => onSend(dummy, toAddress)}>
              <Field
                label="Amount"
                placeholder={100}
                type="number"
                value={amount}
                error={amount !== '' && (isInvalidAmount || hasInsufficientDUMMY)}
                onChange={(_event, props) => {
                  setAmount(props.value)
                }}
                message={
                  hasInsufficientDUMMY ? 'You don\'t have enough DUMMY to pay for this bid' : undefined
                }
              />
              <Field
                label="Address"
                placeholder="0x..."
                type="address"
                value={toAddress}
                error={isInvalidAddress}
                onChange={(_event, props) => {
                  setToAddress(props.value)
                  const isValid =
                    !props.value ||
                    /^0x[a-fA-F0-9]{40}$/g.test(props.value)
                  setIsInvalidAddress(!isValid)
                }}
                message={
                  isInvalidAddress ? 'That\'s not a valid address' : undefined
                }
              />
              <Button
                type="submit"
                primary
                loading={isSending}
                disabled={isDisabled}>
                  Send
              </Button>
              {error ? <p className="error">{error}</p> : null}
            </Form>
          </Segment>
        </Center>
      </Page>
      <Footer />
    </>
  )
}

export default TransferPage
