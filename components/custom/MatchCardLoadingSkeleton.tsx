import { Skeleton } from "../ui/skeleton";

function MatchCardLoadingSkeleton() {
  return (
    <div className="bg-white p-2 rounded shadow space-y-2">
      <Skeleton className="w-[100px] h-3" />
      <Skeleton className="w-[150px] h-2" />
      <div className="w-full flex items-center justify-between">
        <Skeleton className="w-[170px] h-4" />
        <Skeleton className="w-4 h-4" />
      </div>
      <div className="w-full flex items-center justify-between">
        <Skeleton className="w-[170px] h-4" />
        <Skeleton className="w-4 h-4" />
      </div>
      <div className="flex w-full items-center justify-between">
        <Skeleton className="w-[50px] h-3" />
        <Skeleton className="w-[70px] h-3" />
      </div>
    </div>
  );
}

export default MatchCardLoadingSkeleton;
