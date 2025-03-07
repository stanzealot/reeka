import { useEffect, useRef, useState } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import axios from 'axios';


function App() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/property');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
   
    </Router>

    
 
  );
}

export default App;
