
import { CSVData, Lead } from "@/types/leads";

export const uploadCSVFile = async (file: File): Promise<{ data: CSVData }> => {
  // Mock implementation - in real app this would parse the CSV
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time
  
  return {
    data: {
      fileName: file.name,
      fileSize: `${Math.round(file.size / 1024)} KB`,
      columns: [
        {
          name: "URL",
          type: "do-not-import",
          samples: [
            "https://www.linkedin.com/in/rachana-peesara-478b74265",
            "https://www.linkedin.com/in/kelseyrandich",
            "https://www.linkedin.com/in/julieBoydstun",
            "https://www.linkedin.com/in/anthony-gallegro-960529156"
          ]
        },
        {
          name: "First Name",
          type: "first-name",
          samples: ["Rachana", "Kelsey", "Julie", "Anthony"]
        },
        {
          name: "Last Name", 
          type: "last-name",
          samples: ["Peesara", "Randich", "Boydstun", "Gallegro"]
        },
        {
          name: "Full Name",
          type: "do-not-import",
          samples: [
            "Rachana Peesara",
            "Kelsey Randich", 
            "Julie Boydstun",
            "Anthony Gallegro"
          ]
        },
        {
          name: "Headline",
          type: "do-not-import", 
          samples: [
            "Sr. Bench Sales Recruiter",
            "Recruiting Operations Leader | Former Calm",
            "Previous Sr. TA Partner @DeltaDental, currently looking for my next big role!",
            "Senior Sales Recruiter at NICE Ltd"
          ]
        },
        {
          name: "Email Address",
          type: "email",
          samples: [
            "nirvanjha2004@outflo.io",
            "nirvanjha2004@outflo.io", 
            "nirvanjha2004@outflo.io",
            "nirvanjha2004@outflo.io"
          ]
        },
        {
          name: "Job Title",
          type: "job-title",
          samples: [
            "Sr. Bench Sales Recruiter",
            "Recruiting Operations Leader",
            "Sr. TA Partner", 
            "Senior Sales Recruiter"
          ]
        },
        {
          name: "Company URL",
          type: "do-not-import",
          samples: ["", "", "", ""]
        },
        {
          name: "Tags",
          type: "do-not-import", 
          samples: ["", "", "", ""]
        },
        {
          name: "First Para",
          type: "do-not-import",
          samples: ["Hi my name is", "", "", ""]
        }
      ],
      rowCount: 150
    }
  };
};

export const processLeads = async (csvData: CSVData, columnMappings: Record<string, string>): Promise<{ data: Lead[] }> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock processed leads
  return {
    data: [
      {
        id: "1",
        firstName: "Rachana",
        lastName: "Peesara", 
        email: "nirvanjha2004@outflo.io",
        jobTitle: "Sr. Bench Sales Recruiter"
      },
      {
        id: "2", 
        firstName: "Kelsey",
        lastName: "Randich",
        email: "nirvanjha2004@outflo.io",
        jobTitle: "Recruiting Operations Leader"
      }
    ]
  };
};
