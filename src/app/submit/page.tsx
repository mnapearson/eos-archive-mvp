// app/submit/page.tsx
'use client';

import { useState } from 'react';

export default function SubmitEventPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: {
      name: '',
      city: '',
      address: '',
      country: '',
    },
    imageUrl: '',
    category: '',
    tags: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState<null | {
    error?: string;
  }>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Example submission logic
      const res = await fetch('/.netlify/functions/submit-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
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
    <div className='flex items-center justify-center py-12 px-4'>
      <div className='max-w-xl w-full rounded-lg shadow p-8'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Submit an Event</h1>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className='mb-4'>
            <label className='block font-semibold mb-1'>Title</label>
            <input
              type='text'
              name='title'
              value={formData.title}
              onChange={handleChange}
              className='w-full border border-current rounded px-3 py-2 bg-inherit text-inherit focus:outline-none'
              required
            />
          </div>

          {/* Description */}
          <div className='mb-4'>
            <label className='block font-semibold mb-1'>Description</label>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleChange}
              className='w-full border border-current rounded px-3 py-2 bg-inherit text-inherit h-24 resize-none focus:outline-none'
              required
            />
          </div>

          {/* Date & Time */}
          <div className='flex flex-col md:flex-row md:gap-4'>
            <div className='mb-4 flex-1'>
              <label className='block font-semibold mb-1'>Date</label>
              <input
                type='date'
                name='date'
                value={formData.date}
                onChange={handleChange}
                className='w-full border border-current rounded px-3 py-2 bg-inherit text-inherit focus:outline-none'
                required
              />
            </div>
            <div className='mb-4 flex-1'>
              <label className='block font-semibold mb-1'>Time</label>
              <input
                type='time'
                name='time'
                value={formData.time}
                onChange={handleChange}
                className='w-full border border-current rounded px-3 py-2 bg-inherit text-inherit focus:outline-none'
                required
              />
            </div>
          </div>

          {/* Location Fields */}
          <div className='grid grid-cols-1 md:grid-cols-2 md:gap-4'>
            <div className='mb-4'>
              <label className='block font-semibold mb-1'>Location Name</label>
              <input
                type='text'
                name='location.name'
                value={formData.location.name}
                onChange={handleChange}
                className='w-full border border-current rounded px-3 py-2 bg-inherit text-inherit focus:outline-none'
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
                className='w-full border border-current rounded px-3 py-2 bg-inherit text-inherit focus:outline-none'
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
                className='w-full border border-current rounded px-3 py-2 bg-inherit text-inherit focus:outline-none'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block font-semibold mb-1'>Country</label>
              <input
                type='text'
                name='location.country'
                value={formData.location.country}
                onChange={handleChange}
                className='w-full border border-current rounded px-3 py-2 bg-inherit text-inherit focus:outline-none'
                required
              />
            </div>
          </div>

          {/* Image URL */}
          <div className='mb-4'>
            <label className='block font-semibold mb-1'>Image URL</label>
            <input
              type='url'
              name='imageUrl'
              value={formData.imageUrl}
              onChange={handleChange}
              className='w-full border border-current rounded px-3 py-2 bg-inherit text-inherit focus:outline-none'
            />
          </div>

          {/* Category */}
          <div className='mb-4'>
            <label className='block font-semibold mb-1'>Category</label>
            <input
              type='text'
              name='category'
              value={formData.category}
              onChange={handleChange}
              className='w-full border border-current rounded px-3 py-2 bg-inherit text-inherit focus:outline-none'
            />
          </div>

          {/* Tags */}
          <div className='mb-4'>
            <label className='block font-semibold mb-1'>
              Tags (comma separated)
            </label>
            <input
              type='text'
              name='tags'
              value={formData.tags}
              onChange={handleChange}
              className='w-full border border-current rounded px-3 py-2 bg-inherit text-inherit focus:outline-none'
            />
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full px-4 py-2 rounded font-medium transition hover:opacity-90
              bg-inherit text-inherit border border-current mt-2 
            '>
            Submit Event
          </button>

          {/* Submission Status */}
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
      </div>
    </div>
  );
}
