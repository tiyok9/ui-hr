import Skeleton from "../../../component/form/Skeleton";

export default function EmployeeFormSkeleton() {
  return (
    <div className="mx-auto p-6">
      <Skeleton className="h-6 w-40 mb-6" />

      <div className="space-y-4 border rounded-lg p-6 bg-white">
        <div>
          <Skeleton className="h-4 w-28 mb-2" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div>
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div>
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div>
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div>
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="flex justify-end pt-4">
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
}
