import './App.css'
import logo from '/logo.png'
import { Button } from '@chakra-ui/react'

function App() {
  return (
    <>
      <Button>Click on me!</Button>
      <img src={logo} className="logo" alt="Vite logo" />
    </>
  )
}

export default App
