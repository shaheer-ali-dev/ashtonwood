'use client';

import { useState, useEffect } from 'react';

interface Submission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  submittedAt: string;
}

interface WaitlistEntry {
  id: string;
  timestamp: string;
  goal: string | string[];
  age: string;
  guardian: string;
  gender: string;
  challenges: string;
  seriousness: string;
  commitment: string;
  experience: string;
  name: string;
  firstName: string;
  lastName: string;
  work: string;
  phone: string;
  email: string;
  instagram: string;
}

interface WaitlistGroup {
  id: number;
  entries: WaitlistEntry[];
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  // REMOVE old waitlistEntries state, it's replaced by waitlistGroups
  // const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'contact' | 'waitlist'>('waitlist');
  const [loading, setLoading] = useState(false);
  const [waitlistGroups, setWaitlistGroups] = useState<WaitlistGroup[]>([]);

  // Email modal / form state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [modalGroupId, setModalGroupId] = useState<number | null>(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailResult, setEmailResult] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWaitlists() {
      const res = await fetch('/api/admin/waitlist');
      const data = await res.json();
      setWaitlistGroups(data.groups || []);
    }
    fetchWaitlists();
  }, []);

  // Fetch submissions after authentication
  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
      // No need to call fetchWaitlistEntries, handled above
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
    }
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/submissions');
      const data = await response.json();

      if (response.ok && data.success) {
        setSubmissions(data.submissions);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  // format date helper remains the same
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Calculate total filled spots for stats banner
  const totalFilled = waitlistGroups.reduce(
    (sum, group) => sum + (Array.isArray(group.entries) ? group.entries.length : 0),
    0
  );

  // Email modal handlers
  const openEmailModal = (groupId: number) => {
    setModalGroupId(groupId);
    setEmailSubject('');
    setEmailMessage('');
    setEmailResult(null);
    setShowEmailModal(true);
  };

  const closeEmailModal = () => {
    setShowEmailModal(false);
    setModalGroupId(null);
    setEmailSubject('');
    setEmailMessage('');
    setEmailResult(null);
  };

  const handleSendEmails = async () => {
    setEmailResult(null);

    if (!emailSubject.trim() || !emailMessage.trim()) {
      setEmailResult('Subject and message are required.');
      return;
    }

    const group = waitlistGroups.find((g) => g.id === modalGroupId);
    const emails = (group?.entries || [])
      .map((e) => e.email)
      .filter((em): em is string => !!em && em.trim().length > 0);

    if (emails.length === 0) {
      setEmailResult('No emails found for this group.');
      return;
    }

    setSendingEmail(true);
    try {
      const response = await fetch('/api/admin/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails, subject: emailSubject, message: emailMessage }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmailResult('Email(s) sent successfully.');
        // optionally close modal after a short delay
        setTimeout(() => {
          closeEmailModal();
        }, 1000);
      } else {
        setEmailResult(data.msg || 'Failed to send emails.');
      }
    } catch (err) {
      console.error('Error sending emails:', err);
      setEmailResult('Failed to send emails.');
    } finally {
      setSendingEmail(false);
    }
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your credentials to access the admin panel
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  placeholder="Password"
                />
              </div>
            </div>

            {loginError && (
              <div className="text-red-600 text-sm text-center">{loginError}</div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="text-center text-sm text-gray-500">
            <p>Default credentials:</p>
            <p className="font-mono">Username: admin</p>
            <p className="font-mono">Password: admin123</p>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500">Total Spots in Group</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">125</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500">Filled</div>
            <div className="mt-2 text-3xl font-bold text-green-600">{totalFilled}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500">Available</div>
            <div className="mt-2 text-3xl font-bold text-blue-600">
              {125 - (Array.isArray(waitlistGroups[waitlistGroups.length - 1]?.entries) ? waitlistGroups[waitlistGroups.length - 1].entries.length : 0)}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('waitlist')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'waitlist'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Waitlist ({totalFilled})
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'contact'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Contact Form ({submissions.length})
            </button>
          </nav>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : activeTab === 'waitlist' ? (
          // Waitlist Tab
          waitlistGroups.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600">No waitlist entries yet.</p>
            </div>
          ) : (
            // Render waitlist groups
            waitlistGroups.map((group) => (
              <div key={group.id} className="mb-12 border p-4 rounded-xl bg-white shadow">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-bold text-lg">
                    Waitlist Group #{group.id} ({(Array.isArray(group.entries) ? group.entries.length : 0)}/125)
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openEmailModal(group.id)}
                      className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                      title="Send bulk email to this group's emails"
                    >
                      Bulk Email
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 mb-4">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Instagram</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Goal</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commitment</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {(Array.isArray(group.entries) ? group.entries : []).map((entry) => (
                        <tr key={entry.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(entry.timestamp)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {entry.name || `${entry.firstName} ${entry.lastName}`}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {entry.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {entry.phone || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {entry.instagram || '-'}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                            <div className="line-clamp-2">
                              {Array.isArray(entry.goal) ? entry.goal.join(', ') : entry.goal}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {entry.commitment}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <span className="block text-xs text-gray-500 italic">
                  Batch #{group.id} ({(Array.isArray(group.entries) ? group.entries.length : 0)}/125 spots filled)
                </span>
              </div>
            ))
          )
        ) : (
          // Contact Form Tab
          submissions.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600">No submissions yet.</p>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Topic</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {submissions.map((submission) => (
                        <tr key={submission.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(submission.submittedAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {submission.firstName} {submission.lastName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {submission.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {submission.phone || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {submission.topic}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                            <div className="line-clamp-2">{submission.message}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">Total submissions: {submissions.length}</div>
            </>
          )
        )}

        {/* Email Modal */}
        {showEmailModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black opacity-40"
              onClick={closeEmailModal}
            />
            <div className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Send Bulk Email - Group #{modalGroupId}</h3>
                <button
                  onClick={closeEmailModal}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Email subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    rows={6}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Write your message here..."
                  />
                </div>

                {emailResult && (
                  <div className="text-sm text-gray-700">
                    {emailResult}
                  </div>
                )}

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={closeEmailModal}
                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                    disabled={sendingEmail}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendEmails}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    disabled={sendingEmail}
                  >
                    {sendingEmail ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}