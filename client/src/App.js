import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Homepage/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import { Register } from './components/Register/Register';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </>
  );
}

export default App;
