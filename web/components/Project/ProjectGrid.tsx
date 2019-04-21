import { SFC } from 'react'
import styled from 'styled-components'

import { Project } from '../../types'
import { ProjectCard } from './ProjectCard'

interface IProps {
  projects: Project[]
}

export const ProjectGrid: SFC<IProps> = ({ projects }) => (
  <StyledProjectGrid>
    {projects.map(project => (
      <ProjectCard key={project.id} project={project} />
    ))}
  </StyledProjectGrid>
)

const StyledProjectGrid = styled.div`
  display: flex;
  flex-direction: column;
`
