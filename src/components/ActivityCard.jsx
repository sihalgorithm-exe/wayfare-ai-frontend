const TYPE_STYLES = {
  destination: { dot: 'bg-stamp', label: 'text-stamp' },
  meal: { dot: 'bg-brass', label: 'text-brass' },
  travel: { dot: 'bg-teal', label: 'text-teal' },
};

export default function ActivityCard({ activity, isLast, onRemoveDestination }) {
  const style = TYPE_STYLES[activity.type] || TYPE_STYLES.travel;

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center w-16 shrink-0 pt-1">
        <span className="tabular text-xs font-medium text-inkfade">{activity.startTime}</span>
        <div className={`mt-2 h-2.5 w-2.5 rounded-full ${style.dot}`} />
        {!isLast && <div className="flex-1 w-px bg-rule mt-2" />}
      </div>

      <div className={`flex-1 pb-6 ${isLast ? '' : ''}`}>
        {activity.type === 'travel' ? (
          <div className="text-sm text-inkfade">
            <span className={`font-display font-medium ${style.label}`}>Travel</span>{' '}
            · {activity.from} → {activity.to}
            {activity.distanceKm != null && (
              <span className="tabular">
                {' '}
                ({activity.distanceKm} km{activity.distanceEstimated ? ', estimated' : ''})
              </span>
            )}
          </div>
        ) : (
          <div className="rounded-ticket border border-rule bg-surface px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className={`font-display text-xs font-semibold ${style.label} mb-0.5`}>
                  {activity.type === 'meal' ? 'Meal' : 'Explore'}
                </p>
                <p className="font-medium text-ink">{activity.title}</p>
              </div>
              {activity.type === 'destination' && onRemoveDestination && (
                <button
                  type="button"
                  onClick={() => onRemoveDestination(activity.destinationId)}
                  className="text-xs text-inkfade hover:text-stamp shrink-0"
                  title="Remove this stop"
                >
                  Remove
                </button>
              )}
            </div>
            <p className="tabular text-xs text-inkfade mt-1">
              {activity.startTime}–{activity.endTime}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
