import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/Home'
import Update from './component/Update'
import './App.css';

function App() {
  return(
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/update/:_id' element={<Update/>}/>
        </Routes>
      </BrowserRouter>
  </div>
  )


  
}

export default App;
