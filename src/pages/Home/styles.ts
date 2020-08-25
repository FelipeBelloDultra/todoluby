import styled, { css } from 'styled-components';

interface IErrorProps {
  isInvalid: boolean;
}

interface IDisabledProps {
  disabled: boolean;
}

export const Container = styled.div`
  height: 100vh;
`;

export const ContentForm = styled.div<IErrorProps>`
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  min-height: 300px;
  margin: -150px auto 100px;
  border-radius: 4px;
  padding: 10px;

  form {
    display: flex;

    input {
      flex: 1;
      border-radius: 4px;
      border: 2px solid #3b8ea5;
      font-size: 16px;
      padding: 5px;

      ${props =>
        props.isInvalid &&
        css`
          border-color: #ff0000;
        `}
    }

    button {
      margin-left: 10px;
      max-width: 140px;
      width: 100%;
      height: 50px;
      border: 2px solid #3b8ea5;
      background: #1e4a57;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        border: 2px solid #1e4a57;
      }

      ${props =>
        props.isInvalid &&
        css`
          border-color: #ff0000;
        `}
    }
  }

  h3 {
    text-align: center;
    color: #ff0000;
    margin: 10px 0;
  }
`;

export const ContentTodoList = styled.aside<IDisabledProps>`
  ${props =>
    props.disabled &&
    css`
      opacity: 0.6;
    `}

  border-radius: 4px;
  min-height: 65px;
  width: 100%;
  background: #fff;
  margin: 15px 0;
  transition: all 0.2s;
  padding: 15px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #1e4a57;

  &:hover {
    transform: translate(3px, 5px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  > P {
    width: 80%;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    button {
      margin-top: -25px;
      background: transparent;
      padding: 2px;
      border: 2px solid #ff0000;
      border-radius: 4px;
      color: #ff0000;
      font-weight: 500;

      ${props =>
        props.disabled &&
        css`
          pointer-events: none;
        `}
    }

    input {
      cursor: pointer;
      margin-bottom: -25px;
    }
  }
`;
