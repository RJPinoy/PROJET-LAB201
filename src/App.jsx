import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/Home';
import AdminBackOffice from './screens/AdminBackOffice';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <HomeScreen /> } />
        <Route path="/admin" element={ <AdminBackOffice /> } />
      </Routes>
    </>
  )
}

export default App