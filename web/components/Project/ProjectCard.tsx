import * as React from 'react';

import StyledProject from './StyledProject';


interface ProjectProps {
  project: {
    title: string,
    content: string
  }
}

const Project: React.SFC<ProjectProps> = ({ project }) => (
  <StyledProject>
    <h1 className="Project__title">{project.title}</h1>
    <p className="Project__content">{project.content}</p>
  </StyledProject>
);

export default Project;