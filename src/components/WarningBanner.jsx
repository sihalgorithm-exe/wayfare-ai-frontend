export default function WarningBanner({ messages, onDismiss }) {
  if (!messages?.length) return null;
  return (
    <div className="rounded-ticket border border-stamp/40 bg-stamp-light px-4 py-3">
      {messages.map((m, i) => (
        <p key={i} className="text-sm text-stamp leading-relaxed">
          {m}
        </p>
      ))}
      {onDismiss && (
        <button onClick={onDismiss} className="mt-1 text-xs font-semibold text-stamp/80 hover:underline">
          Dismiss
        </button>
      )}
    </div>
  );
}
