import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Header.scss";

function Header() {
  return (
    <header className="header text-white">
      <div className="container">
        <div className="header-cnt">
          <div className="header-cnt-top fs-13 py-2 flex align-center justify-between">
            <div className="header-cnt-top-l">
              <ul className="flex top-links align-center">
                <li className="flex align-center">
                  <span className="fs-13">Follow us on</span>
                  <ul className="social-links flex align-center">
                    <li className="mx-2">
                      <a
                        href="https://www.facebook.com"
                        target="_blank"
                        className="fs-15"
                        rel="noreferrer"
                      >
                        <i className="fab fa-facebook"></i>
                      </a>
                    </li>
                    <li className="mx-2">
                      <a
                        href="https://www.instagram.com"
                        target="_blank"
                        className="fs-15"
                        rel="noreferrer"
                      >
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div className="header-cnt-bottom">
            <Navbar />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
