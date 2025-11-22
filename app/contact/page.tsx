'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    topic: 'Select one...',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setStatusMessage('Thank you! Your message has been sent successfully.');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          topic: 'Select one...',
          message: ''
        });
      } else {
        setStatus('error');
        setStatusMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-16 px-4 normal-font">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold heading-font mb-10 text-center">
        GET IN TOUCH
      </h1>

      {/* Status Message */}
      {status === 'success' && (
        <div className="w-full max-w-lg mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
          {statusMessage}
        </div>
      )}
      {status === 'error' && (
        <div className="w-full max-w-lg mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {statusMessage}
        </div>
      )}

      {/* Form Container */}
      <form className="w-full max-w-lg space-y-6" onSubmit={handleSubmit}>

        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Topic Dropdown */}
        <div>
          <label className="block mb-1 font-medium">Choose a topic</label>
          <select
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option>Select one...</option>
            <option>General Question</option>
            <option>Partnership</option>
            <option>Technical Support</option>
            <option>Other</option>
          </select>
        </div>

        {/* Message Box */}
        <div>
          <label className="block mb-1 font-medium">How can we help?</label>
          <textarea
            name="message"
            placeholder="Type your message..."
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-3 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-black"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-center pt-4">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="px-10 py-3 bg-[#e9a8ad] rounded-full text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {status === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
          </button>
        </div>

      </form>
    </div>
  )
}
