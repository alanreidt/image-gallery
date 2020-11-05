import React, { useState, useEffect } from 'react';
import './App.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

const API_KEY = 'gTJAO48YcpmrADUyo4opy4ES4g7iDBxx';
const composeGiphyGetUrl = (key: string, tag: string) => `https://api.giphy.com/v1/gifs/random?api_key=${key}&tag=${tag}`;

function requestImageByTag(tag: string) {
  const url = composeGiphyGetUrl(API_KEY, tag);

  return fetch(url);
}

function LoadingButton(props: any) {
  const { isLoading, handleClick } = props;

  return (
    <Button
      variant="success"
      disabled={isLoading}
      onClick={handleClick}
      {...props}
    >
      {isLoading ? 'Загрузка…' : 'Загрузить'}
    </Button>
  );
}

function App() {
  const [isLoading, setLoading] = useState(false);
  const [isErrorAlertVisible, setErrorAlertVisible] = useState(false);
  const [isNotFoundAlertVisible, setNotFoundAlertVisible] = useState(false);
  const [grouped, setGrouped] = useState(false);
  const [toggleButtonText, setToggleButtonText] = useState("Группировать");
  const [tagInputText, setTagInputText] = useState('');
  const [images, setImages] = useState([
    { tag: 'car', src: 'https://media.giphy.com/media/3ov9jWu7BuHufyLs7m/giphy.gif', alt: 'car' },
    { tag: 'car', src: 'https://media.giphy.com/media/Y1ggBG6wpBdwA/giphy.gif', alt: 'car' },
    { tag: 'mouse', src: 'https://media.giphy.com/media/NLuFwZieDxvws/giphy.gif', alt: 'mouse' },
    { tag: 'mouse', src: 'https://media.giphy.com/media/QXh9XnIJetPi0/giphy.gif', alt: 'mouse' },
    { tag: 'night', src: 'https://media.giphy.com/media/3ohze1z1DnmOHVtbgI/giphy.gif', alt: 'night' },
    { tag: 'night', src: 'https://media.giphy.com/media/W8krmZSDxPIfm/giphy.gif', alt: 'night' },
    { tag: 'night', src: 'https://media.giphy.com/media/W8krmZSDxPIfm/giphy.gif', alt: 'night' },
    { tag: 'crazy', src: 'https://media.giphy.com/media/KWzzTbkhDvmQU/giphy.gif', alt: 'crazy' },
    { tag: 'crazy', src: 'https://media.giphy.com/media/XB43a39jYFT6JxjVtR/giphy.gif', alt: 'crazy' },
    { tag: 'football', src: 'https://media.giphy.com/media/l0Exl9psRODcQgaIM/giphy.gif', alt: 'football' },
  ]);

  useEffect(() => {
    if (isLoading) {
      requestImageByTag(tagInputText)
        .then((response) => response.json())
        .then((result) => {
          const { data } = result;

          setLoading(false);

          if (Array.isArray(data)) {
            setNotFoundAlertVisible(true);
            return;
          }

          const imageUrl = data['image_url'];
          const image = {
            tag: tagInputText,
            src: imageUrl,
            alt: tagInputText,
          }

          setImages((images) => [...images, image]);
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

  const handleLoadingButtonClick = () => setLoading(true);

  const handleToggleButtonChange = (event: any) => {
    setGrouped(event.currentTarget.checked);

    const text = event.currentTarget.checked
      ? "Разгруппировать"
      : "Группировать";

    setToggleButtonText(text);
  }

  return (
    <div className="App">
      <div className="TopBar d-flex py-4 justify-content-center">
        <Form name="top-bar-form" inline>
          <Form.Label htmlFor="tag" srOnly>Введите тег</Form.Label>
          <Form.Control
            name="tag"
            id="tag"
            className="mr-sm-2"
            placeholder="Введите тег"
            value={tagInputText}
            onChange={handleTagInputChange}
          />
          {/* <Button className="mr-sm-2" variant="success">Загрузить</Button> */}
          <LoadingButton
            className="mr-2"
            isLoading={isLoading}
            handleClick={handleLoadingButtonClick}
          />
          <Button
            className="mr-sm-2"
            variant="danger"
            onClick={handleClearButtonClick}
          >
            Очистить
          </Button>
          <ButtonGroup toggle>
            <ToggleButton
              type="checkbox"
              value="grouped"
              checked={grouped}
              onChange={handleToggleButtonChange}
            >
              {toggleButtonText}
            </ToggleButton>
          </ButtonGroup>
        </Form>
      </div>

      <Container fluid="xl">
        <Alert
          variant="danger"
          show={isErrorAlertVisible}
          onClose={() => setErrorAlertVisible(false)}
          dismissible
        >
          <Alert.Heading>Произошла http ошибка!</Alert.Heading>
          <p>
            Попробуйте повторить запрос, либо проверьте интернет соединение.
          </p>
        </Alert>
        <Alert
          variant="warning"
          show={isNotFoundAlertVisible}
          onClose={() => setNotFoundAlertVisible(false)}
          dismissible
        >
          <Alert.Heading>По тегу ничего не найдено</Alert.Heading>
          <p>
            Попробуйте тег 'cat' — наверняка, что-либо найдется.
          </p>
        </Alert>
      </Container>

      <div className="PhotoGrid" hidden={grouped}>
        <Container fluid="xl">
          <Row xl="3">
            {images.map((image) => (
              <Col className="mb-4">
                <Card as={'a'} href="#" className="p-1 h-100" data-tag={image.tag} onClick={handleImageCardClick}>
                  <Card.Img src={image.src} alt={image.alt} style={{ maxHeight: '300px' }} />
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <div className="PhotoGridGrouped" hidden={!grouped}>
        <Container fluid="xl">
          {[...imagesByTag.entries()].map(([tag, images]) => (
            <Card className="mb-2">
              <Card.Header>{tag}</Card.Header>
              <Row xl="3">
                {images.map((image: any) => (
                  <Col className="mb-4">
                    <Card as={'a'} href="#" className="p-1 h-100" data-tag={image.tag} onClick={handleImageCardClick}>
                      <Card.Img src={image.src} alt={image.alt} style={{ maxHeight: '300px' }} />
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          ))}
        </Container>
      </div>
    </div>
  );
}

export default App;
