import { GIPHY_API_KEY, ImageInterface } from './constants';

const composeGiphyGetUrl = (key: string, tag: ImageInterface['tag']) => `https://api.giphy.com/v1/gifs/random?api_key=${key}&tag=${tag}`;

function requestImageByTag(tag: ImageInterface['tag']) {
  const url = composeGiphyGetUrl(GIPHY_API_KEY, tag);

  return fetch(url);
}

export {
  composeGiphyGetUrl,
  requestImageByTag,
}
