import {
  LayoutDashboard,
  Users,
  Gamepad,
  Orbit,
  CreditCard,
  ArrowUpDown,
  Settings,
} from "lucide-react";

const ICONS = {
  dashboard: <LayoutDashboard className="w-5 h-5" />,
  bettors: <Users className="w-5 h-5" />,
  game: <Gamepad className="w-5 h-5" />,
  sports: <Orbit className="w-5 h-5" />,
  deposits: <CreditCard className="w-5 h-5" />,
  withdraws: <ArrowUpDown className="w-5 h-5" />,
  settings: <Settings className="w-5 h-5" />,
};

export default ICONS;
