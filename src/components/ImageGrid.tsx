import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ImageCard } from './ImageCard';

export function ImageGrid(props: any) {
  const {
    images,
    handleImageCardClick,
  } = props;

  return (
    <div className="ImageGrid">
      <Row sm="3">
        {images.map((image: any) => (
          <Col key={image.id} className="mb-4">
            <ImageCard
              image={image}
              handleImageCardClick={handleImageCardClick}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
