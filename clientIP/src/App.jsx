import {Routes, Route} from "react-router-dom"
import {ToastContainer} from "react-toastify"
///user pages
import HomePage from './pages/user/HomePage'
import Profile from "./pages/user/Profile"
import Login from "./pages/user/Login"
import Register from "./pages/user/Register"

import ProfilePage from "./pages/user/ProfilePage"
import MyWorks from "./pages/user/MyWorks"
import Vocation from "./pages/user/Vocation"

import ITPage from "./pages/user/ITPage"
import TeachPage from "./pages/user/TeachPage"
import HandPage from "./pages/user/HandPage"
import CarPage from "./pages/user/CarPage"
import ElectrPage from "./pages/user/ElectrPage"
import ForEachJob from "./pages/user/ForEachJob"
import VocationPage from "./pages/user/VocationPage"

import Chat from "./pages/user/Chat/Chat"
import ChatForUser from "./pages/user/Chat-for-user/ChatForUser"
import GptButton from "./components/gpt-button/GptButton"


import './App.css'

function App() {

  return (
    <>
      <Routes>

          <Route path="/" element={<HomePage/>}/>


          <Route path="/profile" element={<Profile/>}>
            <Route index element={<ProfilePage/>}/>
            <Route path="/profile/my-works" element={<MyWorks/>}/>
            <Route path="/profile/my-voc" element={<Vocation/>}/>



          </Route>


          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>



          {/**work pages */}

          <Route path="/it" element={<ITPage/>}/>
          <Route path="/teach" element={<TeachPage/>}/>
          <Route path="/hand" element={<HandPage/>}/>
          <Route path="/car" element={<CarPage/>}/>
          <Route path="/electr" element={<ElectrPage/>}/>
          <Route path="/job/:id" element={<ForEachJob/>}/>

          <Route path="/vocation" element={<VocationPage/>}/>

          <Route path="/chat/:id" element={<Chat/>}/>
          <Route path="/chat" element={<ChatForUser/>}/>


      </Routes>

      <GptButton/>

      <ToastContainer/>
    </>
  )
}

export default App