import React, { useState, useEffect } from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import { TopBar } from './components/TopBar';
import { ImageGrid } from './components/ImageGrid';
import { GroupedImageGrid } from './components/GroupedImageGrid';
import { ImageInterface, AppConfig } from './constants';

const GIPHY_API_KEY = 'GoyWRXL2P2hOgo4MQmrKROqrX1S3vVFI';
const composeGiphyGetUrl = (key: string, tag: ImageInterface['tag']) => `https://api.giphy.com/v1/gifs/random?api_key=${key}&tag=${tag}`;

function requestImageByTag(tag: ImageInterface['tag']) {
  const url = composeGiphyGetUrl(GIPHY_API_KEY, tag);

  return fetch(url);
}

function App(props: AppConfig = {}) {
  const {
    initialImages = [],
    initialGrouped = false,
  } = props;

  const [isLoading, setLoading] = useState(false);
  const [errorAlertShown, setErrorAlertShown] = useState(false);
  const [notFoundAlertShown, setNotFoundAlertShown] = useState(false);
  const [grouped, setGrouped] = useState(initialGrouped);
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

          const image: ImageInterface = {
            id,
            src,
            tag: tagInputText,
            alt: tagInputText,
          };

          setImages((images) => [...images, image]);
          setLoading(false);
        }).catch(() => {
          setErrorAlertShown(true);
        });
    }
  }, [isLoading, tagInputText]);

  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorAlertShown(false);
    setNotFoundAlertShown(false);
    setTagInputText(event.currentTarget.value);
  };

  const handleImageCardClick = (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    event.preventDefault();

    const tag = event.currentTarget.dataset.tag || '';

    setTagInputText(tag);
  };

  const handleClearButtonClick = () => {
    setTagInputText('');
    setImages([]);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true)
  };

  const handleGroupingButtonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGrouped(event.currentTarget.checked);
  };

  const imageGrid = (
    <ImageGrid
      images={images}
      handleImageCardClick={handleImageCardClick}
    />
  );
  const groupedImageGrid = (
    <GroupedImageGrid
      images={images}
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
