import * as React from 'react'

import { Project } from '../../types'
import styled from 'styled-components'
import Link from 'next/link'

interface ProjectProps {
  project: Project
}

export const ProjectCard: React.SFC<ProjectProps> = ({ project }) => (
  <Link as={`/project/${project.id}`} href={`/project/?id=${project.id}`}>
    <StyledProjectCard>
      <a>
        <h1 className="name">{project.name}</h1>
        <p className="description">{project.description}</p>
      </a>
    </StyledProjectCard>
  </Link>
)

const StyledProjectCard = styled.article`
  padding-left: 20px;
  cursor: pointer;

  &:hover {
    background-color: ghostwhite;
  }

  & ~ & {
    border-top: 1px solid slategray;
  }
`

export default Project
