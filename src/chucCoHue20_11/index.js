import { useEffect, useRef, useState } from "react";
import "./style.css";
import mainLogo from "./download.jpg";

export default () => {
  const [fontSize, setFontSize] = useState("3.5vw");
  const refTimeout = useRef();

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setFontSize(width > height ? "3vh" : "3.5vw");
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
          <h3 className="back">Kính gửi cô Tạ Thị Kim Huệ</h3>
          <p style={{ marginBottom: 15, fontSize }}>
            Nhân dịp Ngày Nhà giáo Việt Nam 20/11
          </p>
          <p style={{ marginTop: 5, marginBottom: 5, fontSize }}>
            Với tất cả kỹ năng mà chúng em có😄 Chúng em xin làm tấm thiệp
            online này để gửi đến cô lời chúc mừng chân thành và sâu sắc nhất🤣.
            Cô là một giáo viên và là một người sếp 💖💖💖TUYỆT VỜI💖💖💖. Cô
            luôn tận tâm, nhiệt huyết và là người lái đò đã đưa chúng em cập bến
            thành công⛴🛳🛥. Cô luôn tạo điều kiện cho chúng em phát huy hết khả
            năng của mình. Em xin chân thành cảm ơn cô vì những hy sinh🥺 và
            cống hiến cao cả 🥹🥹🥹. 💝💝💝Chúng em kính chúc cô 20/11 thật nhiều
            niềm vui😁, hạnh phúc💕,luôn dồi dào sức khỏe💪 để tiếp tục dìu dắt
            các thế hệ học trò và chúc công ty đạt được nhiều thành công 🎉🎉🎉
          </p>
          <p
            className="name"
            style={{ fontSize, marginTop: 15, textAlign: "end" }}
          >
            <div>Học trò của cô</div>
            <strong>🧑‍🎓Tuấn & Hiếu & Hưng & Sơn🧑‍🎓</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
