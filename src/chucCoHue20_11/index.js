import { useEffect, useRef, useState } from "react";
import "./style.css";
import mainLogo from "./download.jpg";

export default () => {
  const [fontSize, setFontSize] = useState("3.5vw");
  const refTimeout = useRef();

  useEffect(() => {
    window.addEventListener("resize", function () {
      this.clearTimeout(refTimeout.current);
      refTimeout.current = this.setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        setFontSize(width > height ? "3vh" : "3.5vw");
      }, 500);
    });
  }, []);

  return (
    <div className="App">
      <img
        src="https://phunuvietnam.mediacdn.vn/179072216278405120/2022/9/8/1dai-hoc-bach-khoa-ha-no-1662551195810678616357-1662628589326-1662628590575152609796.jpg"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          width: "100vw",
          height: "100vh",
        }}
      />
      <div className="birthdayCard">
        <div className="cardFront">
          <h3 className="happy">HAPPY Teacher's day</h3>
          <div className="balloons">
            <div className="balloonOne" />
            <div className="balloonTwo" />
            <div className="balloonThree" />
            <div className="balloonFour" />
          </div>
          <div className="background">
            <img src={mainLogo} alt="" />
          </div>
        </div>
        <div className="cardInside">
          <h3 className="back">Kính gửi cô Tạ Thị Kim Huệ,</h3>
          <p style={{ marginBottom: 5, fontSize }}>
            Nhân dịp Ngày Nhà giáo Việt Nam 20/11
          </p>
          <p style={{ marginTop: 5, fontSize }}>
            Em xin gửi đến cô lời chúc mừng chân thành và sâu sắc nhất. Cô Huệ
            là một người giáo viên và sếp tuyệt vời. Cô luôn tận tâm, nhiệt
            huyết với nghề, luôn truyền cho chúng em những kiến thức quý giá,
            bồi dưỡng nhân cách, giúp chúng em trở thành những người có ích cho
            xã hội. Cô là một người sếp tâm lý, luôn quan tâm đến đời sống của
            nhân viên. Cô luôn tạo điều kiện cho chúng em phát huy hết khả năng
            của mình. Em xin chân thành cảm ơn cô vì những hy sinh và cống hiến
            cao cả. Chúc cô luôn dồi dào sức khỏe, hạnh phúc, tiếp tục dìu dắt
            những thế hệ học trò thành người, tiếp tục phát triển công ty ngày
            càng vững mạnh. Kính chúc cô 20/11 vui vẻ, tràn ngập yêu thương và
            hạnh phúc!
          </p>
          <p className="name" style={{ fontSize }}>
            <strong>Học sinh của cô: Tuấn & Hiếu & Hưng & Sơn</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
