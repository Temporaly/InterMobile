import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../App.css'
import pfp from '../vendor/eze.jpeg'

function JesusCard() {
  return (
    <Card style={{ backgroundColor: '#3A95B5', marginBottom: '5%' }}>
      <Card.Body>
        <Card.Title>Jesus Manuel Hidalgo</Card.Title>
        <Card.Img class="Cardpfp" src={pfp} />
        <Card.Text>
          Clase de Química - 10 Inc.
        </Card.Text>
        <Button variant="primary">Contactar</Button>
      </Card.Body>
    </Card>
  );
}

export default JesusCard;