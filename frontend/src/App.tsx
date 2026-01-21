import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import DashboardLogin from './pages/dashboard/Login';
import Dashboard from './pages/dashboard/Dashboard';
import ReservationDetail from './pages/dashboard/ReservationDetail';
import AinorAdminLogin from './pages/ainor-admin/Login';
import AinorAdminOverview from './pages/ainor-admin/Overview';
import CreateRestaurant from './pages/ainor-admin/CreateRestaurant';
import RestaurantDetails from './pages/ainor-admin/RestaurantDetails';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Existing homepage - kept exactly as-is */}
        <Route path="/" element={<HomePage />} />
        
        {/* Dashboard routes */}
        <Route path="/dashboard/login" element={<DashboardLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/reservations/:reservationId" element={<ReservationDetail />} />
        
        {/* AINOR Admin routes */}
        <Route path="/ainor-admin/login" element={<AinorAdminLogin />} />
        <Route path="/ainor-admin" element={<AinorAdminOverview />} />
        <Route path="/ainor-admin/restaurants/new" element={<CreateRestaurant />} />
        <Route path="/ainor-admin/restaurants/:id" element={<RestaurantDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
