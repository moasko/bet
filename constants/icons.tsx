import {
  ArrowUpDown,
  CreditCard,
  Gamepad,
  GroupIcon,
  LayoutDashboard,
  Orbit,
  Settings,
  Users,
} from "lucide-react";

export const BallIcon = ({
  size = 16,
  color = "currentColor",
  className = "",
  ...props
}) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill={color}
    className={`ico__svg ${className}`}
    focusable="false"
    role="img"
    {...props}
  >
    <path d="M16 0a16 16 0 100 32 16 16 0 000-32zm1 5l5-3 2 1 2 2 1 1 1 1v1l-1 4-5 2-5-4zM4 7l1-1 1-1 2-2 2-1 5 3v5l-5 4-5-2-1-4V7zm0 17l-1-1-1-2v-1l-1-1v-2l3-4 6 2 1 7-2 3zm16 7h-2-1a14 14 0 01-2 0h-1-1l-3-5 2-4h8l2 4zm11-12l-1 1v1l-1 2-1 1-5 1-2-3 1-7 6-2 3 4v2z"></path>
  </svg>
);

const ICONS = {
  dashboard: <LayoutDashboard className="w-5 h-5" />,
  bettors: <Users className="w-5 h-5" />,
  game: <Gamepad className="w-5 h-5" />,
  sports: <Orbit className="w-5 h-5" />,
  deposits: <CreditCard className="w-5 h-5" />,
  withdraws: <ArrowUpDown className="w-5 h-5" />,
  settings: <Settings className="w-5 h-5" />,
  teams: <GroupIcon className="w-5 h-5" />,
  ball: <BallIcon />,
};

export default ICONS;
