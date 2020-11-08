import React from 'react';
import Card from 'react-bootstrap/Card';

import { ImageInterface } from '../constants';

type ImageCardProps = {
  image: ImageInterface;
  handleImageCardClick: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
};

export function ImageCard(props: ImageCardProps) {
  const {
    image,
    handleImageCardClick,
    ...restProps
  } = props;

  const sx = {
    maxHeight: '300px',
  };

  return (
    <Card
      as={'a'}
      href="#"
      className="p-1 h-100"
      data-tag={image.tag}
      onClick={handleImageCardClick}
      {...restProps}
    >
      <Card.Img src={image.src} alt={image.alt} style={sx} />
    </Card>
  );
}
