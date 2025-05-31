
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Search, Settings, User, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAccountsQuery } from "@/hooks/useAccountQueries";
import { SyncState } from "@/types/accounts";

const Accounts = () => {
  const [isLeftSidebarExpanded, setIsLeftSidebarExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const { data: accounts = [], isLoading, error } = useAccountsQuery();

  const handleSidebarToggle = (expanded: boolean) => {
    setIsLeftSidebarExpanded(expanded);
  };

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = `${account.firstName} ${account.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "connected" && account.status === SyncState.ACTIVE) ||
      (statusFilter === "disconnected" && account.status === SyncState.INACTIVE);
    
    return matchesSearch && matchesStatus;
  });

  const getStatusInfo = (account: any) => {
    if (account.status === SyncState.ACTIVE) {
      return {
        text: "In 1 campaign",
        className: "bg-blue-100 text-blue-600"
      };
    }
    return {
      text: "Not connected",
      className: "bg-red-100 text-red-600"
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar 
          isExpanded={isLeftSidebarExpanded}
          onToggle={handleSidebarToggle}
        />
        <div className="flex-1 bg-white flex items-center justify-center">
          <div className="text-gray-500">Loading accounts...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar 
          isExpanded={isLeftSidebarExpanded}
          onToggle={handleSidebarToggle}
        />
        <div className="flex-1 bg-white flex items-center justify-center">
          <div className="text-red-500">Error loading accounts</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isExpanded={isLeftSidebarExpanded}
        onToggle={handleSidebarToggle}
      />
      
      <div className="flex-1 bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Account Center</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Settings size={14} />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <User size={14} />
              </Button>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              LinkedIn <span className="text-purple-600">Accounts</span>
            </h2>
            <p className="text-sm text-gray-600">Manage your LinkedIn sending accounts and campaigns</p>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <div className="flex items-start space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <div className="flex-1">
                <p className="text-blue-800 text-xs">
                  The LinkedIn accounts are called senders when put in a campaign. Connect multiple LinkedIn sending accounts on one campaign to increase your daily sending volume.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                  Unlimited slots available
                </Badge>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                <Input
                  placeholder="Search senders"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-48 h-8 text-sm"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="connected">Connected</SelectItem>
                  <SelectItem value="disconnected">Disconnected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="h-8 text-xs">
                <Settings size={12} className="mr-1" />
                Purchase seats
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white h-8 text-xs">
                <span className="mr-1">+</span>
                Connect account
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="px-6 py-4">
          <div className="bg-white rounded-lg border border-gray-200">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 px-4 py-3 border-b border-gray-200 bg-gray-50">
              <div className="font-medium text-gray-700 text-sm">LinkedIn Account</div>
              <div className="font-medium text-gray-700 text-sm">Status</div>
              <div className="font-medium text-gray-700 text-sm">Sending limits</div>
              <div className="font-medium text-gray-700 text-sm"></div>
            </div>

            {/* Table Rows */}
            {filteredAccounts.map((account) => {
              const initials = `${account.firstName[0]}${account.lastName[0]}`;
              const fullName = `${account.firstName} ${account.lastName}`;
              const statusInfo = getStatusInfo(account);

              return (
                <div key={account.id} className="grid grid-cols-4 gap-4 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-purple-100 text-purple-600 font-semibold text-xs">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-900 text-sm">{fullName}</span>
                  </div>
                  
                  <div>
                    <Badge className={`${statusInfo.className} text-xs`}>
                      {statusInfo.text}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-500">📤</span>
                      <span>25/day</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-500">📅</span>
                      <span>40/day</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-500">👥</span>
                      <span>40/day</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end space-x-2">
                    {account.status === SyncState.INACTIVE ? (
                      <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50 h-7 text-xs">
                        Re-connect
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        <Settings size={10} className="mr-1" />
                        Configure limits
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <MoreHorizontal size={12} />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
            <span>Showing 1-{filteredAccounts.length} of {filteredAccounts.length}</span>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" disabled className="h-7 text-xs">
                Previous
              </Button>
              <Button variant="ghost" size="sm" disabled className="h-7 text-xs">
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
