import React from 'react';
import './App.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
    </div>
  );
}

export default App;
