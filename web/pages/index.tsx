import Post from '../components/Post/Post';
import PostGrid from '../styles/PostGrid';
import PostForm from '../components/Post/PostForm';

const Home = () => (
  <PostGrid>
    <Post post={{
      title: 'sample title',
      content: 'lorem ipsum dolor'
    }} />

    <Post post={{
      title: 'sample title',
      content: 'lorem ipsum dolor'
    }} />

    <Post post={{
      title: 'sample title',
      content: 'lorem ipsum dolor'
    }} />

    <PostForm />
  </PostGrid>
);

export default Home;