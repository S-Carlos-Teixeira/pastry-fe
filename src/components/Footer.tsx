import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faTwitter,
  faInstagram
} from '@fortawesome/free-brands-svg-icons'
import logo from '../../assets/img/logo.svg'

function Footer() {
  return (
    <footer className="mt-5 pt-4">
      <Container>
        <Row>
          <Col md={3}>
            <img
              className="img-fluid "
              src={logo}
              alt="logo"
              style={{ width: '10rem' }}
            />
          </Col>
          <Col md={3}>
            <h2>About Us</h2>
            <p>
              We're the Tabata Camily Confectionery Company... Based in the UK
              our job is to bring you the BEST tasting confectionery, at the
              best prices, delivered straight to you door.
            </p>
          </Col>
          <Col md={3}>
            <h2>Visit Us</h2>
            <p>4499 Sporer Street</p>
            <p>North Bennettbury, UK QY22 2CZ</p>
          </Col>
          <Col md={3}>
            <h2>Follow Us</h2>
            <div className="d-flex">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} size="lg" className="mx-3" />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faTwitter} size="lg" className="mx-3" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  size="lg"
                  className="mx-3"
                />
              </a>
            </div>
            <p>Stay up to date with our latest creations!</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-center">
              <p>
                &copy; 2023 Tabata Fernandes Confectionary. All rights reserved.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
