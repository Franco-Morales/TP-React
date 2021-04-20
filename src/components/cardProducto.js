import React from 'react';
import { useHistory } from "react-router-dom";

import { Card, Col, Row } from 'react-bootstrap';

import "../assets/css/cardProducto.css";


export default function CardProducto (props) {
    
    let history = useHistory();
    let instrumento = props.element;

    function redirect(e,id) {
        e.preventDefault();
        history.push(`/producto/${id}`);
    }

    return (
        <Card className="mb-5 shadow-sm">
            <Row className="no-gutters">
                <Col md={4}>
                    <img src={`images/${instrumento.imagen}`} alt="Imagen instrumento" onClick={(e)=>redirect(e,instrumento.id)}/>
                </Col>
                <Col md={8}>
                    <Card.Body>
                        <Card.Title>{instrumento.instrumento}</Card.Title>
                        <Card.Text className="font-weight-bold">
                            {instrumento.precio}$
                        </Card.Text>
                        {(instrumento.costoEnvio !== 'G')? (
                            <p className="text-warning">Costo de Envio Interior de Argentina : {instrumento.costoEnvio}$</p>
                        ) : (
                            <div className="wrap">
                                <img src={'images/camion.png'} alt="Camión Icono"/>
                                <p className="text-success icon"> Envio Gratis a todo el pais</p>
                            </div>
                        )}
                        <Card.Text>
                            {instrumento.cantidadVendida} vendidos
                        </Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}