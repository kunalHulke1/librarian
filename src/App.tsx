import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import LibrarianDashboard from './pages/LibrarianDashboard';
import BooksCatalog from './pages/BooksCatalog';
import UserManagement from './pages/UserManagement';
import IssueHistory from './pages/IssueHistory';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/librarian-dashboard" element={<LibrarianDashboard />} />
          <Route path="/books-catalog" element={<BooksCatalog />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/issue-history" element={<IssueHistory />} />
          
          {/* Placeholder routes for other pages */}
          <Route path="/register" element={<div>Register Page - Coming Soon</div>} />
          <Route path="/forgot-password" element={<div>Forgot Password Page - Coming Soon</div>} />
          <Route path="/add-book" element={<div>Add Book Page - Coming Soon</div>} />
          <Route path="/add-member" element={<div>Add Member Page - Coming Soon</div>} />
          <Route path="/issue-book" element={<div>Issue Book Page - Coming Soon</div>} />
          <Route path="/return-book" element={<div>Return Book Page - Coming Soon</div>} />
          <Route path="/collect-payment" element={<div>Collect Payment Page - Coming Soon</div>} />
          <Route path="/overdue-books" element={<div>Overdue Books Page - Coming Soon</div>} />
          <Route path="/add-book-copy" element={<div>Add Book Copy Page - Coming Soon</div>} />
          <Route path="/profile" element={<div>Profile Page - Coming Soon</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;