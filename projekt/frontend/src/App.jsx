import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-red-500 text-white p-10 text-2xl">
      Ako vidiš crvenu pozadinu — Tailwind radi!
    </div>
  );
}

export default App
