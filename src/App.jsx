import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <HomeScreen /> } />
      </Routes>
    </>
  )
}

export default App
