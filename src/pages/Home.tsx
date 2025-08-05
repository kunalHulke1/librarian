import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Our Library
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A comprehensive digital solution for managing library operations,
          book circulation, and member services with ease and efficiency.
        </p>
        <Link to="/login" className="btn-primary text-lg px-8 py-3">
          Get Started
        </Link>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">System Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-lg font-semibold mb-4">For Members</h3>
              <p className="text-gray-600">
                Search and discover books, check availability, manage borrowed
                items, and track your reading history.
              </p>
            </div>
          </div>
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-lg font-semibold mb-4">For Librarians</h3>
              <p className="text-gray-600">
                Complete library operations including book management, member
                services, payment collection, and circulation control.
              </p>
            </div>
          </div>
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-lg font-semibold mb-4">For Owners</h3>
              <p className="text-gray-600">
                Business oversight with financial reports, asset tracking, and
                comprehensive analytics for informed decision making.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 bg-gray-900 text-white text-center py-16 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg mb-8">
          Join our library community and experience seamless book management
        </p>
        <Link to="/register" className="bg-white text-gray-900 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors">
          Create Account
        </Link>
      </div>
    </Layout>
  );
};

export default Home;