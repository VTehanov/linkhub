import * as React from 'react';

import StyledPost from './StyledPost';


interface PostProps {
  post: {
    title: string,
    content: string
  }
}

const Post: React.SFC<PostProps> = ({ post }) => (
  <StyledPost>
    <h1 className="title">{post.title}</h1>
    <p>{post.content}</p>
  </StyledPost>
);

export default Post;