import axios from 'axios';

import { LiqpayButton } from '../components/LiqpayButton';
import { LiqpayWidget } from '../components/LiqpayWidget';
import { Title, KeyWrp } from './pagesStyles';
import { useState, Fragment } from 'react';
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

    console.log(data);
    setForm(data);
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
        Сплатити
      </button>
      {form && <PaymentBtn form={form} />}
    </>
  );
};

const PaymentBtn = form => {
  return (
    <div>
      <form
        method="POST"
        action="https://www.liqpay.ua/api/3/checkout"
        // accept-charset="utf-8"
      >
        <input
          type="hidden"
          name="data"
          value="eyJhY3Rpb24iOiJwYXkiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiVVNEIiwiZGVzY3JpcHRpb24iOiJ0ZXN0Iiwib3JkZXJfaWQiOiIwNDY4ZTdjYi1iZmQwLTQ3NDktYjgwMy0xYTAyMmFhZTgwYTMiLCJ2ZXJzaW9uIjoiMyIsImxhbmd1YWdlIjoidWsiLCJzZXJ2ZXJfdXJsIjoiaHR0cHM6Ly9wYXltZW50LXNlcnZlci1ub2RlLm9ucmVuZGVyLmNvbS9saXFwYXktcGF5bWVudC1pbmZvIiwicHVibGljX2tleSI6InNhbmRib3hfaTY4MDIxMDg1MTk1In0="
        />
        <input
          type="hidden"
          name="signature"
          value="GINyP4kD9D9gK5t0ZM9ithR8FiA="
        />
        <input
          type="image"
          src="//static.liqpay.ua/buttons/p1uk.radius.png"
          name="btn_text"
        />
      </form>
    </div>
  );
};

export default LiqpayPage;
