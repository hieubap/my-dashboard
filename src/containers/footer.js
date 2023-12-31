import React from "react";

function Footer() {
  return (
    <div
      className="container-fluid bg-dark text-light footer wow fadeIn"
      style={{ height: "80px" }}
      data-wow-delay="0.1s"
    >
      <div className="container">
        <div className="copyright">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              © <a className="border-bottom" href="#"></a>
              {/*/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}
              Made by{" "}
              <a className="border-bottom" href="https://htmlcodex.com">
                Hiếu Bắp
              </a>
            </div>
            {/* <div className="col-md-6 text-center text-md-end">
              <div className="footer-menu">
                <a href>Home</a>
                <a href>Cookies</a>
                <a href>Help</a>
                <a href>FQAs</a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
