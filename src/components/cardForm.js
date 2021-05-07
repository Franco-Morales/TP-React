import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';

import { Button, Card, Col, Form, } from 'react-bootstrap';


export default function CardForm(props) {
    const [datos, setDatos] = useState(props.objConfig);
    const [file, setFile] = useState();

    useEffect(() => {
        setDatos(props.objConfig)
    }, [props.objConfig])

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        });
    }
    const handleInputFileChange = (event) => {
        let file = event.target.files[0];
        setFile(file);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(file) {
            let formData = new FormData();
            for (const key in datos) {
                if (Object.hasOwnProperty.call(datos, key)) {
                    // const element = datos[key];
                    // console.log('key',key, " value: ",datos[key]);
                    formData.append(key,datos[key]);
                }
            }
            formData.append('img',file);
            
            if(props.objConfig.id) {
                // 
                fetch(`http://localhost:8080/api/v1/crud/instrumento/editar-con-foto/${props.objConfig.id}`,{
                method:'PUT',
                body: formData
                })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(e => console.error(e));
            } else {
                fetch('http://localhost:8080/api/v1/crud/instrumento/crear-con-foto/',{
                method:'POST',
                body: formData
                })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(e => console.error(e));
            }
        } else {
            if(props.objConfig.id) {
                fetch(`http://localhost:8080/api/v1/crud/instrumento/${props.objConfig.id}`, {
                    method:'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(datos)
                })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(e => console.error(e));
            } else {
                fetch('http://localhost:8080/api/v1/crud/instrumento/',{
                    method:'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(datos)
                })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(e => console.error(e));
            }
        }
    }

    /**
     * Limpia el formulario
     * @param {Event} event 
     */
    const resetForm = (event) => {
        event.preventDefault();
        setDatos({
            instrumento: "",
            marca: "",
            modelo: "",
            precio: 0,
            costoEnvio: 0,
            cantidadVendida: 0,
            descripcion: "",
            id: 0
        });
    }

    return (
        <Fragment>
            <Card>
                <Card.Body>
                    <Form onSubmit={onSubmit}>
                        <Form.Group controlId="formGroupNombre">
                            <Form.Label>Instrumento: </Form.Label>
                            <Form.Control type="text" placeholder="Nombre" name="instrumento" value={datos.instrumento} onChange={handleInputChange}/>
                        </Form.Group>

                        <Form.Group controlId="formGroupMarca">
                            <Form.Label>Marca: </Form.Label>
                            <Form.Control type="text" placeholder="Marca" name="marca" value={datos.marca} onChange={handleInputChange}/>
                        </Form.Group>
                        <Form.Group controlId="formGroupModelo">
                            <Form.Label>Modelo: </Form.Label>
                            <Form.Control type="text" placeholder="Modelo" name="modelo" value={datos.modelo} onChange={handleInputChange}/>
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGroupPrecio">
                                <Form.Label>Precio: </Form.Label>
                                <Form.Control type="number" placeholder="Precio" name="precio" value={datos.precio} onChange={handleInputChange}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGroupCantidad">
                                <Form.Label>Cantidad: </Form.Label>
                                <Form.Control type="number" placeholder="Cantidad" name="cantidadVendida" value={datos.cantidadVendida} onChange={handleInputChange}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGroupEnvio">
                                <Form.Label>Envio: </Form.Label>
                                <Form.Control type="number" placeholder="Costo de Envio" name="costoEnvio" value={datos.costoEnvio} onChange={handleInputChange}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="formGroupDesc">
                            <Form.Label>Descripcion: </Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Descripcion" name="descripcion" value={datos.descripcion} onChange={handleInputChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.File id="img" name="img" label="Imagen del producto" onChange={handleInputFileChange}/>
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Button variant="success" type="submit" className="btn-block">
                                    Enviar
                                </Button>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Button variant="outline-info" role="button" className="btn-block" onClick={resetForm}>
                                    Limpiar
                                </Button>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Card.Body>
            </Card>
        </Fragment>
    );
}