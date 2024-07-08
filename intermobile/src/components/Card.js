import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../App.css';

const UserCard = ({ user }) => {
  return (
    <Card style={{ backgroundColor: '#3A95B5', marginBottom: '5%' }}>
      <Card.Body>
        <Card.Title>{user.Username}</Card.Title>
        <Card.Img class="Cardpfp" src={user.Foto} />
        <Card.Text className='paddedBott'>
          {user.ClaseText}
        </Card.Text>
        <Button variant="primary">Contactar</Button>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
