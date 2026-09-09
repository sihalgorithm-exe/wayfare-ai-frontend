// Shown when the user taps "Change hotel". Lists every supplied hotel ranked
// by the same deterministic score the backend uses for its default pick
// (see backend/src/services/hotelScoringService.js) -- no LLM call needed,
// so this stays snappy.
export default function HotelPickerList({ hotels, currentHotelId, onSelect, onClose }) {
  return (
    <div className="rounded-ticket bg-surface border border-rule p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold text-ink">Choose a hotel</h3>
        <button onClick={onClose} className="text-sm text-inkfade hover:text-ink">
          Close
        </button>
      </div>
      <ul className="divide-y divide-rule">
        {hotels.map((h) => (
          <li key={h.hotelId} className="py-3 flex items-center justify-between gap-4">
            <div>
              <p className="font-display font-medium text-ink">{h.name}</p>
              <p className="text-sm text-inkfade tabular">
                ₹{h.pricePerNight?.toLocaleString('en-IN')} · {h.rating?.toFixed(1)} ★ · ~
                {h.breakdown?.avgDistanceKm} km from your stops
              </p>
            </div>
            <button
              onClick={() => onSelect(h.hotelId)}
              disabled={h.hotelId === currentHotelId}
              className="shrink-0 text-sm font-display font-semibold px-3 py-1.5 rounded-ticket border border-stamp text-stamp disabled:opacity-40 disabled:border-rule disabled:text-inkfade hover:bg-stamp-light"
            >
              {h.hotelId === currentHotelId ? 'Current' : 'Select'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
