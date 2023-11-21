import styled from "styled-components";

export const GlobalStyle = styled.div`
  * {
    --w-card: 90vw;
    --h-card: 80vh;
  }
  .background {
    /* width: 50%; */
    max-width: 400px;
    position: absolute;
    bottom: 0px;
    right: 0;
  }
  .background > img {
    width: 100%;
    object-fit: contain;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #073b4c;
  }

  .birthdayCard {
    position: relative;
    width: var(--w-card);
    height: var(--h-card);
    cursor: pointer;
    transform-style: preserve-3d;
    transform: perspective(2500px);
    transition: 1s;
  }

  .birthdayCard:hover {
    transform: perspective(2500px) rotate(5deg);
    box-shadow: inset 100px 20px 100px rgba(0, 0, 0, 0.2),
      0 10px 100px rgba(0, 0, 0, 0.5);
  }

  .birthdayCard:hover .cardFront {
    transform: rotateY(-160deg);
  }

  .birthdayCard:hover .happy {
    visibility: hidden;
  }

  .cardFront {
    position: relative;
    background-color: #fff;
    width: var(--w-card);
    height: var(--h-card);
    overflow: hidden;
    transform-origin: left;
    box-shadow: inset 100px 20px 100px rgba(0, 0, 0, 0.2),
      30px 0 50px rgba(0, 0, 0, 0.4);
    transition: 0.6s;
  }

  .happy {
    font-family: Tahoma, sans-serif;
    text-align: center;
    margin: 30px;
    background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
    transition: 0.1s;
    backface-visibility: visible;
  }

  .balloons {
    position: absolute;
  }

  .balloonOne,
  .balloonTwo,
  .balloonThree,
  .balloonFour {
    position: absolute;
    width: 85px;
    height: 95px;
    border-radius: 50%;
  }

  .balloonOne {
    background-color: rgb(239, 71, 111, 0.7);
    left: -10px;
    top: 50px;
  }

  .balloonTwo {
    background-color: rgb(6, 214, 160, 0.7);
    left: 50px;
    top: 20px;
  }

  .balloonThree {
    background-color: rgb(255, 209, 102, 0.7);
    left: 110px;
    top: 50px;
  }

  .balloonFour {
    background-color: rgb(17, 138, 178, 0.7);
    left: 170px;
    top: 20px;
  }

  .balloonOne:before,
  .balloonTwo:before,
  .balloonThree:before,
  .balloonFour:before {
    content: "";
    position: absolute;
    width: 1px;
    height: 155px;
    background-color: #ffd166;
    top: 95px;
    left: 43px;
  }

  .balloonOne:after,
  .balloonTwo:after,
  .balloonThree:after,
  .balloonFour:after {
    content: "";
    position: absolute;
    border-right: 7px solid transparent;
    border-left: 7px solid transparent;
    top: 94px;
    left: 37px;
  }

  .balloonOne:after {
    border-bottom: 10px solid #ef476f;
  }

  .balloonTwo:after {
    border-bottom: 10px solid #06d6a0;
  }

  .balloonThree:after {
    border-bottom: 10px solid #ffd166;
  }

  .balloonFour:after {
    border-bottom: 10px solid #118ab2;
  }

  .cardInside {
    position: absolute;
    background-color: #fff;
    width: var(--w-card);
    height: var(--h-card);
    z-index: -1;
    left: 0;
    top: 0;
    box-shadow: inset 100px 20px 100px rgba(0, 0, 0, 0.2);
  }

  p {
    font-family: cursive;
    margin: 40px;
    color: #333;
    font-size: 3.5vw;
  }

  .name {
    /* position: absolute; */
    left: 150px;
    top: 50px;
    color: #333;
  }

  .back {
    font-family: Tahoma, sans-serif;
    font-size: 5vw;
    color: #333;
    text-align: center;
    margin: 30px;
    outline-color: #333;
    outline-style: dotted;
  }
`;
