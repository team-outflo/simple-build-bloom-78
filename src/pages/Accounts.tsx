
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Search, Settings, User, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const accounts = [
  {
    id: 1,
    name: "Sarah Johnson",
    initials: "SJ",
    status: "Not connected",
    statusColor: "bg-red-100 text-red-600",
    limits: {
      daily: 25,
      weekly: 40,
      monthly: 40
    }
  },
  {
    id: 2,
    name: "Michael Chen",
    initials: "MC",
    status: "Not connected",
    statusColor: "bg-red-100 text-red-600",
    limits: {
      daily: 25,
      weekly: 40,
      monthly: 40
    }
  },
  {
    id: 3,
    name: "DEV PRASHTRIP...",
    initials: "DP",
    status: "In 1 campaign",
    statusColor: "bg-blue-100 text-blue-600",
    limits: {
      daily: 25,
      weekly: 40,
      monthly: 40
    }
  }
];

const Accounts = () => {
  const [isLeftSidebarExpanded, setIsLeftSidebarExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSidebarToggle = (expanded: boolean) => {
    setIsLeftSidebarExpanded(expanded);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isExpanded={isLeftSidebarExpanded}
        onToggle={handleSidebarToggle}
      />
      
      <div className="flex-1 bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Account Center</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings size={16} />
              </Button>
              <Button variant="ghost" size="sm">
                <User size={16} />
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              LinkedIn <span className="text-purple-600">Accounts</span>
            </h2>
            <p className="text-gray-600">Manage your LinkedIn sending accounts and campaigns</p>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <div className="flex-1">
                <p className="text-blue-800 text-sm">
                  The LinkedIn accounts are called senders when put in a campaign. Connect multiple LinkedIn sending accounts on one campaign to increase your daily sending volume.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  Unlimited slots available
                </Badge>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Search senders"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="connected">Connected</SelectItem>
                  <SelectItem value="disconnected">Disconnected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Settings size={16} className="mr-2" />
                Purchase seats
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <span className="mr-2">+</span>
                Connect account
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="px-8 py-6">
          <div className="bg-white rounded-lg border border-gray-200">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="font-medium text-gray-700">LinkedIn Account</div>
              <div className="font-medium text-gray-700">Status</div>
              <div className="font-medium text-gray-700">Sending limits</div>
              <div className="font-medium text-gray-700"></div>
            </div>

            {/* Table Rows */}
            {accounts.map((account) => (
              <div key={account.id} className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-purple-100 text-purple-600 font-semibold">
                      {account.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-gray-900">{account.name}</span>
                </div>
                
                <div>
                  <Badge className={account.statusColor}>
                    {account.status}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-500">📤</span>
                    <span>{account.limits.daily}/day</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-500">📅</span>
                    <span>{account.limits.weekly}/day</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-500">👥</span>
                    <span>{account.limits.monthly}/day</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-end space-x-2">
                  {account.status === "Not connected" ? (
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                      Re-connect
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      <Settings size={14} className="mr-1" />
                      Configure limits
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
            <span>Showing 1-3 of 3</span>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" disabled>
                Previous
              </Button>
              <Button variant="ghost" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
