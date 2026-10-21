'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch items from backend
  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/items');
      if (!res.ok) throw new Error('Failed to fetch data from backend');
      const data = await res.json();
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Add Item with Image Upload (FormData & Multer Integration)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    try {
      let imageUrl = '';

      // Agar image selected hai toh pehle /api/upload par bhejenge
      if (image) {
        const formData = new FormData();
        formData.append('image', image);

        const uploadRes = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          imageUrl = uploadData.filePath;
        }
      }

      // Naya Item backend (MongoDB) mein save karenge
      const res = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, imageUrl }),
      });

      if (res.ok) {
        setTitle('');
        setDescription('');
        setImage(null);
        fetchItems(); // Refresh list
      }
    } catch (err) {
      alert('Error adding item');
    }
  };

  // Delete Item
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/items/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setItems(items.filter((item) => item._id !== id));
      }
    } catch (err) {
      alert('Error deleting item');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
      <h1>Prodesk IT - Fullstack Dashboard</h1>

      {/* Form with File Upload */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3>Add New Item</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '8px', fontSize: '16px' }}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: '8px', fontSize: '16px' }}
          required
        />
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 'bold' }}>
            Upload Image Thumbnail:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ fontSize: '14px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px', background: '#0070f3', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '8px' }}>
          Add Item
        </button>
      </form>

      {/* States Handling */}
      {loading && <p>Loading items from database...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Display Items */}
      {!loading && !error && (
        <div>
          <h3>Items List ({items.length})</h3>
          {items.length === 0 ? (
            <p>No items found in database.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {items.map((item) => (
                <li
                  key={item._id}
                  style={{
                    padding: '12px',
                    border: '1px solid #ddd',
                    marginBottom: '10px',
                    borderRadius: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <strong>{item.title}</strong>
                    <p style={{ margin: '4px 0 0', color: '#555' }}>{item.description}</p>
                    {item.imageUrl && (
                      <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'green' }}>
                        📷 Image Attached: {item.imageUrl}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{ background: '#e00', color: '#fff', border: 'none', padding: '6px 12px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}