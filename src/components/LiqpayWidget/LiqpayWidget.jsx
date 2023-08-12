import { useState, useEffect } from 'react';
import { DivStyled } from './LiqpayWidget.styled';
import { makeValues } from '../../helpers/liqpay';

export const LiqpayWidget = () => {
  const [payInfo, setPayInfo] = useState({ amount: 1, description: 'test' });
  const [scriptAdded, setScriptAdded] = useState(false);

  useEffect(() => {
    const fu = async () => {
      if (scriptAdded) {
        return;
      }
      const { dataBase64, signatureBase64 } = await makeValues(payInfo);

      // ========>
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
          mode: 'embed', // embed || popup
        })
          .on('liqpay.callback', function (data) {
            console.log(data.status);
            console.log(data);
          })
          .on('liqpay.ready', function (data) {
            // ready
          })
          .on('liqpay.close', function (data) {
            // close
          });
      };
      container.appendChild(script);
      setScriptAdded(true);
    };
    fu();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DivStyled id="liqpay_checkout">
      <p>Liqpay Widget</p>
    </DivStyled>
  );
};
