import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PokerTable from './Pages/PokerTable';
import Homepage from './Pages/CardGamesHomepage';
import PokerRooms from './Pages/PokerRooms';
import { ChipsProvider } from './ChipsContext';

function App() {
  return (
    <ChipsProvider>
      <Router>
        <div className="">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/poker" element={<PokerTable />} />
            <Route path="/Rooms" element={<PokerRooms />} />
          </Routes>
        </div>
      </Router>
    </ChipsProvider>
  );
}

export default App;