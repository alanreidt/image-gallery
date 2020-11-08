export interface ImageInterface {
  id: string;
  src: string;
  tag: string;
  alt: string;
}

export type ImageCardProps = {
  image: ImageInterface;
  handleImageCardClick: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
};

export type ImageGridProps = {
  images: ImageInterface[];
  handleImageCardClick: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
};
