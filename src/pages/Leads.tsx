
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CirclePlus } from "lucide-react";
import { AddLeadsModal } from "@/components/AddLeadsModal";
import { CSVUploadModal } from "@/components/CSVUploadModal";
import { CSVMappingModal } from "@/components/CSVMappingModal";
import { LeadSource, CSVData } from "@/types/leads";

export default function Leads() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCSVUpload, setShowCSVUpload] = useState(false);
  const [showCSVMapping, setShowCSVMapping] = useState(false);
  const [csvData, setCsvData] = useState<CSVData | null>(null);

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
    // Handle successful upload - could show success message or redirect
    console.log("Upload completed!");
  };

  const handleCloseAll = () => {
    setShowAddModal(false);
    setShowCSVUpload(false);
    setShowCSVMapping(false);
    setCsvData(null);
  };

  return (
    <div className="min-h-full bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 px-6 py-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-400 text-sm">
            <span>⚠️</span>
            <span>Your campaigns are not operating since they're outside of working hours at the moment.</span>
            <button className="text-blue-400 underline hover:text-blue-300">Adjust my schedule</button>
          </div>
        </div>
        
        <div className="flex gap-6 mt-4">
          <button className="text-white border-b-2 border-white pb-2 font-medium">Add Leads</button>
          <button className="text-slate-400 pb-2 hover:text-slate-300">Create a Sequence</button>
          <button className="text-slate-400 pb-2 hover:text-slate-300">Settings</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-semibold mb-8 text-white">Lists of leads</h1>
          
          <div className="mb-8">
            <Card className="bg-slate-800 border-slate-700 p-8 shadow-lg">
              <CardContent className="p-0">
                <div className="mb-6">
                  <div className="relative">
                    <div className="bg-white rounded-lg p-6 mb-4 shadow-lg">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                          <div className="h-2 bg-gray-200 rounded flex-1"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                          <div className="h-2 bg-gray-200 rounded flex-1"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                          <div className="h-2 bg-gray-200 rounded flex-1"></div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2">
                      <div className="bg-green-500 rounded-full p-2 shadow-lg">
                        <CirclePlus className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-300 mb-6">
                  Add leads from LinkedIn to this campaign.
                </p>
                
                <Button 
                  onClick={() => setShowAddModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                >
                  Add leads
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
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
