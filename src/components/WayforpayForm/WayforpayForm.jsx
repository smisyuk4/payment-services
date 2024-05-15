import { md5 } from "js-md5";
import axios from "axios";
import { useEffect, useState } from "react";

const {
  VITE_WAY_FOR_PAY_URL,
  VITE_MERCHANT_ACCOUNT,
  VITE_MERCHANT_DOMAIN_NAME,
  VITE_MERCHANT_SECRET_KEY,
} = import.meta.env;

import { DivStyled } from "./WayforpayForm.styled";

export default function WayforpayForm() {
  const signatureObj = {
    merchantAccount: VITE_MERCHANT_ACCOUNT,
    merchantDomainName: VITE_MERCHANT_DOMAIN_NAME,
    orderReference: "00004", //Унікальний номер invoice в системі торговця
    orderDate: 1421412898,
    amount: 1,
    currency: "UAH",
    productName: ["Samsung 0004"],
    productCount: [1],
    productPrice: [1],
  };

  const signatureString = Object.values(signatureObj).flat().join(";");
  const hash = md5.hmac(VITE_MERCHANT_SECRET_KEY, signatureString);

  const onSubmit = async (e) => {
    e.preventDefault();

    const body = {
      ...signatureObj,
      merchantAuthType: "SimpleSignature",
      serviceUrl: "https://test-server/payment-status",
      merchantSignature: hash,
    };

    const res = await fetch(VITE_WAY_FOR_PAY_URL, {
      method: "POST",
      //mode: "no-cors",
      body: JSON.stringify(body),
    });
    console.log(res);

    const resServer = await res.json();
    console.log(resServer);
  };

  return (
    <DivStyled>
      <form
        method="post"
        action="https://secure.wayforpay.com/pay"
        acceptCharset="utf-8"
        onSubmit={onSubmit}
      >
        <input
          name="merchantAccount"
          value={signatureObj.merchantAccount}
          hidden
          readOnly
        />
        <input
          name="merchantAuthType"
          value="SimpleSignature"
          hidden
          readOnly
        />
        <input
          name="merchantDomainName"
          value={signatureObj.merchantDomainName}
          hidden
          readOnly
        />
        <input
          name="orderReference"
          value={signatureObj.orderReference}
          hidden
          readOnly
        />
        <input
          name="orderDate"
          value={signatureObj.orderDate}
          hidden
          readOnly
        />
        <input name="amount" value={signatureObj.orderDate} hidden readOnly />
        <input name="currency" value="UAH" hidden readOnly />
        <input
          name="productName[]"
          value={signatureObj.productName}
          hidden
          readOnly
        />
        <input
          name="productCount[]"
          value={signatureObj.productCount}
          hidden
          readOnly
        />
        <input
          name="productPrice[]"
          value={signatureObj.productPrice}
          hidden
          readOnly
        />
        <input
          name="serviceUrl"
          value="https://2647-2a00-a041-e0de-e000-f9c9-931c-2d53-b558.ngrok-free.app/payment-status"
          hidden
          readOnly
        />
        <input name="merchantSignature" value={hash} hidden readOnly />
        <input type="submit" value="Pay" className="buttonFondy" />
      </form>
    </DivStyled>
  );
}
