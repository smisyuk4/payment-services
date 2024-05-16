import { md5 } from "js-md5";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DivStyled } from "./WayforpayWidget.styled";
const {
  VITE_SERVER_API,
  VITE_WAY_FOR_PAY_URL,
  VITE_MERCHANT_ACCOUNT,
  VITE_MERCHANT_DOMAIN_NAME,
  VITE_MERCHANT_SECRET_KEY,
} = import.meta.env;

export const WayforpayWidget = () => {
  const navigate = useNavigate();
  const [generatedInvoice, setGeneratedInvoice] = useState("");

  useEffect(() => {
    const listenPaymentResult = (event) => {
      if (event.data == "WfpWidgetEventApproved") {
        //navigate("/");
        console.log("event ", event);
      }
    };
    window.addEventListener("message", listenPaymentResult, false);

    return () => window.removeEventListener("message", listenPaymentResult);
  }, []);

  const signatureObj = {
    merchantAccount: VITE_MERCHANT_ACCOUNT,
    merchantDomainName: VITE_MERCHANT_DOMAIN_NAME,
    orderReference: "00010",
    orderDate: 1421412898,
    amount: 1,
    currency: "UAH",
    productName: ["Samsung 0004"],
    productCount: [1],
    productPrice: [1],
  };

  const signatureString = Object.values(signatureObj).flat().join(";");
  const hash = md5.hmac(VITE_MERCHANT_SECRET_KEY, signatureString);

  const handleClickPay = async (e) => {
    e.preventDefault();

    const container = document.body || document.head;
    const script = document.createElement("script");
    script.src = VITE_WAY_FOR_PAY_URL;
    script.onload = () => {
      // eslint-disable-next-line no-undef
      const wayforpay = new Wayforpay();

      wayforpay.run(
        {
          ...signatureObj,
          merchantAuthType: "SimpleSignature",
          merchantSignature: hash,
          //requestType: "VERIFY", //виконання верифікації карти в віджеті
          language: "AUTO",
          returnUrl: "",
          serviceUrl: "https://test-server/payment-status",
          deliveryList: "nova;ukrpost;other",
        },
        function (response) {
          // on approved
          console.log("approved ", response);

          if (response?.transactionStatus === "Approved") {
            wayforpay.closeit();

            navigate("/");
          }
        },
        function (response) {
          // on declined
          console.log("declined ", response);
        },
        function (response) {
          // on pending or in processing
          console.log("pending or processing ", response);
        }
      );
    };
    container.appendChild(script);
  };

  const handleClickGetInvoice = async () => {
    const date_order = Date.now();

    const params = {
      orderReference: "00008",
      orderDate: date_order,
      amount: 1,
      productName: ["fury comics"],
      productCount: [1],
      productPrice: [1],
    };

    const rawResponse = await fetch(`${VITE_SERVER_API}/create-invoice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const content = await rawResponse.json();
    console.log("content ", content);
    setGeneratedInvoice((prev) => content?.invoice?.invoiceUrl || "");
  };

  const handleClickPayInvoice = async (e) => {
    e.preventDefault();

    const container = document.body || document.head;
    const script = document.createElement("script");
    script.src = VITE_WAY_FOR_PAY_URL;
    script.onload = () => {
      // eslint-disable-next-line no-undef
      const wayforpay = new Wayforpay();
      wayforpay.invoice(generatedInvoice);
    };
    container.appendChild(script);
  };

  return (
    <DivStyled>
      <button type="button" onClick={handleClickPay}>
        pay
      </button>

      <div>
        <button type="button" onClick={handleClickGetInvoice}>
          get invoice
        </button>

        <button type="button" onClick={handleClickPayInvoice}>
          pay invoice
        </button>
      </div>
    </DivStyled>
  );
};
