const BASE_URL = import.meta.env.VITE_AI_PLANNER_API_URL || 'http://localhost:4000/api';

async function request(path, options) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err = new Error(body.error || `Request to ${path} failed (${res.status})`);
    err.status = res.status;
    err.details = body.details;
    throw err;
  }
  return res.json();
}

export const plannerApi = {
  // Fetches the trip Wayfare handed off, by session id.
  getTripSession: (sessionId) => request(`/trips/${sessionId}`),

  // Dev/demo fallback: the trip bundled with the backend.
  getExampleTrip: () => request('/trips/example'),

  // Generates (or regenerates) the full plan for a trip.
  generatePlan: (tripInput) =>
    request('/plan', { method: 'POST', body: JSON.stringify(tripInput) }),

  // Ranked hotel list for the "Change Hotel" control.
  rankHotels: (tripInput) =>
    request('/hotels/rank', { method: 'POST', body: JSON.stringify(tripInput) }),

  // Demo-only re-check. Swap for the real Feasibility Engine URL in
  // production -- see backend/src/routes/planner.routes.js.
  recheckFeasibility: (trip, destinations) =>
    request('/feasibility/mock-check', {
      method: 'POST',
      body: JSON.stringify({ trip, destinations }),
    }),
};
