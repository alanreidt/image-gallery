import React from 'react';
import Card from 'react-bootstrap/Card';

export function ImageCard(props: any) {
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
