import React, { Fragment } from 'react';

import Navigation from "./navigation";
import CardProducto from "./cardProducto";
import Ubicacion from "./ubicacion";

import { instrumentos } from "../assets/json/instrumentos.json";
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';


export default function Home(props) {

    return (
        <Fragment>
            <Navigation />
            <Container>
                <Row>
                    <Col>
                        <Jumbotron className="my-5">
                            <h1>Bienvenidos </h1>
                            <p>
                                Musical Hendrix es una tienda de instrumentos musicales con ya más de 15 años de experiencia. Tenemos el conocimiento y la capacidad como para informarte acerca de las mejores elecciones para tu compra musical.
                            </p>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <section id="mapa" className="mb-5">
                            <h2>¿Dónde estamos?</h2>
                            <Ubicacion />
                        </section>
                    </Col>
                </Row>
                <Row>
                    <Col> 
                        <section id="productos">
                            <h2 className="mb-4">Productos destacados</h2>
                            { instrumentos.map( (instrumento,index) => <CardProducto key={index} element={instrumento}/> ) } 
                        </section>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}