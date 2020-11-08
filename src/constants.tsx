export interface ImageInterface {
  id: string;
  src: string;
  tag: string;
  alt: string;
}

export interface AppConfig {
  initialImages?: ImageInterface[];
  initialGrouped?: boolean;
}

export type ImageCardProps = {
  image: ImageInterface;
  handleImageCardClick: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
};

export type ImageGridProps = {
  images: ImageInterface[];
  handleImageCardClick: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
};

export type TopBarProps = {
  tagInputText: ImageInterface['tag'];
  isLoading: boolean;
  grouped: boolean;
  handleFormSubmit: React.FormEventHandler<HTMLFormElement>;
  handleTagInputChange: React.ChangeEventHandler<HTMLInputElement>;
  handleClearButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  handleGroupingButtonChange: React.ChangeEventHandler<HTMLInputElement>;
};
