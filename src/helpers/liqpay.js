const { VITE_LIQPAY_PRIVATE_KEY, VITE_LIQPAY_PUBLIC_KEY } = import.meta.env;

export const makeValues = async ({ amount, description }) => {
  const dataBase64 = btoa(
    JSON.stringify({
      version: '3',
      public_key: VITE_LIQPAY_PUBLIC_KEY,
      action: 'pay',
      amount,
      currency: 'UAH',
      description,
      order_id: 'first sale-1',
    })
  );

  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(dataBase64);
  const keyBuffer = encoder.encode(VITE_LIQPAY_PRIVATE_KEY);
  const concatenatedBuffer = new Uint8Array(
    keyBuffer.length + dataBuffer.length + keyBuffer.length
  );
  concatenatedBuffer.set(keyBuffer, 0);
  concatenatedBuffer.set(dataBuffer, keyBuffer.length);
  concatenatedBuffer.set(keyBuffer, keyBuffer.length + dataBuffer.length);

  const hashBuffer = await window.crypto.subtle.digest(
    'SHA-1',
    concatenatedBuffer
  );
  const signatureBase64 = btoa(
    String.fromCharCode(...new Uint8Array(hashBuffer))
  );

  return {
    dataBase64,
    signatureBase64,
  };
};
