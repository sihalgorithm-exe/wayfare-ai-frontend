import { useState } from 'react';
import ActivityCard from './ActivityCard.jsx';

export default function DayTabs({ days, onRemoveDestination }) {
  const [activeDay, setActiveDay] = useState(days[0]?.day ?? 1);
  const current = days.find((d) => d.day === activeDay) || days[0];

  return (
    <div className="rounded-ticket bg-surface border border-rule overflow-hidden">
      <div className="flex border-b border-rule overflow-x-auto">
        {days.map((d) => (
          <button
            key={d.day}
            onClick={() => setActiveDay(d.day)}
            className={`px-5 py-3.5 font-display text-sm font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors ${
              d.day === activeDay
                ? 'border-stamp text-stamp'
                : 'border-transparent text-inkfade hover:text-ink'
            }`}
          >
            Day {d.day}
          </button>
        ))}
      </div>

      <div className="px-6 pt-5 pb-1">
        <p className="font-display text-lg font-semibold text-ink mb-5">{current.title}</p>
        {current.activities.map((activity, idx) => (
          <ActivityCard
            key={`${activity.startTime}-${idx}`}
            activity={activity}
            isLast={idx === current.activities.length - 1}
            onRemoveDestination={onRemoveDestination}
          />
        ))}
      </div>
    </div>
  );
}
