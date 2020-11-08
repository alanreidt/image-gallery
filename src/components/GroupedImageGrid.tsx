import React from 'react';
import Card from 'react-bootstrap/Card';

import { ImageGrid } from './ImageGrid';
import {
  ImageGridProps,
  ImageInterface,
} from '../utils/constants';

export function GroupedImageGrid(props: ImageGridProps) {
  const {
    images,
    handleImageCardClick,
  } = props;

  const imagesByTag = images.reduce(
    (map: Map<ImageInterface['tag'], ImageInterface[]>, currentImage) => {
      const { tag } = currentImage;
      const images = map.get(tag);

      if (images !== undefined) {
        map.set(tag, [...images, currentImage]);
      } else {
        map.set(tag, [currentImage]);
      }

      return map;
    },
    new Map()
  );

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
