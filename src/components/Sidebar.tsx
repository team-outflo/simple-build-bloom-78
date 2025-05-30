
import { 
  Home, 
  Search,
  MessageSquare, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings
} from "lucide-react";

const sidebarItems = [
  { icon: Home, active: false, name: "Home" },
  { icon: Search, active: false, name: "Search" },
  { icon: MessageSquare, active: true, name: "Messages" },
  { icon: Users, active: false, name: "Users" },
  { icon: Calendar, active: false, name: "Calendar" },
  { icon: BarChart3, active: false, name: "Analytics" },
  { icon: Settings, active: false, name: "Settings" },
];

export const Sidebar = () => {
  return (
    <div className="w-16 flex flex-col items-center py-6 space-y-8" style={{ backgroundColor: '#28244c' }}>
      {/* Logo */}
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
        <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
      </div>
      
      {/* Navigation Items */}
      <nav className="flex flex-col space-y-6">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className={`group relative p-3 rounded-xl transition-all duration-300 hover:bg-white/10 ${
                item.active 
                  ? 'bg-white/20 text-white shadow-md' 
                  : 'text-white/60 hover:text-white'
              }`}
              title={item.name}
            >
              <Icon size={20} className="transition-transform group-hover:scale-110" />
              {item.active && (
                <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-white rounded-full"></div>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
