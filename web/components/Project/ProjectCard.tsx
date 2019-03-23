import * as React from 'react'

import { Project } from '../../types'
import styled from 'styled-components'
import Link from 'next/link'

interface ProjectProps {
  project: Project
}

export const ProjectCard: React.SFC<ProjectProps> = ({ project }) => (
  <StyledProjectCard>
    <Link as={`/project/${project.id}`} href={`/project/?id=${project.id}`}>
      <a>
        <h1 className="Project__name">{project.name}</h1>
        <p className="Project__description">{project.description}</p>
      </a>
    </Link>
  </StyledProjectCard>
)

const StyledProjectCard = styled.article`
  font-size: 1em;
  padding: 2em;
  border-radius: 0.5em;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.1);

  a {
    text-decoration: none;
  }

  .Project__name {
    margin: 0;
    font-size: 1.5em;
    font-family: 'PT Sans';
    color: black;
    text-transform: capitalize;
  }

  .Project__description {
    font-family: 'PT Serif';
    color: black;
    text-transform: capitalize;
  }
`

export default Project
