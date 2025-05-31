
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { InboxContent } from "@/components/InboxContent";
import { ConversationView } from "@/components/ConversationView";
import { ProfileSidebar } from "@/components/ProfileSidebar";

const Index = () => {
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [isLeftSidebarExpanded, setIsLeftSidebarExpanded] = useState(true);
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);

  const handleProfilePreview = (conversation: any) => {
    setProfileData(conversation);
    setIsProfileSidebarOpen(true);
  };

  const handleSidebarToggle = (expanded: boolean) => {
    setIsLeftSidebarExpanded(expanded);
    // Auto-open profile sidebar when left sidebar is contracted
    if (!expanded && selectedConversation) {
      setIsProfileSidebarOpen(true);
      setProfileData(selectedConversation);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isExpanded={isLeftSidebarExpanded}
        onToggle={handleSidebarToggle}
      />
      <div 
        className={`flex-1 flex shadow-xl rounded-l-2xl overflow-hidden bg-white transition-all duration-300 ${
          isProfileSidebarOpen ? 'mr-80' : 'mr-0'
        }`}
      >
        <InboxContent 
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
          onProfilePreview={handleProfilePreview}
        />
        <ConversationView 
          conversation={selectedConversation}
          onClose={() => setSelectedConversation(null)}
          onProfilePreview={handleProfilePreview}
        />
      </div>
      <ProfileSidebar 
        isOpen={isProfileSidebarOpen}
        onClose={() => setIsProfileSidebarOpen(false)}
        profileData={profileData}
      />
    </div>
  );
};

export default Index;
