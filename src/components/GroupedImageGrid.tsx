import React from 'react';
import Card from 'react-bootstrap/Card';

import { ImageGrid } from './ImageGrid';

export function GroupedImageGrid(props: any) {
  const {
    images,
    handleImageCardClick,
  } = props;

  const imagesByTag = images.reduce(
    (map: Map<string, any[]>, current: any) => {
      const { tag, ...image } = current;

      const images = map.get(tag);

      if (images !== undefined) {
        map.set(tag, [...images, image]);
      } else {
        map.set(tag, [image]);
      }

      return map;
    },
    new Map()
  );

  const createCard = ([tag, images]: any[]) => (
    <Card key={tag} className="mb-2">
      <Card.Header>{tag}</Card.Header>
      <ImageGrid
        images={images}
        handleImageCardClick={handleImageCardClick}
      />
    </Card>
  );

  return (
    <div className="GroupedImageGrid">
      {Array.prototype.map.call(
        imagesByTag.entries(),
        createCard,
      )}
    </div>
  );
}
