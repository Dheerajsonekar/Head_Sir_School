"use client";

import { useEffect, useState, useRef } from "react";
import api from "@/utils/axios";
import { Download, FileText } from "lucide-react";
import html2pdf from "html2pdf.js";

export default function PrincipalReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get("principal/reports");
        setReports(res.data);
      } catch (error) {
        console.error("Error fetching reports", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const downloadAsPDF = (report: any) => {
    const element = document.createElement("div");
    element.innerHTML = `
      <h2>${report.title}</h2>
      <p><strong>Type:</strong> ${report.type}</p>
      <p><strong>Generated At:</strong> ${new Date(
        report.generatedAt
      ).toLocaleString()}</p>
      <pre>${JSON.stringify(report.data, null, 2)}</pre>
    `;

    html2pdf().set({
      margin: 1,
      filename: `${report.title.replace(/\s+/g, "_")}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    }).from(element).save();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <FileText className="mr-2" /> Reports
      </h1>

      {loading ? (
        <p>Loading reports...</p>
      ) : reports.length === 0 ? (
        <p className="text-gray-600">No reports found.</p>
      ) : (
        <div className="space-y-6">
          {reports.map((report) => (
            <div
              key={report._id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
              ref={reportRef}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {report.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Type: <span className="capitalize">{report.type}</span> | Generated At: {new Date(report.generatedAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => downloadAsPDF(report)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  <Download className="w-4 h-4 mr-2" /> Download
                </button>
              </div>
              <div className="mt-4">
                <pre className="text-sm bg-gray-100 p-4 rounded-md overflow-auto max-h-[300px]">
                  {JSON.stringify(report.data, null, 2)}
                </pre>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
