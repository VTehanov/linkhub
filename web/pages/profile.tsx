import { Me } from '../components/Auth/Me'

const ProfilePage = () => <Me>{({ data }) => <p>{data.me.email}</p>}</Me>

export default ProfilePage
