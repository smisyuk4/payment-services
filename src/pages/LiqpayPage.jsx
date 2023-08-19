import { LiqpayButton } from '../components/LiqpayButton';
import { LiqpayWidget } from '../components/LiqpayWidget';
import { LiqpayButtonServer } from '../components/LiqpayButtonServer/LiqpayButtonServer';
import { Title, KeyWrp } from './pagesStyles';

// const { VITE_LIQPAY_PRIVATE_KEY, VITE_LIQPAY_PUBLIC_KEY } = import.meta.env;

export const LiqpayPage = () => {
  return (
    <>
      <Title> LiqpayPage</Title>
      <KeyWrp>
        <p>
          <b>номер карти для тестів: </b> 4242424242424242
        </p>
      </KeyWrp>
      <LiqpayButton />
      <LiqpayWidget />
      {/* <LiqpayButtonServer /> */}
    </>
  );
};

export default LiqpayPage;
