import { LiqpayButton } from '../components/LiqpayButton';
import { LiqpayWidget } from '../components/LiqpayWidget';
import { Title, KeyWrp } from './pagesStyles';
const { VITE_LIQPAY_PRIVATE_KEY, VITE_LIQPAY_PUBLIC_KEY } = import.meta.env;

export const LiqpayPage = () => {
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
    </>
  );
};

export default LiqpayPage;
