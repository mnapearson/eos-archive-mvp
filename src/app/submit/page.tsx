'use client';

import { useState } from 'react';

export default function SubmitEventPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: { name: '', city: '', address: '', country: '' },
    imageUrl: '',
    category: '',
    tags: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState<null | {
    error?: string;
  }>(null);

  // Update form data. For fields inside location, use dot notation in the name.
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith('location.')) {
      const locField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [locField]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit the form and call the Netlify function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/.netlify/functions/submit-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          // Convert comma-separated tags into an array
          tags: formData.tags.split(',').map((tag) => tag.trim()),
        }),
      });
      const data = await res.json();
      setSubmissionStatus(data);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionStatus({ error: 'Submission failed' });
    }
  };

  return (
    <main className='p-8 bg-gray-100 min-h-screen'>
      <h1 className='text-4xl font-bold mb-6 text-center'>Submit an Event</h1>
      <form
        onSubmit={handleSubmit}
        className='max-w-lg mx-auto bg-white p-6 rounded shadow'>
        <div className='mb-4'>
          <label className='block font-semibold mb-1'>Title</label>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded px-3 py-2'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block font-semibold mb-1'>Description</label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded px-3 py-2'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block font-semibold mb-1'>Date</label>
          <input
            type='date'
            name='date'
            value={formData.date}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded px-3 py-2'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block font-semibold mb-1'>Time</label>
          <input
            type='time'
            name='time'
            value={formData.time}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded px-3 py-2'
            required
          />
        </div>
        {/* Location fields */}
        <div className='mb-4'>
          <label className='block font-semibold mb-1'>Location Name</label>
          <input
            type='text'
            name='location.name'
            value={formData.location.name}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded px-3 py-2'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block font-semibold mb-1'>City</label>
          <input
            type='text'
            name='location.city'
            value={formData.location.city}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded px-3 py-2'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block font-semibold mb-1'>Address</label>
          <input
            type='text'
            name='location.address'
            value={formData.location.address}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded px-3 py-2'
          />
        </div>
        <div className='mb-4'>
          <label className='block font-semibold mb-1'>Country</label>
          <input
            type='text'
            name='location.country'
            value={formData.location.country}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded px-3 py-2'
          />
        </div>
        {/* Other fields */}
        <div className='mb-4'>
          <label className='block font-semibold mb-1'>Image URL</label>
          <input
            type='url'
            name='imageUrl'
            value={formData.imageUrl}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded px-3 py-2'
          />
        </div>
        <div className='mb-4'>
          <label className='block font-semibold mb-1'>Category</label>
          <input
            type='text'
            name='category'
            value={formData.category}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded px-3 py-2'
          />
        </div>
        <div className='mb-4'>
          <label className='block font-semibold mb-1'>
            Tags (comma separated)
          </label>
          <input
            type='text'
            name='tags'
            value={formData.tags}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded px-3 py-2'
          />
        </div>
        <button
          type='submit'
          className='bg-blue-600 text-white px-4 py-2 rounded'>
          Submit Event
        </button>
        {submissionStatus && (
          <div className='mt-4'>
            {submissionStatus.error ? (
              <p className='text-red-500'>{submissionStatus.error}</p>
            ) : (
              <p className='text-green-500'>Event submitted successfully!</p>
            )}
          </div>
        )}
      </form>
    </main>
  );
}
