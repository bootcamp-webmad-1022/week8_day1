import { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import coastersService from "../../services/coasters.service"

const NewCoasterForm = ({ fireFinalActions }) => {

    const [coasterData, setCoasterData] = useState({
        title: '',
        description: '',
        length: 0,
        inversions: 0,
        imageUrl: ''
    })

    const handleInputChange = e => {
        const { name, value } = e.target
        setCoasterData({ ...coasterData, [name]: value })
    }

    const handleFormSubmit = e => {
        e.preventDefault()

        coastersService
            .saveCoaster(coasterData)
            .then(() => {
                fireFinalActions()
            })
            .catch(err => console.error(err))
    }

    const { title, description, length, inversions, imageUrl } = coasterData


    return (
        <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" value={title} onChange={handleInputChange} name="title" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="desc">
                <Form.Label>Descripción</Form.Label>
                <Form.Control type="text" value={description} onChange={handleInputChange} name="description" />
            </Form.Group>

            <Row>
                <Col>

                    <Form.Group className="mb-3" controlId="inv">
                        <Form.Label>Inversiones</Form.Label>
                        <Form.Control type="number" value={inversions} onChange={handleInputChange} name="inversions" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="len">
                        <Form.Label>Longitud</Form.Label>
                        <Form.Control type="number" value={length} onChange={handleInputChange} name="length" />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3" controlId="image">
                <Form.Label>Imagen (URL)</Form.Label>
                <Form.Control type="url" value={imageUrl} onChange={handleInputChange} name="imageUrl" />
            </Form.Group>

            <div className="d-grid">
                <Button variant="dark" type="submit">Crear montaña rusa</Button>
            </div>
        </Form>
    )
}

export default NewCoasterForm