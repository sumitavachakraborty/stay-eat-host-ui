// Offline fallback data — ported from handoff/shared/data.jsx
// Used when API is unavailable or user is not authenticated.

export const PROPERTIES = [
  {
    id: 'p1',
    name: 'A-Frame Pinewood Cabin',
    place: 'Aspen, Colorado',
    sub: 'Mountain and valley views',
    dates: 'Mar 14 — 19',
    price: 568,
    rating: 5.0,
    reviews: 128,
    favorite: true,
    badge: 'Guest favorite',
    photos: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=900&q=80',
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=900&q=80',
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=900&q=80',
    ],
  },
  {
    id: 'p2',
    name: 'Lake Reflection House',
    place: 'Lago di Braies, Italy',
    sub: 'Mountain and lake views',
    dates: 'Mar 23 — 28',
    price: 380,
    rating: 4.98,
    reviews: 412,
    badge: 'Guest favorite',
    photos: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80',
      'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=900&q=80',
    ],
  },
  {
    id: 'p3',
    name: 'Cliffside Cedar Studio',
    place: 'Lofoten, Norway',
    sub: 'Fjord and ocean views',
    dates: 'Feb 17 — 22',
    price: 455,
    rating: 4.9,
    reviews: 211,
    badge: 'Guest favorite',
    photos: [
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=900&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80',
    ],
  },
  {
    id: 'p4',
    name: 'Glass Forest Retreat',
    place: 'Olympic Peninsula, WA',
    sub: 'Old-growth rainforest',
    dates: 'Apr 02 — 07',
    price: 620,
    rating: 4.92,
    reviews: 87,
    badge: 'Guest favorite',
    photos: [
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=900&q=80',
      'https://images.unsplash.com/photo-1509600110300-21b9d5fedeb7?w=900&q=80',
    ],
  },
  {
    id: 'p5',
    name: 'Floating Bamboo Hut',
    place: 'Langkawi, Malaysia',
    sub: 'Private floating platform',
    dates: 'May 04 — 10',
    price: 173,
    rating: 4.87,
    reviews: 304,
    photos: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900&q=80',
    ],
  },
  {
    id: 'p6',
    name: 'Geodesic Dome · Aurora',
    place: 'Tromsø, Norway',
    sub: 'Northern-lights window',
    dates: 'Dec 11 — 16',
    price: 412,
    rating: 5.0,
    reviews: 96,
    badge: 'Guest favorite',
    photos: [
      'https://images.unsplash.com/photo-1517824806704-9040b037703b?w=900&q=80',
    ],
  },
  {
    id: 'p7',
    name: 'Treehouse on Stilts',
    place: 'Ucluelet, BC',
    sub: 'Pacific coast forest',
    dates: 'Jun 02 — 07',
    price: 298,
    rating: 4.94,
    reviews: 142,
    photos: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80',
    ],
  },
  {
    id: 'p8',
    name: 'Adobe Desert Casita',
    place: 'Joshua Tree, CA',
    sub: 'High-desert minimalist',
    dates: 'Apr 19 — 23',
    price: 244,
    rating: 4.89,
    reviews: 273,
    badge: 'Guest favorite',
    photos: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=900&q=80',
    ],
  },
];

export const CATEGORIES = [
  { id: 'tiny', label: 'Tiny homes', icon: 'Cabin' },
  { id: 'icons', label: 'Icons', icon: 'Sparkle' },
  { id: 'tropical', label: 'Tropical', icon: 'Tree' },
  { id: 'beachfront', label: 'Beachfront', icon: 'Wave' },
  { id: 'topworld', label: 'Top of the world', icon: 'Flag' },
  { id: 'parks', label: 'National parks', icon: 'Mountain' },
  { id: 'cabins', label: 'Cabins', icon: 'Cabin' },
  { id: 'views', label: 'Amazing views', icon: 'Mountain' },
  { id: 'mansions', label: 'Mansions', icon: 'Home' },
];

export const EXPERIENCES = [
  { id: 'e1', name: 'Foraged dinner with Lina', place: 'Cedar Hollow', host: 'Lina', price: 78, img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80' },
  { id: 'e2', name: 'Pre-dawn alpine hike', place: 'Ridge route · 4h', host: 'Mateo', price: 52, img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80' },
  { id: 'e3', name: 'Wood-fired pottery class', place: 'Studio Onna', host: 'Ines', price: 64, img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80' },
  { id: 'e4', name: 'Lake-side sauna ritual', place: 'Boathouse', host: 'Hugo', price: 90, img: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80' },
];

// Fallback analytics for HostDashboard
export const FALLBACK_ANALYTICS = {
  confirmedBookings: 14,
  confirmedBookingsDelta: '+2 this week',
  qualityChecksPending: 3,
  qualityChecksNext: 'next: today 2 PM',
  avgApprovalTime: '11 min',
  avgApprovalRank: 'top 5% of region',
  marchPayout: '$8,420',
  marchPayoutDate: 'paid Mar 30',
};

export const FALLBACK_REWARDS = [
  { tier: 'Verified', met: true, desc: 'Photo Quality Checks on every booking', count: '92 / 92' },
  { tier: 'Verified+', met: true, desc: '4.9★ for 6 months · sub-2hr response', count: '4.97 ★' },
  { tier: 'Sustainer', met: false, desc: 'Reviewed by 200 guests', count: '142 / 200' },
  { tier: 'Hearth Circle', met: false, desc: 'Top 1% in your region', count: '— locked' },
];

export const FALLBACK_QUALITY_CHECKS = [
  { id: 'qc1', propertyId: 'p2', property: PROPERTIES[1], guest: 'Eli Tanaka', checkIn: 'Today 11:00', desc: 'Photos due in 2h 14m', state: 'progress', pct: 64 },
  { id: 'qc2', propertyId: 'p4', property: PROPERTIES[3], guest: 'Sara Bennet', checkIn: 'Tomorrow 9:00', desc: 'Cleaning crew booked', state: 'scheduled', pct: 0 },
  { id: 'qc3', propertyId: 'p6', property: PROPERTIES[5], guest: 'Riku Mori · group of 3', checkIn: 'Wed 13:00', desc: 'Photos due in 30h', state: 'scheduled', pct: 0 },
];

export const FALLBACK_ROOMS = [
  { id: 'bedroom', name: 'Master bedroom', count: 6, required: 4, status: 'verified', img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80' },
  { id: 'bath', name: 'Bathroom', count: 4, required: 4, status: 'verified', img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80' },
  { id: 'kitchen', name: 'Kitchen', count: 5, required: 4, status: 'verified', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80' },
  { id: 'living', name: 'Living room', count: 3, required: 4, status: 'pending', img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80' },
  { id: 'exterior', name: 'Exterior & deck', count: 4, required: 3, status: 'verified', img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&q=80' },
  { id: 'extras', name: 'Linens & supplies', count: 0, required: 3, status: 'todo', img: null },
];
