export default function PageLoader() {
  return (
    <div
      className="min-h-[60vh] w-full flex items-center justify-center bg-[#F7F6F2]"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#D4D1C9] border-t-[#252525] animate-spin" />
        <span className="text-xs font-medium text-[#8A8881]">Loading</span>
      </div>
    </div>
  );
}
