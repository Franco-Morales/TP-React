import React, { Fragment, useEffect, useState } from 'react';

import { Col, Container, Jumbotron, Row } from 'react-bootstrap';

import Navigation from "./navigation";
import CardProducto from "./cardProducto";
import Ubicacion from "./ubicacion";


export default function Home(props) {
    const [instrumentos, setInstrumentos] = useState([]);

    let getAllInst = () => {
        fetch('http://localhost:8080/api/v1/crud/instrumento/')
            .then(response => response.json())
            .then(data => setInstrumentos(data))
            .catch(e => console.error(e));
    };
    
    useEffect(() => {
        getAllInst();
    }, []);

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