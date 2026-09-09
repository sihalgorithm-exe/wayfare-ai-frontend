export default function TripSummaryCard({ trip, destinationCount, intro }) {
  return (
    <div className="rounded-ticket bg-surface border border-rule p-6 sm:p-8">
      <p className="text-stamp font-display font-semibold text-sm mb-1">Your trip is feasible! Let's plan it.</p>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink">
        {trip.city}
      </h1>
      {intro && <p className="mt-2 text-inkfade leading-relaxed">{intro}</p>}

      <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 tabular">
        <Stat label="Days" value={trip.numberOfDays} />
        <Stat label="Hours / day" value={trip.hoursPerDay} />
        <Stat label="Stops" value={destinationCount} />
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="text-xl font-display font-semibold text-ink">{value}</div>
      <div className="text-xs text-inkfade">{label}</div>
    </div>
  );
}
