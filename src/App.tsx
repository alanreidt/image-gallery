import React, { useState, useEffect } from 'react';
import './App.css';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import { TopBar } from './components/TopBar';
import { ImageGrid } from './components/ImageGrid';
import { GroupedImageGrid } from './components/GroupedImageGrid';

const API_KEY = 'GoyWRXL2P2hOgo4MQmrKROqrX1S3vVFI';
const composeGiphyGetUrl = (key: string, tag: string) => `https://api.giphy.com/v1/gifs/random?api_key=${key}&tag=${tag}`;

function requestImageByTag(tag: string) {
  const url = composeGiphyGetUrl(API_KEY, tag);

  return fetch(url);
}

export function LoadingButton(props: any) {
  const { isLoading, handleClick, ...restProps } = props;

  return (
    <Button
      variant="success"
      disabled={isLoading}
      onClick={handleClick}
      {...restProps}
    >
      {isLoading ? 'Загрузка…' : 'Загрузить'}
    </Button>
  );
}

function App() {
  const initialImages: any[] = [];

  const [isLoading, setLoading] = useState(false);
  const [errorAlertShown, setErrorAlertShown] = useState(false);
  const [notFoundAlertShown, setNotFoundAlertShown] = useState(false);
  const [grouped, setGrouped] = useState(false);
  const [tagInputText, setTagInputText] = useState('');
  const [images, setImages] = useState(initialImages);

  useEffect(() => {
    if (isLoading) {
      requestImageByTag(tagInputText)
        .then((response) => response.json())
        .then((result) => {
          const { data } = result;

          if (Array.isArray(data)) {
            setLoading(false);
            setNotFoundAlertShown(true);
            return;
          }

          const {
            id,
            'image_url': src,
          } = data;

          const image = {
            id,
            src,
            tag: tagInputText,
            alt: tagInputText,
          }

          setImages((images) => [...images, image]);
          setLoading(false);
        }).catch(() => {
          setErrorAlertShown(true);
        });
    }
  }, [isLoading, tagInputText]);

  const imagesByTag = images.reduce(
    (map, current) => {
      const { tag, ...image } = current;

      let images = map.get(tag);

      if (images !== undefined) {
        map.set(tag, [...images, image]);
      } else {
        map.set(tag, [image]);
      }

      return map;
    },
    new Map()
  );

  const handleTagInputChange = (event: any) => {
    setErrorAlertShown(false);
    setNotFoundAlertShown(false);
    setTagInputText(event.target.value);
  }

  const handleImageCardClick = (event: any) => {
    event.preventDefault();

    const card = event.target.closest('.card');

    setTagInputText(card.dataset.tag);
  }

  const handleClearButtonClick = () => {
    setTagInputText('');
    setImages([]);
  }

  const handleFormSubmit = (event: any) => {
    event.preventDefault();

    setLoading(true)
  };

  const handleGroupingButtonChange = (event: any) => {
    setGrouped(event.currentTarget.checked);
  }

  const imageGrid = (
    <ImageGrid
      images={images}
      handleImageCardClick={handleImageCardClick}
    />
  );
  const groupedImageGrid = (
    <GroupedImageGrid
      imagesByTag={imagesByTag}
      handleImageCardClick={handleImageCardClick}
    />
  );

  return (
    <div className="App">
      <TopBar
        tagInputText={tagInputText}
        isLoading={isLoading}
        grouped={grouped}
        handleFormSubmit={handleFormSubmit}
        handleTagInputChange={handleTagInputChange}
        handleClearButtonClick={handleClearButtonClick}
        handleGroupingButtonChange={handleGroupingButtonChange}
      />

      <Container fluid="xl">
        <Alert
          variant="danger"
          show={errorAlertShown}
          onClose={() => setErrorAlertShown(false)}
          dismissible
        >
          <Alert.Heading>Произошла http ошибка!</Alert.Heading>
          <p>
            Попробуйте повторить запрос, либо проверьте интернет соединение.
          </p>
        </Alert>
        <Alert
          variant="warning"
          show={notFoundAlertShown}
          onClose={() => setNotFoundAlertShown(false)}
          dismissible
        >
          <Alert.Heading>По тегу ничего не найдено</Alert.Heading>
          <p>
            Попробуйте тег 'cat' — наверняка, что-либо найдется.
          </p>
        </Alert>

        {grouped ? groupedImageGrid : imageGrid}
      </Container>
    </div>
  );
}

export default App;
