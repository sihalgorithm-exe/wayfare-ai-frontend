export default function HotelRecommendationCard({ hotel, onChangeHotel }) {
  if (!hotel) return null;

  return (
    <div className="rounded-ticket bg-surface border border-rule overflow-hidden">
      <div className="bg-brass-light px-6 py-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-brass font-display text-xs font-semibold uppercase tracking-wide mb-1">
            Recommended stay
          </p>
          <h2 className="font-display text-xl font-semibold text-ink">{hotel.name}</h2>
        </div>
        <div className="text-right shrink-0 tabular">
          {hotel.pricePerNight != null && (
            <div className="font-display font-semibold text-ink">₹{hotel.pricePerNight.toLocaleString('en-IN')}</div>
          )}
          {hotel.rating != null && (
            <div className="text-sm text-inkfade">{hotel.rating.toFixed(1)} ★</div>
          )}
        </div>
      </div>

      <div className="perforated" />

      <div className="px-6 py-5">
        <p className="text-ink leading-relaxed">{hotel.reason}</p>

        {hotel.amenities?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {hotel.amenities.map((a) => (
              <span
                key={a}
                className="text-xs px-2.5 py-1 rounded-full bg-teal-light text-teal font-medium"
              >
                {a}
              </span>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={onChangeHotel}
          className="mt-5 text-sm font-display font-semibold text-stamp hover:underline"
        >
          Change hotel
        </button>
      </div>
    </div>
  );
}
