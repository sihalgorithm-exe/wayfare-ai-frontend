export default function ControlsBar({ onRegenerate, onChangeHotel, regenerating }) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={onRegenerate}
        disabled={regenerating}
        className="px-4 py-2 rounded-ticket bg-ink text-paper font-display text-sm font-semibold hover:bg-ink/90 disabled:opacity-50"
      >
        {regenerating ? 'Regenerating…' : 'Regenerate plan'}
      </button>
      <button
        type="button"
        onClick={onChangeHotel}
        className="px-4 py-2 rounded-ticket border border-rule text-ink font-display text-sm font-semibold hover:border-ink"
      >
        Change hotel
      </button>
      <button
        type="button"
        disabled
        title="Connect this to Wayfare's destination catalog to enable adding new stops"
        className="px-4 py-2 rounded-ticket border border-rule text-inkfade font-display text-sm font-semibold opacity-50 cursor-not-allowed"
      >
        Add a destination
      </button>
      <p className="text-xs text-inkfade self-center">
        Tip: use <span className="text-ink">Remove</span> on any stop in the timeline below.
      </p>
    </div>
  );
}
