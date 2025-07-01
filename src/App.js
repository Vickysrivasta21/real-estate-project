import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropertyList from "./components/PropertyList";
import PropertyDetails from "./components/PropertyDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PropertyList />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
    </Router>
  );
}

export default App;


import PropertyDetails from './pages/PropertyDetails'; 

<Route path="/property/:id" element={<PropertyDetails />} />

