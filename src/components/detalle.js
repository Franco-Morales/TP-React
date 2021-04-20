import React, { Fragment } from 'react';
import { useParams } from "react-router-dom";

import { Button, Col, Container, Row } from 'react-bootstrap';

import { instrumentos } from "../assets/json/instrumentos.json";
import  "../assets/css/detalle.css";
import Navigation from "./navigation";




export default function Detalle () {

    let { id } = useParams();
    let producto = instrumentos.filter(obj => obj.id === id)[0];

    return (
        <Fragment>
            <Navigation></Navigation>
            <Container className="mt-5">
                <Row>
                    <Col xs lg={8}>
                        <img src={`../../images/${producto.imagen}`} alt="Imagen Producto" />
                        <h4>Descripción</h4>
                        <p>{producto.descripcion}</p>
                    </Col>
                    <Col xs lg={4}>
                        <p className="text-muted">{producto.cantidadVendida} vendidos</p>
                        <h4>{producto.instrumento}</h4>
                        <p className="display-4">{producto.precio}$</p>
                        <p>Marca: {producto.marca}</p>
                        <p>Modelo: {producto.modelo}</p>
                        {(producto.costoEnvio !== 'G')? (
                            <p className="text-warning">Costo de Envio Interior de Argentina : {producto.costoEnvio}$</p>
                        ) : (
                            <div className="wrap">
                                <img src={'../../images/camion.png'} alt="Camión Icono"/>
                                <p className="text-success icon"> Envio Gratis </p>
                            </div>
                        )}
                        <Button variant="outline-primary" className="mt-5">Agregar al carrito</Button>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}