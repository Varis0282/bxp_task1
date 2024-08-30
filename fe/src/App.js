import './App.css';
import { Loader, Navbar } from './components';
import { Home, Tickets } from './pages';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div className="App">
      {loading && <Loader />}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/myTickets' element={<Tickets />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
