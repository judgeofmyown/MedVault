import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Homepage/Home';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </>
  );
}

export default App;
