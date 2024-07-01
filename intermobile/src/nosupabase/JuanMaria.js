import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../App.css'
import pfp from '../vendor/bech.jpeg'

function JuanMarCard() {
  return (
    <Card style={{ backgroundColor: '#3A95B5', marginBottom: '5%' }}>
      <Card.Body>
        <Card.Title>Juan Maria Ferre</Card.Title>
        <Card.Img class="Cardpfp" src={pfp} />
        <Card.Text>
          Clase de Educación Judía - 7 Inc.
        </Card.Text>
        <Button variant="primary">Contactar</Button>
      </Card.Body>
    </Card>
  );
}

export default JuanMarCard;