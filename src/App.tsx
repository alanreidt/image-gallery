import React from 'react';
import './App.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Alert from 'react-bootstrap/Alert';

function App() {
  const images = [
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
  ];
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
  const grouped = true;

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
          />
          <Button className="mr-sm-2" variant="success">Загрузить</Button>
          <Button className="mr-sm-2" variant="danger">Очистить</Button>
          <Button>Группировать</Button>
        </Form>
      </div>

      <Container fluid="xl">
        {/* <Alert variant="danger" onClose="" dismissible> */}
        <Alert variant="danger" show={true} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            Change this and that and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
          </p>
        </Alert>
      </Container>

      <div className="PhotoGrid" hidden={grouped}>
        <Container fluid="xl">
          <Row xl="3">
            {images.map((image) => (
              <Col className="mb-4">
                <Card className="p-1 h-100">
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
              <CardColumns>
                {images.map((image: any) => (
                  <Card className="p-1">
                    <Card.Img src={image.src} alt={image.alt}/>
                  </Card>
                ))}
              </CardColumns>
            </Card>
          ))}
        </Container>
      </div>
    </div>
  );
}

export default App;
