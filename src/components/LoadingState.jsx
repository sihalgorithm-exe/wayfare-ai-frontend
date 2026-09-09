export default function LoadingState({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-inkfade">
      <div className="h-8 w-8 rounded-full border-2 border-rule border-t-stamp animate-spin" />
      <p className="mt-4 font-display text-sm tracking-wide">{label}</p>
    </div>
  );
}
