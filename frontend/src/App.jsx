import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Footer from './components/Footer'
import PostDetails from './pages/PostDetails'
import { UserContextProvider } from './context/UserContext'
import LogOut from './pages/LogOut'
import CreatePost from './pages/CreatePost'
import Profile from './pages/Profile'
import EditPost from './pages/EditPost'


const App = () => {
  return (
    
    <UserContextProvider>
    <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/posts/post/:id" element={<PostDetails/>}/>
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/write" element={<CreatePost/>} />
        <Route exact path="/logout" element={<LogOut/>} />
        <Route exact path="/profile/:id" element={<Profile/>} />
        <Route exact path="/edit/:id" element={<EditPost/>} />
        </Routes>
        <Footer/>
    </UserContextProvider>
    
    
    
  )
}

export default App
