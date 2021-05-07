import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';

import Navigation from './navigation';
import CardForm from "./cardForm";

export default function Abm(props) {
    const [instrumentos, setInstrumentos] = useState([]);

    const [objAux, setObjAux] = useState({
        instrumento: "",
        marca: "",
        modelo: "",
        precio: 0,
        costoEnvio: 0,
        cantidadVendida: 0,
        descripcion: "",
        id: 0
    });

    let getAllInst = () => {
        fetch('http://localhost:8080/api/v1/crud/instrumento/')
            .then(response => response.json())
            .then(data => setInstrumentos(data))
            .catch(e => console.error(e));
    };
    
    useEffect(() => {
        getAllInst();
    }, []);


    const deleteOne = (id,e) => {
        e.preventDefault();
        e.stopPropagation();

        let r = window.confirm('¿Esta seguro de eliminar el instruento?');

        if (r) {
            fetch(`http://localhost:8080/api/v1/crud/instrumento/${id}`, {method:'DELETE'})
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(e => console.error(e));
        }
    }

    const editOne = (obj,e) => {
        e.preventDefault();
        e.stopPropagation();
        setObjAux(obj);
    }


    return (
        <Fragment>
            <Navigation />
            <Container className="my-5">
                <Row>
                    <Col xs={12} lg={8}>
                        {/* Table */}
                        <Table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Instrumento</th>
                                    <th>Marca</th>
                                    <th>Modelo</th>
                                    <th>Precio</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {instrumentos.map( (inst, index) => 
                                <tr key={index}>
                                    <td>{inst.id}</td>
                                    <td>{inst.instrumento}</td>
                                    <td>{inst.marca}</td>
                                    <td>{inst.modelo}</td>
                                    <td>{inst.precio}</td>
                                    <td>
                                        <Button variant="warning" onClick={(e)=> editOne(inst,e)}>Editar</Button>
                                        <Button variant="danger" className="ml-3" onClick={(e) => deleteOne(inst.id, e)}>Eliminar</Button>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                        {/* EndTable */}
                    </Col>
                    <Col xs={12} lg={4}>
                        <CardForm objConfig={objAux}/>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}