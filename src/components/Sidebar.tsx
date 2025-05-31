
import { 
  Home, 
  Search,
  MessageSquare, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight
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

interface SidebarProps {
  isExpanded: boolean;
  onToggle: (expanded: boolean) => void;
}

export const Sidebar = ({ isExpanded, onToggle }: SidebarProps) => {
  return (
    <div 
      className={`${isExpanded ? 'w-64' : 'w-16'} flex flex-col py-6 transition-all duration-300`} 
      style={{ backgroundColor: '#28244c' }}
    >
      {/* Header with toggle */}
      <div className="flex items-center justify-between px-4 mb-8">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
          </div>
          {isExpanded && (
            <div className="text-white font-bold text-xl">Aimfox</div>
          )}
        </div>
        
        {/* Toggle Button */}
        <button
          onClick={() => onToggle(!isExpanded)}
          className="text-white/60 hover:text-white p-1 rounded-md hover:bg-white/10 transition-all"
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      
      {/* Navigation Items */}
      <nav className="flex flex-col space-y-2 px-3">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className={`group relative flex items-center ${isExpanded ? 'px-4' : 'px-3'} py-3 rounded-xl transition-all duration-300 hover:bg-white/10 ${
                item.active 
                  ? 'bg-white/20 text-white shadow-md' 
                  : 'text-white/60 hover:text-white'
              }`}
              title={!isExpanded ? item.name : undefined}
            >
              <Icon size={20} className="transition-transform group-hover:scale-110 flex-shrink-0" />
              {isExpanded && (
                <span className="ml-3 font-medium">{item.name}</span>
              )}
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
