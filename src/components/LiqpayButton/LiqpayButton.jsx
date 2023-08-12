import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { DivStyled } from './LiqpayButton.styled';
const { VITE_LIQPAY_PRIVATE_KEY, VITE_LIQPAY_PUBLIC_KEY } = import.meta.env;

const makeValues = async ({ amount, description }) => {
  const dataBase64 = btoa(
    JSON.stringify({
      version: '3',
      public_key: VITE_LIQPAY_PUBLIC_KEY,
      action: 'pay',
      amount,
      currency: 'UAH',
      description,
      order_id: uuidv4(),
    })
  );

  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(dataBase64);
  const keyBuffer = encoder.encode(VITE_LIQPAY_PRIVATE_KEY);
  const concatenatedBuffer = new Uint8Array(
    keyBuffer.length + dataBuffer.length + keyBuffer.length
  );
  concatenatedBuffer.set(keyBuffer, 0);
  concatenatedBuffer.set(dataBuffer, keyBuffer.length);
  concatenatedBuffer.set(keyBuffer, keyBuffer.length + dataBuffer.length);

  const hashBuffer = await window.crypto.subtle.digest(
    'SHA-1',
    concatenatedBuffer
  );
  const signatureBase64 = btoa(
    String.fromCharCode(...new Uint8Array(hashBuffer))
  );

  return {
    dataBase64,
    signatureBase64,
  };
};

export const LiqpayButton = () => {
  const [payInfo, setPayInfo] = useState({ amount: '3', description: 'test' });
  const [dataBase64, setDataBase64] = useState('');
  const [signatureBase64, setSignatureBase64] = useState('');

  useEffect(() => {
    const fu = async () => {
      const { dataBase64, signatureBase64 } = await makeValues(payInfo);
      setDataBase64(dataBase64);
      setSignatureBase64(signatureBase64);
    };

    fu();
  }, [payInfo]);

  const sendMoney = async () => {
    const formData = new FormData();
    formData.append('data', dataBase64);
    formData.append('signature', signatureBase64);

    // const resultPayment = await axios({
    //   method: 'post',
    //   url: 'https://www.liqpay.ua/api/3/checkout',
    //   data: formData,
    //   // data: {
    //   //   data: dataBase64,
    //   //   signature: signatureBase64,
    //   // },
    //   headers: { 'Access-Control-Allow-Origin': '*' },
    // });

    const resultPayment = await axios.post(
      'https://www.liqpay.ua/api/3/checkout',
      {
        data: dataBase64,
        signature: signatureBase64,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

    console.log(resultPayment);
  };

  return (
    <DivStyled>
      <p>
        <b>private key: </b> {VITE_LIQPAY_PRIVATE_KEY}
      </p>
      <p>
        <b>public key: </b>
        {VITE_LIQPAY_PUBLIC_KEY}
      </p>
      {/* <form
        method="POST"
        action="https://www.liqpay.ua/api/3/checkout"
        acceptCharset="utf-8"
      >
        <input type="hidden" name="data" value={dataBase64} />
        <input type="hidden" name="signature" value={signatureBase64} />

        <button type="submit">Сплатити</button>
      </form> */}

      <button onClick={sendMoney} type="button">
        Сплатити
      </button>
    </DivStyled>
  );
};
