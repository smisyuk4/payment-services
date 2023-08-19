import { useState } from 'react';
import axios from 'axios';

import { DivStyled, FormStyled } from './LiqpayButtonServer.styled';

axios.defaults.baseURL = 'https://payment-server-node.onrender.com';

const getPaymentSecondWindow = async data => {
  const response = await axios.post('/getParams', data);
  return response;
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
    console.log(data.paymentValues);
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
      {params && <Form params={params} />}
    </DivStyled>
  );
};

const Form = params => {
  console.log('Form params', params);

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
