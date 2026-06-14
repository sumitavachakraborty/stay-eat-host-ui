// NewListing — "Host a place" form.
// Multi-field: name, location, description, property type chips, price, bedrooms/beds/baths counters, photo URLs.
// On submit: POST /host/listings. On success: navigate to /.

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { createListing } from '../lib/api.js';
import { CATEGORIES } from '../lib/fallbackData.js';

function Counter({ label, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ fontFamily: 'var(--f-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 11, color: 'var(--c-slate)' }}>
        {label}
      </label>
      <div className="counter">
        <button
          type="button"
          className="counter-btn"
          onClick={() => onChange(Math.max(0, value - 1))}
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <span className="counter-val">{value}</span>
        <button
          type="button"
          className="counter-btn"
          onClick={() => onChange(value + 1)}
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function NewListing() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    place: '',
    description: '',
    category: '',
    price: '',
    bedrooms: 1,
    beds: 1,
    baths: 1,
    photos: [''],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function setField(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function setPhoto(idx, val) {
    setForm((f) => {
      const photos = [...f.photos];
      photos[idx] = val;
      return { ...f, photos };
    });
  }

  function addPhotoField() {
    setForm((f) => ({ ...f, photos: [...f.photos, ''] }));
  }

  function removePhotoField(idx) {
    setForm((f) => ({
      ...f,
      photos: f.photos.filter((_, i) => i !== idx),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.name.trim()) { setError('Listing name is required.'); return; }
    if (!form.place.trim()) { setError('Location is required.'); return; }
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) {
      setError('Enter a valid price per night.'); return;
    }

    setLoading(true);
    try {
      const payload = {
        name: form.name.trim(),
        place: form.place.trim(),
        description: form.description.trim(),
        category: form.category || null,
        price: Number(form.price),
        bedrooms: form.bedrooms,
        beds: form.beds,
        baths: form.baths,
        photos: form.photos.map((p) => p.trim()).filter(Boolean),
      };
      await createListing(payload);
      navigate('/');
    } catch (err) {
      // If API is down (no backend), still navigate home in demo mode
      if (err.message && (err.message.includes('fetch') || err.message.includes('Failed'))) {
        navigate('/');
      } else {
        setError(err.message || 'Failed to publish listing. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app fade-in" style={{ minHeight: '100vh' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '48px 24px 80px' }}>
        {/* Back */}
        <button
          type="button"
          className="btn-secondary"
          onClick={() => navigate('/')}
          style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 32 }}
        >
          <Icon.ArrowLeft size={14} /> Back to dashboard
        </button>

        {/* Heading */}
        <div className="mono" style={{ marginBottom: 12 }}>New listing</div>
        <h1 className="display" style={{ fontSize: 'clamp(32px, 8vw, 52px)', lineHeight: 1, margin: '0 0 8px', letterSpacing: '-0.03em' }}>
          Host a place.
        </h1>
        <p style={{ fontSize: 16, color: 'var(--c-slate)', margin: '0 0 40px', lineHeight: 1.5 }}>
          Add your property details and publish when ready.
        </p>

        {error && (
          <div style={{
            background: '#fff7f4',
            border: '1px solid var(--c-soft-coral)',
            borderRadius: 16,
            padding: '12px 16px',
            fontSize: 14,
            color: '#a8462f',
            marginBottom: 24,
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 28 }}>
          {/* Name */}
          <div className="form-field">
            <label>Listing name</label>
            <input
              className="form-input"
              type="text"
              placeholder="e.g. A-Frame Pinewood Cabin"
              value={form.name}
              onChange={(e) => setField('name', e.target.value)}
              required
            />
          </div>

          {/* Location */}
          <div className="form-field">
            <label>Location</label>
            <input
              className="form-input"
              type="text"
              placeholder="City, Region or Country"
              value={form.place}
              onChange={(e) => setField('place', e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="form-field">
            <label>Short description</label>
            <textarea
              className="form-input"
              placeholder="Describe the vibe, views, and what makes this place special…"
              value={form.description}
              onChange={(e) => setField('description', e.target.value)}
              rows={4}
            />
          </div>

          {/* Category chips */}
          <div className="form-field">
            <label>Property type</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`chip-coral${form.category === cat.id ? ' active' : ''}`}
                  onClick={() => setField('category', form.category === cat.id ? '' : cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="form-field new-listing-price-field">
            <label>Price per night (USD)</label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: 14,
                color: 'var(--c-slate)',
              }}>$</span>
              <input
                className="form-input"
                type="number"
                min="1"
                placeholder="0"
                value={form.price}
                onChange={(e) => setField('price', e.target.value)}
                style={{ paddingLeft: 28 }}
                required
              />
            </div>
          </div>

          {/* Counters */}
          <div className="new-listing-counters">
            <Counter label="Bedrooms" value={form.bedrooms} onChange={(v) => setField('bedrooms', v)} />
            <Counter label="Beds" value={form.beds} onChange={(v) => setField('beds', v)} />
            <Counter label="Bathrooms" value={form.baths} onChange={(v) => setField('baths', v)} />
          </div>

          {/* Photo URLs */}
          <div className="form-field">
            <label>Photos (URL per line)</label>
            <div style={{ display: 'grid', gap: 10 }}>
              {form.photos.map((url, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    className="form-input"
                    type="url"
                    placeholder="https://images.unsplash.com/…"
                    value={url}
                    onChange={(e) => setPhoto(idx, e.target.value)}
                    style={{ flex: 1 }}
                  />
                  {form.photos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePhotoField(idx)}
                      style={{
                        background: 'none',
                        border: '1px solid var(--c-hairline)',
                        borderRadius: '50%',
                        width: 32,
                        height: 32,
                        display: 'grid',
                        placeItems: 'center',
                        cursor: 'pointer',
                        color: 'var(--c-slate)',
                        flexShrink: 0,
                      }}
                      aria-label="Remove photo"
                    >
                      <Icon.X size={14} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="pill-outline"
                onClick={addPhotoField}
                style={{ justifySelf: 'start', display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <Icon.Plus size={14} /> Add another photo
              </button>
            </div>
          </div>

          {/* Divider */}
          <hr className="hr" />

          {/* Submit */}
          <div className="new-listing-submit-row">
            <button
              type="submit"
              disabled={loading}
              className="new-listing-submit-btn"
              style={{
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Publishing…' : 'Publish listing'}
              {!loading && <Icon.ArrowRight size={16} />}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
