import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './pages/home/Home.js'
import SignIn from './pages/singIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import WriteBlog from './pages/Blog/writeBlog';
import UpdateBlog from './pages/Blog/updateBlog';
import MyBlog from './pages/Blog/myBlog';
import Contact from './pages/contact/contact';
import AboutUs from './pages/aboutUs/aboutUs';
// function Home() {
//   return (
//     <div>home</div>
//   )
// }
function App() {
  return (
    <>
    <BrowserRouter>
     <Routes>
       <Route path="/" element={<Home/>}></Route>
       <Route path="/signin" element={<SignIn/>}></Route>
       <Route path="/signup" element={<SignUp/>}></Route>
       <Route path="/writeblog" element={<WriteBlog/>}></Route>
       <Route path="/myblogs" element={<MyBlog/>}></Route>
       <Route path="/writeblog/:blogId" element={<UpdateBlog/>}></Route>
       <Route path="/contact" element={<Contact/>}></Route>
       <Route path="/aboutus" element={<AboutUs/>}></Route>


     </Routes>
    </BrowserRouter> 
  </>
  );
}

export default App;
