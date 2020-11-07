import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export function GroupedImageGrid(props: any) {
  const {
    imagesByTag,
    handleImageCardClick,
  } = props;

  return (
    <div className="GroupedImageGrid">
      {[...imagesByTag.entries()].map(([tag, images]) => (
        <Card className="mb-2">
          <Card.Header>{tag}</Card.Header>
          <Row sm="3">
            {images.map((image: any) => (
              <Col className="mb-4">
                <Card as={'a'} href="#" className="p-1 h-100" data-tag={image.tag} onClick={handleImageCardClick}>
                  <Card.Img src={image.src} alt={image.alt} style={{ maxHeight: '300px' }} />
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      ))}
    </div>
  );
}
