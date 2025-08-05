import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import StatCard from '../components/UI/StatCard';
import StatusBadge from '../components/UI/StatusBadge';
import { mockBooks } from '../data/mockData';

const BooksCatalog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.isbn.includes(searchQuery);
    
    const matchesSubject = subjectFilter === 'all' || book.subject.toLowerCase() === subjectFilter;
    
    const matchesAvailability = availabilityFilter === 'all' ||
                               (availabilityFilter === 'available' && book.availableCopies > 0) ||
                               (availabilityFilter === 'out-of-stock' && book.availableCopies === 0);
    
    return matchesSearch && matchesSubject && matchesAvailability;
  });

  const totalBooks = mockBooks.length;
  const totalCopies = mockBooks.reduce((sum, book) => sum + book.totalCopies, 0);
  const availableCopies = mockBooks.reduce((sum, book) => sum + book.availableCopies, 0);
  const issuedCopies = mockBooks.reduce((sum, book) => sum + book.issuedCopies, 0);

  return (
    <Layout 
      title="Library Management System"
      showBackButton
      backTo="/librarian-dashboard"
      userRole="Librarian"
      userName="Sarah Johnson"
    >
      {/* Page Header */}
      <div className="card mb-8">
        <div className="card-body flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Books Catalog</h1>
            <p className="text-gray-600">Complete library inventory with copy management</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/add-book" className="btn-primary">
              + Add New Book
            </Link>
            <Link to="/add-book-copy" className="btn-secondary">
              + Add Copy
            </Link>
          </div>
        </div>
      </div>

      {/* Inventory Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard title="Total Books" value={totalBooks} />
        <StatCard title="Total Copies" value={totalCopies} />
        <StatCard title="Available" value={availableCopies} color="success" />
        <StatCard title="Currently Issued" value={issuedCopies} color="warning" />
        <StatCard title="Rack Locations" value={8} />
      </div>

      {/* Filters */}
      <div className="card mb-8">
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Books</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Title, author, or ISBN..."
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-gray-900"
              >
                <option value="all">All Subjects</option>
                <option value="programming">Programming</option>
                <option value="science">Science</option>
                <option value="literature">Literature</option>
                <option value="history">History</option>
                <option value="mathematics">Mathematics</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-gray-900"
              >
                <option value="all">All Books</option>
                <option value="available">Available</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="btn-primary w-full">Apply Filters</button>
            </div>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="card">
        <div className="card-header flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Library Catalog</h2>
          <span className="text-sm text-gray-500">Showing {filteredBooks.length} books</span>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div key={book.id} className="border-2 border-gray-200 rounded-lg p-6 hover:border-gray-900 hover:shadow-md transition-all duration-200">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{book.title}</h3>
                  <p className="text-gray-600 italic mb-2">by {book.author}</p>
                  <StatusBadge status={book.subject} variant="info" />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">ISBN</div>
                    <div className="font-medium text-gray-900">{book.isbn}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Price</div>
                    <div className="font-medium text-gray-900">₹{book.price}</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-gray-900">{book.totalCopies}</div>
                      <div className="text-xs text-gray-500 uppercase">Total</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-green-600">{book.availableCopies}</div>
                      <div className="text-xs text-gray-500 uppercase">Available</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-red-600">{book.issuedCopies}</div>
                      <div className="text-xs text-gray-500 uppercase">Issued</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <button className="btn-secondary text-xs px-3 py-1">View</button>
                  <button className="btn-secondary text-xs px-3 py-1">Edit</button>
                  {book.availableCopies === 0 ? (
                    <button className="btn-primary text-xs px-3 py-1">Add Copy</button>
                  ) : (
                    <button className="btn-secondary text-xs px-3 py-1">Copies</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No books found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BooksCatalog;