import { GIPHY_API_KEY, ImageInterface } from './constants';

const composeGiphyGetUrlByKeyAndTag = (apiKey: string) => (tag: ImageInterface['tag']) => (
  `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${tag}`
);

const composeGiphyGetUrlByTag = composeGiphyGetUrlByKeyAndTag(GIPHY_API_KEY);

const requestImageByTag = (tag: ImageInterface['tag']) => {
  const url = composeGiphyGetUrlByTag(tag);

  return fetch(url);
}

export {
  composeGiphyGetUrlByKeyAndTag,
  composeGiphyGetUrlByTag,
  requestImageByTag,
}
