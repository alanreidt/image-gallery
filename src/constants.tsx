export interface ImageInterface {
  id: string;
  src: string;
  tag: string;
  alt: string;
}

export type ImageGridProps = {
  images: ImageInterface[];
  handleImageCardClick: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
};
