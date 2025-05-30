
import { useState } from "react";
import { Search, Filter, Star, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ConversationList } from "@/components/ConversationList";
import { InboxFiltersDialog } from "@/components/InboxFiltersDialog";

interface InboxContentProps {
  selectedConversation: any;
  onSelectConversation: (conversation: any) => void;
}

export const InboxContent = ({ selectedConversation, onSelectConversation }: InboxContentProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const filters = [
    { name: "All", count: 24 },
    { name: "Favorite", count: 3 },
    { name: "Unread", count: 8 }
  ];

  return (
    <>
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Inbox</h1>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Bell size={14} className="text-orange-500" />
                  <p className="text-sm text-orange-600 font-medium">Free trial ends in 7 days</p>
                </div>
                <Badge className="bg-orange-100 text-orange-700 text-xs px-2 py-1">
                  Upgrade
                </Badge>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsFiltersOpen(true)}
              className="border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <Filter size={16} />
            </Button>
          </div>

          {/* Enhanced Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Search conversations, messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white shadow-sm"
            />
          </div>

          {/* Search Tag */}
          {searchTerm && (
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700 border border-blue-200">
                <Search size={12} className="mr-1" />
                "{searchTerm}"
                <button 
                  onClick={() => setSearchTerm("")}
                  className="ml-2 text-blue-400 hover:text-blue-600 transition-colors"
                >
                  ×
                </button>
              </span>
            </div>
          )}

          {/* Enhanced Filter Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {filters.map((filter) => (
              <Button
                key={filter.name}
                variant="ghost"
                size="sm"
                onClick={() => setActiveFilter(filter.name)}
                className={`flex-1 px-4 py-2 rounded-md transition-all duration-200 ${
                  activeFilter === filter.name 
                    ? 'bg-white text-gray-900 shadow-sm font-medium' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {filter.name}
                {filter.count > 0 && (
                  <Badge 
                    variant="secondary" 
                    className={`ml-2 text-xs px-2 py-0 h-5 ${
                      activeFilter === filter.name 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {filter.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Conversation List */}
        <ConversationList 
          searchTerm={searchTerm}
          activeFilter={activeFilter}
          selectedConversation={selectedConversation}
          onSelectConversation={onSelectConversation}
        />
      </div>

      <InboxFiltersDialog 
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
      />
    </>
  );
};
