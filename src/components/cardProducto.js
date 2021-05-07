import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

import "../assets/css/cardProducto.css";


export default function CardProducto (props) {
    
    let history = useHistory();
    let instrumento = props.element;

    function redirect(e,id) {
        e.preventDefault();
        history.push(`/producto/${id}`);
    }

    const [instImg, setInstImg] = useState('images/notImg.png');

    const getImage = (id) => {
        fetch(`http://localhost:8080/api/v1/crud/instrumento/uploads/img/${id}`)
            .then(response => {
                if(response.status !== 500) setInstImg(response.url) ;
            })
            .catch(e => console.error('error',e));
    }

    useEffect(() => {
        getImage(instrumento.id);
    }, [instrumento.id])

    return (
        <Card className="mb-5 shadow" style={{border:"none"}}>
            <Row className="no-gutters">
                <Col md={4}>
                    <img src={instImg} alt="Imagen instrumento" id="img-product" onClick={(e)=>redirect(e,instrumento.id)}/>
                </Col>
                <Col md={8}>
                    <Card.Body>
                        <Card.Title>{instrumento.instrumento}</Card.Title>
                        <Card.Text className="font-weight-bold">
                            {instrumento.precio}$
                        </Card.Text>
                        {(instrumento.costoEnvio !== 0)? (
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