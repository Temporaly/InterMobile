import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import { Modal, Button } from 'react-bootstrap';

const QRCodeScanner = () => {
  const [result, setResult] = useState('');
  const [showCredits, setShowCredits] = useState(false);

  const handleError = (err) => {
    console.error(err);
  };

  const handleScan = (data) => {
    if (data) {
      setResult(data);
      setShowCredits(true); // Show credits modal when QR code is scanned
    }
  };

  const handleCloseCredits = () => {
    setShowCredits(false);
    setResult(''); // Clear the result when closing the modal
  };

  return (
    <div>
      <div style={{ width: '100%', height: 'auto', marginTop: "5%" }}>
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      </div>

      {/* Modal for showing scanned result */}
      <Modal show={showCredits} onHide={handleCloseCredits}>
        <Modal.Header closeButton>
          <Modal.Title>QR Code Scanned</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{`Scanned Result: ${result}`}</p>
          <p>Your app credits go here.</p>
          {/* Add more details about credits as necessary */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCredits}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default QRCodeScanner;
