import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FlashSaleAdminPanel = () => {
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await axios.get('/api/flash-sale');
        if (res.data) {
          setIsActive(res.data.isActive || false);
          setStartTime(res.data.startTime ? res.data.startTime.slice(0, 16) : '');
          setEndTime(res.data.endTime ? res.data.endTime.slice(0, 16) : '');
        }
      } catch {}
      setLoading(false);
    };
    fetchConfig();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const token = localStorage.getItem('vstore_token');
      await axios.put('/api/flash-sale', {
        isActive,
        startTime,
        endTime,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Flash Sale configuration updated!');
    } catch (e) {
      setMessage('Failed to update.');
    }
    setSaving(false);
  };

  if (loading) return <div className="py-8 text-center">Loading Flash Sale config...</div>;

  return (
    <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 mt-10">
      <h2 className="text-xl font-black text-brand-orange uppercase mb-4">Flash Sale Management</h2>
      <div className="flex flex-col gap-4 max-w-md">
        <label className="flex items-center gap-2 font-bold">
          <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} />
          Enable Flash Sale
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-bold">Sale Start Date & Time</span>
          <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} className="border rounded px-2 py-1" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-bold">Sale End Date & Time</span>
          <input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} className="border rounded px-2 py-1" />
        </label>
        <button onClick={handleSave} className="btn-primary w-fit mt-2" disabled={saving}>{saving ? 'Saving...' : 'Save Settings'}</button>
        {message && <div className="text-green-600 font-bold mt-2">{message}</div>}
      </div>
    </div>
  );
};

export default FlashSaleAdminPanel;
