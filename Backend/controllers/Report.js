import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import {
  TransactionMaster,
  TransactionDetail,
} from "../models/TransactionModel.js";
import Form_Service from "../models/FormService.js";

// Helper function to ensure the "reports" directory exists
function ensureReportsDirectory() {
  const reportsDir = path.join("reports");
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir);
  }
}

// Helper function to generate PDF and send it as a response
function generatePDF(data, filename, title, columns, res) {
  ensureReportsDirectory(); // Check or create "reports" directory

  const doc = new PDFDocument();
  const filePath = path.join("reports", `${filename}.pdf`);

  // Stream PDF to file system
  doc.pipe(fs.createWriteStream(filePath));

  // Document title
  doc.fontSize(18).text(title, { align: "center" });
  doc.moveDown();

  // Table headers
  doc.fontSize(12);
  columns.forEach((col) => doc.text(col, { continued: true, width: 120 }));
  doc.moveDown();

  // Table rows
  data.forEach((row) => {
    columns.forEach((col) =>
      doc.text(row[col] || "", { continued: true, width: 120 })
    );
    doc.moveDown();
  });

  doc.end();

  // Send file as a response
  res.download(filePath, (err) => {
    if (err) console.error("Error downloading the file:", err);
    // Delete the file after sending
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error deleting the file:", err);
    });
  });
}

// Controller for Transaction Report
export const getTransactionReport = async (req, res) => {
  try {
    // Fetch transactions with their details
    const transactions = await TransactionMaster.findAll({
      include: [
        {
          model: TransactionDetail,
          attributes: ["product_id", "qty"],
        },
      ],
    });

    // Format data for PDF
    const data = transactions.map((transaction) => ({
      id: transaction.id,
      user_id: transaction.user_id,
      name: transaction.name,
      transaction_date: transaction.transaction_date,
      status: transaction.status,
      details: transaction.transaction_details
        .map((detail) => `Product ID: ${detail.product_id}, Qty: ${detail.qty}`)
        .join("; "), // Concatenate details into a single string
    }));

    // Generate and send PDF
    generatePDF(
      data,
      "Transaction_Report",
      "Transaction Report",
      ["id", "user_id", "name", "transaction_date", "status", "details"],
      res
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error generating transaction report", error });
  }
};

// Controller for Appointment Report
export const getAppointmentReport = async (req, res) => {
  try {
    // Fetch appointments
    const appointments = await Form_Service.findAll();

    // Format data for PDF
    const data = appointments.map((appointment) => ({
      Name_Owner: appointment.Name_Owner,
      Name_Animal: appointment.Name_Animal,
      birthday_Animal: appointment.birthday_Animal,
      Jenis: appointment.Jenis,
      RAS: appointment.RAS,
      Quantity: appointment.Quantity,
      kategori_service: appointment.kategori_service,
      userId: appointment.userId,
      status: appointment.status,
    }));

    // Generate and send PDF
    generatePDF(
      data,
      "Appointment_Report",
      "Appointment Report",
      [
        "Name_Owner",
        "Name_Animal",
        "birthday_Animal",
        "Jenis",
        "RAS",
        "Quantity",
        "kategori_service",
        "userId",
        "status",
      ],
      res
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error generating appointment report", error });
  }
};

// Controller for counting appointments
export const getAppointmentCount = async (req, res) => {
  const { id } = req.params; // Get user ID from request parameters
  try {
    // Count appointments for the given user ID
    const count = await Form_Service.count({
      where: { userId: id },
    });
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching appointment count",
      error,
    });
  }
};
