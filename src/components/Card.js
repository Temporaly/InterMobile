import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../App.css'


function UserCard() {
  return (
    <Card style={{ backgroundColor: '#3A95B5' }}>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Card.Img>

        </Card.Img>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default UserCard;