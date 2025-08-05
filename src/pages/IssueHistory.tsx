import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import StatCard from '../components/UI/StatCard';
import StatusBadge from '../components/UI/StatusBadge';
import { mockIssueRecords } from '../data/mockData';

const IssueHistory: React.FC = () => {
  const [dateFrom, setDateFrom] = useState('2025-07-01');
  const [dateTo, setDateTo] = useState('2025-08-03');
  const [statusFilter, setStatusFilter] = useState('all');
  const [memberFilter, setMemberFilter] = useState('');

  const filteredRecords = mockIssueRecords.filter(record => {
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesMember = memberFilter === '' || 
                         record.memberName.toLowerCase().includes(memberFilter.toLowerCase()) ||
                         record.memberId.includes(memberFilter);
    
    return matchesStatus && matchesMember;
  });

  const totalTransactions = mockIssueRecords.length;
  const currentIssued = mockIssueRecords.filter(r => r.status === 'current').length;
  const returned = mockIssueRecords.filter(r => r.status === 'returned').length;
  const overdue = mockIssueRecords.filter(r => r.status === 'overdue').length;
  const finesCollected = mockIssueRecords
    .filter(r => r.finePaid)
    .reduce((sum, r) => sum + r.fineAmount, 0);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'current': return 'info';
      case 'returned': return 'success';
      case 'overdue': return 'danger';
      default: return 'default';
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
        <div className="card-body">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Issue History</h1>
          <p className="text-gray-600">Complete transaction history of all book issues and returns</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard title="Total Transactions" value={totalTransactions} />
        <StatCard title="Currently Issued" value={currentIssued} color="default" />
        <StatCard title="Returned" value={returned} color="success" />
        <StatCard title="Overdue" value={overdue} color="danger" />
        <StatCard title="Fines Collected" value={`₹${finesCollected}`} />
      </div>

      {/* Filters */}
      <div className="card mb-8">
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-gray-900"
              >
                <option value="all">All Transactions</option>
                <option value="current">Currently Issued</option>
                <option value="returned">Returned</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Member</label>
              <input
                type="text"
                value={memberFilter}
                onChange={(e) => setMemberFilter(e.target.value)}
                placeholder="Search member..."
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-gray-900"
              />
            </div>
            <div className="flex items-end">
              <button className="btn-primary w-full">Apply Filters</button>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="card">
        <div className="card-header flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
          <span className="text-sm text-gray-500">Showing {filteredRecords.length} transactions</span>
        </div>
        <div className="card-body overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Book Details
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Member
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Copy ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Issue Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Due Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Return Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Fine
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 border-b border-gray-200">
                  <td className="px-4 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{record.bookTitle}</div>
                      <div className="text-sm text-gray-500 italic">by {record.bookAuthor}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{record.memberName}</div>
                      <div className="text-sm text-gray-500">{record.memberId}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <strong className="text-gray-900">#{record.copyId}</strong>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {formatDate(record.issueDate)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {formatDate(record.dueDate)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {record.returnDate ? formatDate(record.returnDate) : '-'}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge 
                      status={record.status} 
                      variant={getStatusVariant(record.status)} 
                    />
                  </td>
                  <td className="px-4 py-4">
                    {record.fineAmount > 0 ? (
                      <span className={`font-medium ${record.finePaid ? 'text-green-600' : 'text-red-600'}`}>
                        ₹{record.fineAmount} {record.finePaid ? '(Paid)' : ''}
                      </span>
                    ) : (
                      <span className="text-gray-500">₹0</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button className="btn-secondary text-xs px-3 py-1">View</button>
                      {record.status === 'current' ? (
                        <button className="btn-secondary text-xs px-3 py-1">Return</button>
                      ) : (
                        <button className="btn-secondary text-xs px-3 py-1">Receipt</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRecords.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No transaction records found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default IssueHistory;