import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import StatCard from '../components/UI/StatCard';
import StatusBadge from '../components/UI/StatusBadge';
import { mockMembers } from '../data/mockData';

const UserManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  const filteredMembers = mockMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.phone.includes(searchQuery) ||
                         member.id.includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || member.paymentStatus === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const totalMembers = mockMembers.length;
  const activeMembers = mockMembers.filter(m => m.status === 'active').length;
  const paymentDue = mockMembers.filter(m => m.paymentStatus === 'due' || m.paymentStatus === 'overdue').length;
  const newMembers = mockMembers.filter(m => m.status === 'new').length;

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'overdue': return 'danger';
      case 'new': return 'info';
      default: return 'default';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'text-green-600';
      case 'due': return 'text-yellow-600';
      case 'overdue': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">User Management</h1>
            <p className="text-gray-600">Manage library members and their account status</p>
          </div>
          <Link to="/add-member" className="btn-primary mt-4 md:mt-0">
            + Add New Member
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Members" value={totalMembers} />
        <StatCard title="Active Members" value={activeMembers} color="success" />
        <StatCard title="Payment Due" value={paymentDue} color="warning" />
        <StatCard title="New This Month" value={newMembers} color="info" />
      </div>

      {/* Filters */}
      <div className="card mb-8">
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Members</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Name, email, or phone..."
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-gray-900"
              >
                <option value="all">All Members</option>
                <option value="active">Active</option>
                <option value="overdue">Payment Overdue</option>
                <option value="new">New Members</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-gray-900"
              >
                <option value="all">All Status</option>
                <option value="current">Current</option>
                <option value="due">Due Soon</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="btn-primary w-full">Apply Filters</button>
            </div>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="card">
        <div className="card-header flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Library Members</h2>
          <span className="text-sm text-gray-500">Showing {filteredMembers.length} total members</span>
        </div>
        <div className="card-body overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Member ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Member Info
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Join Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Payment Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Books Issued
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, index) => (
                <tr key={member.id} className="hover:bg-gray-50 border-b border-gray-200">
                  <td className="px-4 py-4">
                    <strong className="text-gray-900">{member.id}</strong>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-900">{member.phone}</td>
                  <td className="px-4 py-4 text-gray-900">{formatDate(member.joinDate)}</td>
                  <td className="px-4 py-4">
                    <span className={`font-medium ${getPaymentStatusColor(member.paymentStatus)}`}>
                      {member.paymentStatus === 'current' && member.paymentDate && 
                        `Current (${formatDate(member.paymentDate)})`}
                      {member.paymentStatus === 'due' && 'Due Soon'}
                      {member.paymentStatus === 'overdue' && member.paymentDate && 
                        `Overdue (${formatDate(member.paymentDate)})`}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-900">{member.booksIssued} books</td>
                  <td className="px-4 py-4">
                    <StatusBadge 
                      status={member.status} 
                      variant={getStatusVariant(member.status)} 
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button className="btn-secondary text-xs px-3 py-1">View</button>
                      {member.paymentStatus === 'overdue' || member.paymentStatus === 'due' ? (
                        <Link 
                          to={`/collect-payment?member=${member.id}`}
                          className="btn-primary text-xs px-3 py-1"
                        >
                          Collect Fee
                        </Link>
                      ) : (
                        <button className="btn-secondary text-xs px-3 py-1">Edit</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No members found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserManagement;