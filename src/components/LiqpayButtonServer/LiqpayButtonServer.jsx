import { useState } from 'react';
import axios from 'axios';

import { DivStyled, FormStyled } from './LiqpayButtonServer.styled';

axios.defaults.baseURL = 'https://payment-server-node.onrender.com';
const bank = axios.create({
  baseURL: 'https://www.liqpay.ua/api/3',
});

const getPaymentWindow = async data => {
  const response = await axios.post('/pay', data);
  return response;
};

const getPaymentSecondWindow = async data => {
  const response = await axios.post('/pay-button', data);
  return response;
};

const config = {
  headers: {
    'Access-Control-Allow-Origin': 'http://127.0.0.1:5173',
    // 'Access-Control-Allow-Headers': 'Content-Type',
    // 'Content-Type': 'multipart/form-data',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
};

export const LiqpayButtonServer = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [params, setParams] = useState('');

  const send = async () => {
    const { data } = await getPaymentSecondWindow({
      amount,
      description,
    });

    setParams(data.paymentValues);
    console.log(data);

    const response = await bank.post('/checkout', data.paymentValues, config);
    console.log(response);
  };

  return (
    <DivStyled>
      <p>формуються параметри на мойому сервері</p>
      <FormStyled>
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
      </FormStyled>

      <button type="button" onClick={send}>
        Перейти до оплати
      </button>
      {/* {params && <Form params={params} />} */}
    </DivStyled>
  );
};

const Form = params => {
  console.log(params);

  return (
    <form
      method="POST"
      action="https://www.liqpay.ua/api/3/checkout"
      acceptCharset="utf-8"
    >
      <input type="hidden" name="data" value={params.data} />
      <input type="hidden" name="signature" value={params.signature} />
      <button>Сплатити гроші</button>
    </form>
  );
};
