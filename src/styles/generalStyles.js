import styled from "styled-components";

export const Container = styled.div`
  width: 90%;
  margin: 0 auto;
`;

export const SignIn = styled.div`
  width: 500px;
  margin: 2rem auto;
  h1 {
    text-align: center;
  }

  .login-form-forgot {
    float: right;
  }
  .ant-col-rtl .login-form-forgot {
    float: left;
  }
  .login-form-button {
    width: 100%;
  }
`;
