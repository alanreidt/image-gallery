import React from 'react';
import './App.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function App() {
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
