

import './App.css';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/Login';
import { useStateValue } from './StateProvider';
// import { useState } from 'react';

function App() {

  const [{ user }] = useStateValue();
  // const [user, setUser] = useState(null);

  return (
    <div className="App">
      {!user ? (
        <Login/>
      ) : (
        <div className='app_body'>
          <Router>
            <Sidebar />
            <Routes>
              <Route path='/rooms/:roomId' element={<Chat />} />
              <Route path='/' element={<Chat />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
