import * as React from 'react'
import { rgba } from 'polished'
import { Project } from '../../types'
import styled from 'styled-components'
import Link from 'next/link'

interface ProjectProps {
  project: Project
}

export const ProjectCard: React.SFC<ProjectProps> = ({ project }) => {
  const { name, description, tags } = project

  return (
    <StyledProjectCard>
      <h1 className="name">{name}</h1>
      <p className="language">Javascript</p>
      <div className="tags">
        {tags &&
          tags.map(tag => (
            <div className="tag" key={tag.id}>
              <Link
                href={{
                  pathname: '/project/search',
                  query: {
                    tags: tag.slug
                  }
                }}
              >
                <a>{tag.name}</a>
              </Link>
            </div>
          ))}
      </div>
      <p className="description">{description}</p>
      <div className="delimeter" />
      <Link
        as={`/project/${project.slug}`}
        href={`/project/?slug=${project.slug}`}
      >
        <a className="view-project-link">View Project</a>
      </Link>
    </StyledProjectCard>
  )
}

const StyledProjectCard = styled.article`
  width: 400px;
  padding: 100px 40px 40px;
  box-sizing: border-box;
  text-align: center;
  background-color: white;
  box-shadow: 0 5px 10px ${rgba('#434343', 0.1)};

  .name {
    margin: 0;
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 24px;
    color: #383838;
  }

  .language {
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 16px;
    color: #88cdff;
  }

  .tags {
    .tag {
      display: inline-block;
      margin-bottom: 8px;
      padding: 5px 10px;
      border: 1px solid #88cdff;
      border-radius: 25px;
      font-family: 'Roboto';
      font-size: 14px;
      cursor: pointer;

      ~ .tag {
        margin-left: 5px;
      }

      a {
        text-decoration: none;
        color: #383838;
      }
    }
  }

  .description {
    font-family: 'Roboto';
    font-size: 16px;
    line-height: 1.4;
    color: #383838;
  }

  .delimeter {
    width: 60px;
    margin: 0 auto 15px;
    border: 2px solid #ffd3d3;
  }

  .view-project-link {
    text-decoration: none;
    text-transform: uppercase;
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 700;
    color: #383838;
  }
`

export default Project
