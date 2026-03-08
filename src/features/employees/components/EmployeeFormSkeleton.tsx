import Skeleton from "../../../component/form/Skeleton";

export default function EmployeeFormSkeleton() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <Skeleton className="h-6 w-40 mb-6" />

      <div className="space-y-4 border rounded-lg p-6 bg-white">
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="pt-4">
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
}
