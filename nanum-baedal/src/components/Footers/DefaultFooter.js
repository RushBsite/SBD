/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <>
      <footer className="footer footer-default">
        <Container>
          <nav>
            <ul>
              <li>
                <a
                  href="https://github.com/RushBsite/SBD"
                  target="_blank"
                >
                  github.com/RushBsite/SBD
                </a>
              </li>
            </ul>
          </nav>
          <div className="copyright" id="copyright">
            © {new Date().getFullYear()}, Designed by{"Goorm-team5"}

            . Coded by{" "}

              Goorm-team5
            .
          </div>
        </Container>
      </footer>
    </>
  );
}

export default DefaultFooter;