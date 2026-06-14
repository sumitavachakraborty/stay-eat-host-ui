// API client for stay and eat host endpoints
// Falls back to static data when backend is unavailable or token is missing.

import {
  FALLBACK_ANALYTICS,
  FALLBACK_REWARDS,
  FALLBACK_QUALITY_CHECKS,
  PROPERTIES,
} from './fallbackData.js';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';
const TOKEN_KEY = 'se_token';

// ── Auth helpers ─────────────────────────────────────────────────────────────

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || null;
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

function authHeaders() {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { ...authHeaders(), ...(options.headers || {}) },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

// ── Host endpoints ────────────────────────────────────────────────────────────

/**
 * Returns dashboard analytics stats.
 * Falls back to bundled static values on any error.
 */
export async function getHostAnalytics() {
  try {
    const data = await apiFetch('/host/analytics');
    return data;
  } catch {
    return {
      ...FALLBACK_ANALYTICS,
      rewards: FALLBACK_REWARDS,
      rewardsPoints: 2148,
      rewardsDelta: '+328 vs last season',
    };
  }
}

/**
 * Returns the host's listings array.
 * Falls back to the first 4 PROPERTIES if API is down.
 */
export async function getHostListings() {
  try {
    const data = await apiFetch('/host/listings');
    return data;
  } catch {
    return PROPERTIES.slice(0, 4).map((p) => ({
      ...p,
      status: 'live',
    }));
  }
}

/**
 * Returns pending / upcoming quality check queue.
 * Falls back to bundled static values on any error.
 */
export async function getHostQualityChecks() {
  try {
    const data = await apiFetch('/host/quality-checks');
    return data;
  } catch {
    return FALLBACK_QUALITY_CHECKS;
  }
}

/**
 * Returns a single quality check by ID (or first fallback entry).
 */
export async function getQualityCheck(id) {
  try {
    const data = await apiFetch(`/host/quality-checks/${id}`);
    return data;
  } catch {
    return FALLBACK_QUALITY_CHECKS.find((qc) => qc.id === id) || FALLBACK_QUALITY_CHECKS[0];
  }
}

/**
 * POST a new listing.
 * Requires a valid bearer token in localStorage.
 * Throws on error — callers should handle.
 */
export async function createListing(payload) {
  const data = await apiFetch('/host/listings', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return data;
}
