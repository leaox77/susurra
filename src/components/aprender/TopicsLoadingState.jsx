export function TopicsLoadingState() {
  return (
    <div className="bg-blanco rounded-[1.5rem] p-5 sm:p-6 border border-lavanda shadow-sm">
      <div className="h-4 w-32 rounded-md bg-lav-l animate-pulse mb-3" />
      <div className="h-8 w-56 rounded-md bg-lav-l animate-pulse mb-6" />
      <div className="h-28 rounded-2xl bg-lav-l animate-pulse mb-5" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="h-40 rounded-2xl bg-lav-l animate-pulse" />
        <div className="h-40 rounded-2xl bg-lav-l animate-pulse" />
      </div>
    </div>
  )
}
