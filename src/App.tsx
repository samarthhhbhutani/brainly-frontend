import './App.css'
import { Dashboard } from './Pages/Dashboard'
import { Home } from './Pages/Home'
import { Signin } from './Pages/Signin'
import { Signup } from './Pages/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { YoutubeDashboard } from './Pages/Yt'
import { TwitterDashboard } from './Pages/Twitter'
import ShareDashboard from './Pages/Share'


function App() {
  return (
    <div>
    <BrowserRouter>
    
    <Routes>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/dashboard/youtube' element={<YoutubeDashboard/>}></Route>
      <Route path='/dashboard/twitter' element={<TwitterDashboard/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/signin' element={<Signin/>}></Route>
      <Route path="/" element={<Home/>}></Route>
      <Route path="*" element={<Home/>}></Route>
      <Route path="/share/:shareId" element={<ShareDashboard/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
