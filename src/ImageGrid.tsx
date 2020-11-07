import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export function ImageGrid(props: any) {
  const {
    images,
    handleImageCardClick,
  } = props;

  return (
    <div className="ImageGrid">
      <Row sm="3">
        {images.map((image: any) => (
          <Col className="mb-4">
            <Card as={'a'} href="#" className="p-1 h-100" data-tag={image.tag} onClick={handleImageCardClick}>
              <Card.Img src={image.src} alt={image.alt} style={{ maxHeight: '300px' }} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
