import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GoogleSearchLikeFeature from './components/GoogleSearchLikeFeature'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <GoogleSearchLikeFeature />
    </>
  )
}

export default App
