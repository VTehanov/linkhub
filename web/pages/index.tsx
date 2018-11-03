import Project from '../components/Project/ProjectCard';
import ProjectGrid from '../styles/ProjectGrid';
import ProjectForm from '../components/Project/ProjectForm';

const Home = () => (
  <ProjectGrid>
    <Project project={{
      title: 'sample title',
      content: 'lorem ipsum dolor'
    }} />

    <Project project={{
      title: 'sample title',
      content: 'lorem ipsum dolor'
    }} />

    <Project project={{
      title: 'sample title',
      content: 'lorem ipsum dolor'
    }} />

    <ProjectForm />
  </ProjectGrid>
);

export default Home;