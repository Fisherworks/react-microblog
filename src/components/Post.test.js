import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Post from './Post';

test('it renders all the components of the post', () => {
  const post = {
    text: 'hello',
    author: {username: 'susan', avatar_url: 'https://example.com/avatar/susan'},
    timestamp: '2022-01-01T00:00:00.000Z',
  };

  render(
    <BrowserRouter>
      <Post post={post} />
    </BrowserRouter>
  );

  const message = screen.getByText('hello');
  const authorLink = screen.getByText('susan');
  const avatar = screen.getByAltText('susan');
  const timestamp = screen.getByText(/.* ago$/);

  expect(message).toBeInTheDocument();
  expect(authorLink).toBeInTheDocument();
  expect(authorLink).toHaveAttribute('href', '/user/susan');
  expect(avatar).toBeInTheDocument();
  expect(avatar).toHaveAttribute('src', 'https://example.com/avatar/susan&s=48');
  expect(timestamp).toBeInTheDocument();
  expect(timestamp).toHaveAttribute(
    'title', 'Sat Jan 01 2022 00:00:00 GMT+0000 (Greenwich Mean Time)');
});
