
export function PageLoader() {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
      </div>
    );
}
  
export function SectionLoader() {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-gray-600"></div>
      </div>
    );
}[8]