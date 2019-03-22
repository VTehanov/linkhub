import * as React from 'react'

import { Project } from '../../types'
import styled from 'styled-components'

interface ProjectProps {
  project: Project
}

export const ProjectCard: React.SFC<ProjectProps> = ({ project }) => (
  <StyledProjectCard>
    <h1 className="Project__title">{project.name}</h1>
    <p className="Project__content">{project.description}</p>
  </StyledProjectCard>
)

const StyledProjectCard = styled.article`
  font-size: 1em;
  padding: 2em;
  border-radius: 0.5em;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.1);

  .Project__name {
    margin: 0;
    font-size: 1.5em;
    font-family: 'PT Sans';
    color: ${props => props.theme.textColor};
    text-transform: capitalize;
  }

  .Project__description {
    font-family: 'PT Serif';
    color: ${props => props.theme.textColor};
    text-transform: capitalize;
  }
`

export default Project
