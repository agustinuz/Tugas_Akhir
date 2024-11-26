import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  DropdownButton,
  Dropdown,
  Button,
  Spinner,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ReportTable = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState("product"); // Default to 'product'
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchReportData(reportType);
  }, [reportType]);

  const fetchReportData = async (type) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/data/${type}`, {
        params: { start_date: startDate, end_date: endDate },
      });
      setReportData(response.data.data);
    } catch (err) {
      setError("Error fetching report data");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setError("Start date and end date are required.");
      return;
    }
    setError(null);
    fetchReportData("product");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(
      `${reportType === "product" ? "Product" : "Service"} Report`,
      20,
      10
    );

    const headers =
      reportType === "product"
        ? ["Period", "Product Name", "Total Quantity", "Total Price"]
        : ["Service Category", "Quantity", "Type"];

    const data = reportData.map((item) =>
      reportType === "product"
        ? [item.periode, item.name_product, item.qty_total, item.total_harga]
        : [item.kategori_service, item.qty, item.jenis]
    );

    doc.autoTable({
      head: [headers],
      body: data,
      startY: 20,
      theme: "striped",
    });

    doc.save(`${reportType}_report.pdf`);
  };

  const renderTable = () => {
    if (loading) {
      return <Spinner animation="border" role="status" />;
    }
    if (error) {
      return <p>{error}</p>;
    }

    if (reportType === "product") {
      return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Period</th>
              <th>Product Name</th>
              <th>Total Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((item, index) => (
              <tr key={index}>
                <td>{item.periode}</td>
                <td>{item.name_product}</td>
                <td>{item.qty_total}</td>
                <td>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(item.total_harga)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    } else if (reportType === "service") {
      return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Service Category</th>
              <th>Quantity</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((item, index) => (
              <tr key={index}>
                <td>{item.kategori_service}</td>
                <td>{item.qty}</td>
                <td>{item.jenis}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
  };

  return (
    <div>
      <DropdownButton
        variant="secondary"
        id="dropdown-basic-button"
        title={`Report Type: ${reportType}`}
        onSelect={(eventKey) => setReportType(eventKey)}
      >
        <Dropdown.Item eventKey="product">Product Report</Dropdown.Item>
        <Dropdown.Item eventKey="service">Service Report</Dropdown.Item>
      </DropdownButton>

      <h3 className="mt-4">
        {reportType === "product" ? "Product Sales Report" : "Service Report"}
      </h3>

      <Form onSubmit={handleFilter} className="mb-4">
        <Row>
          <Col md={5}>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2} className="d-flex align-items-end">
            <Button type="submit" variant="primary" block>
              Filter
            </Button>
          </Col>
        </Row>
      </Form>

      <Button variant="primary" className="mb-3" onClick={downloadPDF}>
        Download PDF
      </Button>

      {renderTable()}
    </div>
  );
};

export default ReportTable;
