import axios from 'axios';

import { LiqpayButton } from '../components/LiqpayButton';
import { LiqpayWidget } from '../components/LiqpayWidget';
import { Title, KeyWrp } from './pagesStyles';
import { useState } from 'react';
const { VITE_LIQPAY_PRIVATE_KEY, VITE_LIQPAY_PUBLIC_KEY } = import.meta.env;

axios.defaults.baseURL = 'https://payment-server-node.onrender.com';

const getPaymentWindow = async data => {
  const response = await axios.post('/pay', data);
  return response;
};

export const LiqpayPage = () => {
  const [form, setForm] = useState('');
  const send = async () => {
    const { data } = await getPaymentWindow({
      amount: 1,
      description: 'test',
    });

    const { firstChild } = new DOMParser().parseFromString(data, 'text/xml');
    // console.log(firstChild);
    setForm(firstChild);
    // setForm(data);
  };

  return (
    <>
      <Title> LiqpayPage</Title>
      <KeyWrp>
        <p>
          <b>private key: </b> {VITE_LIQPAY_PRIVATE_KEY}
        </p>
        <p>
          <b>public key: </b>
          {VITE_LIQPAY_PUBLIC_KEY}
        </p>
      </KeyWrp>
      <LiqpayButton />
      <LiqpayWidget />

      <button type="button" onClick={send}>
        Перейти до оплати
      </button>
      {form && <Form markup={form} />}
    </>
  );
};

// const MyComponent = ({ children }) => <div>{children}</div>;

const Form = markup => {
  console.log(markup);
  const dataValue =
    'eyJhY3Rpb24iOiJwYXkiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiVVNEIiwiZGVzY3JpcHRpb24iOiJ0ZXN0Iiwib3JkZXJfaWQiOiIwNDY4ZTdjYi1iZmQwLTQ3NDktYjgwMy0xYTAyMmFhZTgwYTMiLCJ2ZXJzaW9uIjoiMyIsImxhbmd1YWdlIjoidWsiLCJzZXJ2ZXJfdXJsIjoiaHR0cHM6Ly9wYXltZW50LXNlcnZlci1ub2RlLm9ucmVuZGVyLmNvbS9saXFwYXktcGF5bWVudC1pbmZvIiwicHVibGljX2tleSI6InNhbmRib3hfaTY4MDIxMDg1MTk1In0=';
  const signatureValue = 'GINyP4kD9D9gK5t0ZM9ithR8FiA=';
  return (
    <form
      method="POST"
      action="https://www.liqpay.ua/api/3/checkout"
      acceptCharset="utf-8"
    >
      <input type="hidden" name="data" value={dataValue} />
      <input type="hidden" name="signature" value={signatureValue} />
      <button>Сплатити гроші</button>
    </form>
  );
};

export default LiqpayPage;
