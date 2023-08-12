import { useEffect, useState } from 'react';
import { DivStyled, CartValue } from './LiqpayButton.styled';
import { makeValues } from '../../helpers/liqpay';

export const LiqpayButton = () => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [dataBase64, setDataBase64] = useState('');
  const [signatureBase64, setSignatureBase64] = useState('');

  useEffect(() => {
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

  return (
    <DivStyled>
      <p>Кнопка що відкриває окрему сторінку з варіантами оплати</p>

      <CartValue>
        <input
          onChange={e => setAmount(prev => e.target.value)}
          name="amount"
          type="number"
          min="1"
          max="100000"
          placeholder="Вартість, грн"
        />
        <input
          onChange={e => setDescription(prev => e.target.value)}
          name="description"
          type="text"
          placeholder="Призначення платежу"
        />
      </CartValue>
      <form
        method="POST"
        action="https://www.liqpay.ua/api/3/checkout"
        acceptCharset="utf-8"
        target="blank"
      >
        <input type="hidden" name="data" value={dataBase64} />
        <input type="hidden" name="signature" value={signatureBase64} />

        <button type="submit">Сплатити</button>
      </form>
    </DivStyled>
  );
};
