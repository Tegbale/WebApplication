import exportFromJSON from "export-from-json";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const dataParser = () => {
  function exportDataFromJSON(data, newFileName, fileExportType) {
    if (!data) return;
    try {
      const fileName = newFileName || "exported-data";
      const exportType = exportFromJSON.types[fileExportType || "xls"];
      exportFromJSON({ data, fileName, exportType });
    } catch (e) {
      throw new Error("Parsing failed!");
    }
  }

  function generatePdf(rows, columns, newFileName) {
    // if (!data) return;
    const fileName = newFileName || "data.pdf";
    const doc = new jsPDF();

    // // define the table columns and rows
    // const columns = ['Name', 'Age', 'Gender'];
    // const rows = [
    //     ['John Doe', 30, 'Male'],
    //     ['Jane Doe', 25, 'Female'],
    //     ['Bob Smith', 40, 'Male']
    // ];

    doc.autoTable({
      head: [columns],
      body: rows,
    });
    doc.save(fileName);
  }
  return {
    exportDataFromJSON,
    generatePdf,
  };
};
