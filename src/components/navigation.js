import React from 'react'

import { Navbar, Nav, Container } from "react-bootstrap";


export default function Navigation(props) {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/home#mapa">¿Dónde estamos?</Nav.Link>
                        <Nav.Link href="/home#productos">Productos</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}