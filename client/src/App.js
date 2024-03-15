import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/Home';
import AllCabs from "./components/Cabs/AllCabs";
import CabsForm from './components/Cabs/CabsForm';
import EditBookingPage from './components/Bookings/EditBookingPage';
import BookingForm from './components/Bookings/BookingForm';
import AllBookings from './components/Bookings/AllBookings'
import EditCabPage from './components/Cabs/EditCabPage'
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/allCabs" element={<AllCabs/>} /> 
          <Route path="/addCabs" element={<CabsForm/>} />
          <Route path="/edit-cab/:cabId" element={<EditCabPage/>} />
          <Route path="/addBooking" element={<BookingForm/>} />
          <Route path="/allBookings" element={<AllBookings/>} />
          <Route path="/edit-booking/:bookingId" element={<EditBookingPage/>} />
          <Route path="/" element={<Home/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
