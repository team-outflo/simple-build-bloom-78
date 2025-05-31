
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddLeadsModal } from "@/components/AddLeadsModal";
import { CSVUploadModal } from "@/components/CSVUploadModal";
import { CSVMappingModal } from "@/components/CSVMappingModal";
import { LeadSource, CSVData } from "@/types/leads";

export default function Leads() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCSVUpload, setShowCSVUpload] = useState(false);
  const [showCSVMapping, setShowCSVMapping] = useState(false);
  const [csvData, setCsvData] = useState<CSVData | null>(null);

  // Mock data - set to empty array to show empty state, or add items to show list
  const leads: any[] = [];

  const handleSelectSource = (source: LeadSource) => {
    if (source === "csv-upload") {
      setShowAddModal(false);
      setShowCSVUpload(true);
    }
    // Handle other sources here
  };

  const handleFileUploaded = (data: CSVData) => {
    setCsvData(data);
    setShowCSVUpload(false);
    setShowCSVMapping(true);
  };

  const handleBackToUpload = () => {
    setShowCSVMapping(false);
    setShowCSVUpload(true);
  };

  const handleUploadComplete = () => {
    setShowCSVMapping(false);
    console.log("Upload completed!");
  };

  const handleCloseAll = () => {
    setShowAddModal(false);
    setShowCSVUpload(false);
    setShowCSVMapping(false);
    setCsvData(null);
  };

  return (
    <div className="min-h-screen bg-[#1a1625] text-white">
      {/* Header Warning */}
      <div className="bg-[#2a2139] border-b border-slate-700 px-6 py-3">
        <div className="flex items-center gap-3 text-slate-300 text-sm">
          <div className="w-5 h-5 rounded-full bg-slate-600 flex items-center justify-center">
            <span className="text-xs">⏰</span>
          </div>
          <span>Your campaigns are not operating since they're outside of working hours at the moment.</span>
          <button className="text-blue-400 hover:text-blue-300 underline">
            Adjust my schedule
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-[#2a2139] border-b border-slate-700 px-6">
        <div className="flex gap-8">
          <button className="text-white border-b-2 border-white pb-3 px-1 font-medium">
            Add Leads
          </button>
          <button className="text-slate-400 pb-3 px-1 hover:text-slate-300">
            Create a Sequence
          </button>
          <button className="text-slate-400 pb-3 px-1 hover:text-slate-300">
            Settings
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-8 text-white">Lists of leads</h1>
        
        {leads.length === 0 ? (
          // Empty State
          <div className="flex items-center justify-center min-h-[500px]">
            <div className="text-center max-w-md">
              <div className="mb-8">
                <div className="relative inline-block">
                  <div className="bg-slate-700 rounded-2xl p-8 mb-4 shadow-lg">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-600 rounded-full"></div>
                        <div className="h-3 bg-slate-600 rounded flex-1"></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-600 rounded-full"></div>
                        <div className="h-3 bg-slate-600 rounded flex-1"></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-600 rounded-full"></div>
                        <div className="h-3 bg-slate-600 rounded flex-1"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2">
                    <div className="bg-green-500 rounded-full p-2 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-slate-300 mb-8 text-lg">
                Add leads from LinkedIn to this campaign.
              </p>
              
              <Button 
                onClick={() => setShowAddModal(true)}
                className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Add leads
              </Button>
            </div>
          </div>
        ) : (
          // List State (when leads exist)
          <div className="space-y-4">
            {/* Lead list would go here */}
          </div>
        )}
      </div>

      {/* Modals */}
      <AddLeadsModal
        open={showAddModal}
        onClose={handleCloseAll}
        onSelectSource={handleSelectSource}
      />

      <CSVUploadModal
        open={showCSVUpload}
        onClose={handleCloseAll}
        onFileUploaded={handleFileUploaded}
      />

      {csvData && (
        <CSVMappingModal
          open={showCSVMapping}
          onClose={handleCloseAll}
          onBack={handleBackToUpload}
          csvData={csvData}
          onUpload={handleUploadComplete}
        />
      )}
    </div>
  );
}
