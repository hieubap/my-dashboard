import styled from "styled-components";

export const SuccessModalWrapper = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  div.lottie > div {
    width: 80px !important;
    height: 80px !important;
  }
  .container {
    margin-top: 20px;
    padding: 15px 15px 5px 15px;
    .value {
      font-weight: 700;
      font-size: 14px;
      line-height: 18px;
      color: #00945d;
    }
  }
  .info-container {
    margin-top: 20px;
    padding: 15px 15px 5px 15px;
    background: rgba(161, 225, 202, 0.2);
    border-radius: 10px;
    .flex {
      display: flex;
      margin-bottom: 10px;
      .key {
        width: 30%;
      }
      .value {
        .apr {
          font-weight: 700;
          font-size: 16px;
          line-height: 20px;
          text-align: right;
          color: #00945d;
        }
        img {
          padding-bottom: 2px;
          margin-right: 5px;
        }
        width: 70%;
        text-align: end;
      }
    }
  }
`;
