import Skeleton from "../../../component/form/Skeleton";

const ViewAttendanceSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <Skeleton className="h-5 w-24" />

        <div className="space-y-2">
          <Skeleton className="h-6 w-56" />
          <Skeleton className="h-4 w-72" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 space-y-3"
            >
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 flex justify-between items-center">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-9 w-36" />
        </div>

        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 space-y-4">
          <Skeleton className="h-9 w-64" />

          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>

          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="grid grid-cols-4 gap-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAttendanceSkeleton;
