export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  paymentStatus: 'current' | 'due' | 'overdue';
  paymentDate?: string;
  booksIssued: number;
  status: 'active' | 'overdue' | 'new';
  outstandingFines: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  subject: string;
  isbn: string;
  price: number;
  description?: string;
  totalCopies: number;
  availableCopies: number;
  issuedCopies: number;
}

export interface BookCopy {
  id: string;
  bookId: string;
  copyNumber: string;
  rackLocation: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  status: 'available' | 'issued';
  addedDate: string;
  lastBorrowed?: string;
  notes?: string;
}

export interface IssueRecord {
  id: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  copyId: string;
  memberId: string;
  memberName: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'current' | 'returned' | 'overdue';
  fineAmount: number;
  finePaid: boolean;
}

export interface PaymentRecord {
  id: string;
  memberId: string;
  memberName: string;
  type: 'fee' | 'fine' | 'both';
  amount: number;
  method: 'cash' | 'card' | 'upi' | 'netbanking';
  date: string;
  receiptNumber: string;
}

export interface DashboardStats {
  totalBooks: number;
  totalCopies: number;
  availableCopies: number;
  issuedBooks: number;
  totalMembers: number;
  activeMembers: number;
  overdueBooks: number;
  todayCollections: number;
  outstandingFines: number;
}