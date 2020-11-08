import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import { TopBarProps } from '../utils/constants';

export function TopBar(props: TopBarProps) {
  const {
    tagInputText,
    isLoading,
    grouped,
    handleFormSubmit,
    handleTagInputChange,
    handleClearButtonClick,
    handleGroupingButtonChange,
  } = props;

  return (
    <div className="TopBar d-flex py-4 justify-content-center">
      <Form name="top-bar-form" inline onSubmit={handleFormSubmit}>
        <Form.Label htmlFor="tag" srOnly>Введите тег</Form.Label>
        <Form.Control
          name="tag"
          id="tag"
          className="mr-2"
          placeholder="Введите тег"
          value={tagInputText}
          onChange={handleTagInputChange}
          required
        />
        <Button
          type="submit"
          className="mr-2"
          variant="success"
          disabled={isLoading}
        >
          {isLoading ? 'Загрузка…' : 'Загрузить'}
        </Button>
        <Button
          className="mr-2"
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
            onChange={handleGroupingButtonChange}
          >
            {grouped ? 'Разгруппировать' : 'Группировать'}
          </ToggleButton>
        </ButtonGroup>
      </Form>
    </div>
  );
}
