
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { InboxContent } from "@/components/InboxContent";
import { ConversationView } from "@/components/ConversationView";

const Index = () => {
  const [selectedConversation, setSelectedConversation] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex shadow-xl rounded-l-2xl overflow-hidden bg-white">
        <InboxContent 
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
        />
        <ConversationView 
          conversation={selectedConversation}
          onClose={() => setSelectedConversation(null)}
        />
      </div>
    </div>
  );
};

export default Index;
