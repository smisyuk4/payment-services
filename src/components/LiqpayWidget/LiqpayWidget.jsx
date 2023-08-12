import { useState, useEffect } from 'react';
import { DivStyled, CartValue, LiqPayWindow } from './LiqpayWidget.styled';
import { makeValues } from '../../helpers/liqpay';

export const LiqpayWidget = () => {
  // const [payInfo, setPayInfo] = useState({ amount: 1, description: 'test' });
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [dataBase64, setDataBase64] = useState('');
  const [signatureBase64, setSignatureBase64] = useState('');
  const [statusPayment, setStatusPayment] = useState(false);
  const [resultPayment, setResultPayment] = useState(false);
  // const [isOpenWindow, setisOpenWindow] = useState(false);

  useEffect(() => {
    if (amount === '' && description === '') {
      return;
    }
    const fu = async () => {
      const { dataBase64, signatureBase64 } = await makeValues(
        amount,
        description
      );
      setDataBase64(dataBase64);
      setSignatureBase64(signatureBase64);
    };
    fu();
  }, [amount, description]);

  const pay = e => {
    e.preventDefault();
    // setisOpenWindow(true);
    const SCRIPT_URL = 'https://static.liqpay.ua/libjs/checkout.js';
    const container = document.body || document.head;
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.onload = () => {
      // eslint-disable-next-line no-undef
      LiqPayCheckout.init({
        data: dataBase64,
        signature: signatureBase64,
        embedTo: '#liqpay_checkout',
        language: 'uk',
        mode: 'popup', // embed || popup
      })
        .on('liqpay.callback', function (data) {
          setStatusPayment(prev => data.status);
          setResultPayment(prev => data);
        })
        .on('liqpay.ready', function (data) {
          console.log(data);
          // ready
        })
        .on('liqpay.close', function (data) {
          console.log(data);
          // close
        });
    };
    container.appendChild(script);
    setAmount('');
    setDescription('');
    setDataBase64('');
    setSignatureBase64('');
  };

  // const closeLiqPay = () => {
  //   setisOpenWindow(false);
  //   setAmount('');
  //   setDescription('');
  // };
  console.log(statusPayment, resultPayment);
  return (
    <DivStyled>
      <p>Widget</p>
      <CartValue onSubmit={pay}>
        <input
          onChange={e => setAmount(prev => e.target.value)}
          value={amount}
          name="amount"
          type="number"
          min="1"
          max="100000"
          placeholder="Вартість, грн"
        />
        <input
          onChange={e => setDescription(prev => e.target.value)}
          value={description}
          name="description"
          type="text"
          placeholder="Призначення платежу"
        />
        <button type="submit">Сплатити</button>
      </CartValue>
      {/* {isOpenWindow && ( */}
      <LiqPayWindow id="liqpay_checkout">
        {/* <button type="button" onClick={closeLiqPay}>
            X
          </button> */}
      </LiqPayWindow>
      {/* )} */}
    </DivStyled>
  );
};
