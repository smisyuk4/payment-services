import { useEffect, useState } from 'react';
import { DivStyled, PrivatePage } from './LiqpayButton.styled';
import { makeValues } from '../../helpers/liqpay';

export const LiqpayButton = () => {
  const [payInfo, setPayInfo] = useState({ amount: 1, description: 'test' });
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

  // const sendMoney = async () => {
  //   const resultPayment = await axios.post(
  //     'https://www.liqpay.ua/api/3/checkout',
  //     {
  //       data: dataBase64,
  //       signature: signatureBase64,
  //     }
  //     // {
  //     //   headers: {
  //     //     'Access-Control-Allow-Origin': '*',
  //     //   },
  //     // }
  //   );

  //   console.log(resultPayment);
  // };

  return (
    <DivStyled>
      <PrivatePage
        method="POST"
        action="https://www.liqpay.ua/api/3/checkout"
        acceptCharset="utf-8"
        target="blank"
      >
        <p>Кнопка що відкриває окрему сторінку з варіантами оплати</p>
        <input type="hidden" name="data" value={dataBase64} />
        <input type="hidden" name="signature" value={signatureBase64} />

        <button type="submit">Сплатити</button>
      </PrivatePage>
    </DivStyled>
  );
};
