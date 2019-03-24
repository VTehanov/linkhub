import { Me } from '../components/Auth/Me'
import { MyProjects } from '../components/Project/MyProjects'
import Project from '../components/Project/ProjectCard'
import Link from 'next/link'

const ProfilePage = () => (
  <Me>
    {() => (
      <MyProjects>
        {({ data }) => {
          const { projects } = data.myProjects

          return projects.map((project: Project) => (
            <Link
              as={`/project/${project.id}`}
              href={`/project?id=${project.id}`}
            >
              <a>
                <div>
                  <h1>{project.name}</h1>
                  <p>{project.description}</p>
                </div>
              </a>
            </Link>
          ))
        }}
      </MyProjects>
    )}
  </Me>
)

export default ProfilePage
