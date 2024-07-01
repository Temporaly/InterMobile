import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../App.css'
import pfp from '../vendor/juli.jpeg'

function CasimCard() {
  return (
    <Card style={{ backgroundColor: '#3A95B5', marginBottom: '5%' }}>
      <Card.Body>
        <Card.Title>Casimiro Saavedra</Card.Title>
        <Card.Img class="Cardpfp" src={pfp} />
        <Card.Text>
          Clase de Lengua - 3 Inc.
        </Card.Text>
        <Button variant="primary">Contactar</Button>
      </Card.Body>
    </Card>
  );
}

export default CasimCard;