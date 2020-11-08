import React from 'react';
import Card from 'react-bootstrap/Card';

interface Image {
  id: string;
  src: string;
  tag: string;
  alt: string;
}

type ImageCardProps = {
  image: Image;
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
