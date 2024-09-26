import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const MemberItem = ({
  date,
  level,
  name,
}: {
  date: string;
  level: string;
  name: string;
}) => (
  <div className="flex flex-row justify-between items-center shadow rounded p-2">
    <div className="flex flex-col gap-1">
      <p className="text-[11px] text-gray-500">{date}</p>
      <div className="flex items-center gap-2">
        <Badge variant={"outline"} className="text-[11px] text-red-500 rounded">
          {level}
        </Badge>
        <p className="text-md">{name}</p>
      </div>
    </div>
    <div>
      <ArrowRight size={15} className="text-gray-500" />
    </div>
  </div>
);

export default MemberItem;
