
import { 
  Home, 
  Inbox, 
  Calendar, 
  Users, 
  BarChart3, 
  MessageSquare, 
  Settings,
  Search
} from "lucide-react";

const sidebarItems = [
  { icon: Home, active: false },
  { icon: Search, active: false },
  { icon: Inbox, active: true },
  { icon: MessageSquare, active: false },
  { icon: Users, active: false },
  { icon: Calendar, active: false },
  { icon: BarChart3, active: false },
  { icon: Settings, active: false },
];

export const Sidebar = () => {
  return (
    <div className="w-16 bg-slate-900 flex flex-col items-center py-4 space-y-6">
      {/* Logo */}
      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
      </div>
      
      {/* Navigation Items */}
      <nav className="flex flex-col space-y-4">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className={`p-3 rounded-lg transition-all duration-200 hover:bg-slate-800 ${
                item.active 
                  ? 'bg-orange-500 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon size={20} />
            </button>
          );
        })}
      </nav>
    </div>
  );
};
