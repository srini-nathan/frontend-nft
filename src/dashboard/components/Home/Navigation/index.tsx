import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar, logUserOut } from "../../../../apollo";

import logo from "../../../../assets/contoso.jpg";
import { Logo } from "./styled";

export const Navigation = ({user}:{user:string}) => {
  const isLoggedIn = isLoggedInVar();
  let location = useLocation();
  const history = useHistory();

  const handleLogout = () => {
    logUserOut();
    history.push("/login");
  };

  function render() {
    let pathName = location.pathname;

    return (
      <Navbar bg="dark" variant="dark" expand="md" fixed="top">
        <Container>
          <Navbar.Brand>
            <Logo src={logo} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mr-auto">
              <Nav.Link as={Link} href="/" to="/" active={pathName === "/"}>
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                href="/profile"
                to="/profile"
                active={pathName === "/profile"}
              >
                Profile
              </Nav.Link>
              <Nav.Link
                as={Link}
                href="/students"
                to="/students"
                active={pathName === "/students"}
              >
                Students
              </Nav.Link>
              <Nav.Link
                as={Link}
                href="/courses"
                to="/courses"
                active={pathName === "/courses"}
              >
                Courses
              </Nav.Link>
            </Nav>
            {!isLoggedIn ? (
              <>
                <Navbar.Text>
                  Signed in as: <span className="text-white">{user}</span>
                </Navbar.Text>
                <Nav.Link as={Link} href="/login" to="/login">
                  <span className="text-white" onClick={handleLogout}>
                    Logout
                  </span>
                </Nav.Link>
              </>
            ) : (
              ""
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  return render();
}
export default Navigation;
