import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 0 15px;
`;

export const UlStyled = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 50px;

  color: #fff;
  background-color: #000000;

  li {
    display: inline-block;
  }

  a {
    padding: 5px 7px;
    border: 1px solid #000;
  }

  a.active {
    border-color: #fff;
    box-shadow: 0 4px 2px -2px #ff0909;
  }
`;
