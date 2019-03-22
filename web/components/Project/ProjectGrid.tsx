import { SFC } from 'react'
import styled from 'styled-components'

import { Project } from '../../types'
import { ProjectCard } from './ProjectCard'

interface IProps {
  projects: Project[]
}

export const ProjectGrid: SFC<IProps> = ({ projects }) => {
  return (
    <StyledProjectGrid>
      {projects.map(project => (
        <ProjectCard project={project} />
      ))}
    </StyledProjectGrid>
  )
}

const StyledProjectGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`
