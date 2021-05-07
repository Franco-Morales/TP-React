import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Button, Col, Container, Row } from 'react-bootstrap';

import  "../assets/css/detalle.css";

import Navigation from "./navigation";


export default function Detalle () {

    let { id } = useParams();

    //det = detalle
    const [det, setDet] = useState({});
    //img
    const [detImg, setDetImg] = useState('../../images/notImg.png');

    let getOneInst = (id) => {
        fetch(`http://localhost:8080/api/v1/crud/instrumento/${id}`)
            .then(response => response.json())
            .then(data => setDet(data))
            .catch(e => console.error(e));

        fetch(`http://localhost:8080/api/v1/crud/instrumento/uploads/img/${id}`)
            // .then(response => response.json())
            .then(response => {
                if(response.status !== 500) setDetImg(response.url) ;
            })
            .catch(e => console.error('error',e));
        
    };

    useEffect(() => {
        getOneInst(id);
    }, [id])

    return (
        <Fragment>
            <Navigation></Navigation>
            <Container className="mt-5">
                <Row>
                    <Col xs lg={8}>
                        <img src={detImg} alt="Imagen Producto" />
                        <h4>Descripción</h4>
                        <p>{det.descripcion}</p>
                    </Col>
                    <Col xs lg={4}>
                        <p className="text-muted">{det.cantidadVendida} vendidos</p>
                        <h4>{det.instrumento}</h4>
                        <p className="display-4">{det.precio}$</p>
                        <p>Marca: {det.marca}</p>
                        <p>Modelo: {det.modelo}</p>
                        {(det.costoEnvio !== 0)? (
                            <p className="text-warning">Costo de Envio Interior de Argentina : {det.costoEnvio}$</p>
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