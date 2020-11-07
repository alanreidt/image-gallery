import React from 'react';
import Card from 'react-bootstrap/Card';

import { ImageGrid } from './ImageGrid';

export function GroupedImageGrid(props: any) {
  const {
    imagesByTag,
    handleImageCardClick,
  } = props;

  return (
    <div className="GroupedImageGrid">
      {[...imagesByTag.entries()].map(([tag, images]) => (
        <Card key={tag} className="mb-2">
          <Card.Header>{tag}</Card.Header>
          <ImageGrid
            images={images}
            handleImageCardClick={handleImageCardClick}
          />
        </Card>
      ))}
    </div>
  );
}
