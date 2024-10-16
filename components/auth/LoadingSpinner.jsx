export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      <p className="ml-4 text-blue-500 font-semibold">Loading...</p>
    </div>
  );
}
