import styled from '@emotion/styled';

export const DivStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin-bottom: 20px;

  background-color: #94eb86;

  button {
    padding: 5px;
    text-transform: uppercase;
    width: 100px;
    align-self: center;
  }

  p {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 700;
  }

  div {
    width: 100%;
  }
`;

export const CartValue = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  gap: 10px;
  padding-bottom: 20px;

  input {
    padding: 5px;
    font-size: 16px;
  }
`;

export const LiqPayWindow = styled.div`
  position: relative;

  button {
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
  }
`;
