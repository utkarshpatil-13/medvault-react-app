import { useState } from 'react'
import './App.css'
import HomePageImg from './assets/home_page.png'
import Home from './components/Home/Home'
import { Header } from './components/Header'
import { Outlet } from 'react-router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}

export default App
