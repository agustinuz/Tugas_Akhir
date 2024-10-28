import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import {
  CDBCard,
  CDBCardBody,
  CDBDataTable,
  CDBContainer,
  CDBBtn,
} from "cdbreact";
import Swal from "sweetalert2";

const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [kategoriId, setKategoriId] = useState("");
  const [kategoris, setKategoris] = useState([]);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    fetchKategori();
    fetchProducts();
  }, []);

  const fetchKategori = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getKategori");
      setKategoris(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getproducts");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("kategori_id", kategoriId);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);
    try {
      await axios.post("http://localhost:5000/products", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      Swal.fire({
        title: "Create Product successful!",
        text: "Status: Saved.",
        icon: "success",
        confirmButtonText: "OK",
      });
      resetForm();
      fetchKategori();
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const updateProduct = async (id) => {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("name", name);
    formData.append("kategori_id", kategoriId);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);

    console.log("Updating product with ID:", id); // Debugging
    console.log("Form data:", Object.fromEntries(formData)); // Debugging

    try {
      await axios.put(`http://localhost:5000/products/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      Swal.fire({
        title: "Update Product successful!",
        text: "Status: Updated.",
        icon: "success",
        confirmButtonText: "OK",
      });
      resetForm();
      fetchKategori();
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      setShowDelete(false);
      Swal.fire({
        title: "Delete Product successful!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const resetForm = () => {
    setName("");
    setKategoriId("");
    setPrice("");
    setStock("");
    setDescription("");
    setFile(null);
    setPreview(null);
    setShow(false);
    setSelectedProductId(null);
  };

  const data = {
    columns: [
      {
        label: "#",
        field: "index",
        sort: "asc",
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
      },
      {
        label: "Kategori",
        field: "kategori_id",
        sort: "asc",
      },
      {
        label: "Price",
        field: "price",
        sort: "asc",
      },
      {
        label: "Stock",
        field: "stock",
        sort: "asc",
      },
      {
        label: "Description",
        field: "description",
        sort: "asc",
      },
      {
        label: "Image",
        field: "image",
        sort: "asc",
      },
      {
        label: "Action",
        field: "action",
      },
    ],
    rows: products.map((product, index) => ({
      index: index + 1,
      name: product.name,
      kategori_id: product.kategori_id,
      price: product.price,
      stock: product.stock,
      description: product.description,
      image: (
        <img
          src={`http://localhost:5000/uploads/imageProduct/${product.image}`}
          alt={product.name}
          style={{ width: "100px" }}
        />
      ),
      action: (
        <>
          <button
            type="button"
            className="btn btn-secondary btn-sm me-3 text-capitalize"
            onClick={() => {
              setSelectedProductId(product.id);
              setName(product.name);
              setKategoriId(product.kategori_id);
              setPrice(product.price);
              setStock(product.stock);
              setDescription(product.description);
              setPreview(
                `http://localhost:5000/uploads/imageProduct/${product.image}`
              );
              setShow(true);
            }}
          >
            Edit
          </button>
          <Button
            className="btn btn-danger btn-sm text-capitalize"
            variant="danger"
            onClick={() => {
              setShowDelete(true);
              setSelectedProductId(product.id);
            }}
          >
            Delete
          </Button>
          <Modal show={showDelete} onHide={() => setShowDelete(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this product?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowDelete(false)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => deleteProduct(selectProductId)}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ),
    })),
  };

  return (
    <>
      <div className="container-fluid px-4">
        <h2 className="mb-3">
          <strong>Product</strong>
        </h2>
        <figcaption className="blockquote-footer mb-5">
          All Of <cite title="Source Title">Product</cite>
        </figcaption>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectProductId ? "Update Product" : "Add Product"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={
                selectProductId
                  ? (e) => {
                      e.preventDefault();
                      updateProduct(selectProductId);
                    }
                  : saveProduct
              }
            >
              <Form.Group className="mb-3" controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="productCategory">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={kategoriId}
                  onChange={(e) => setKategoriId(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {kategoris.map((list) => (
                    <option key={list.id} value={list.id}>
                      {list.nameKategori}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="productPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="productStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="productDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control type="file" onChange={loadImage} required />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ width: "100px", marginTop: "10px" }}
                  />
                )}
              </Form.Group>
              <Button variant="primary" type="submit">
                {selectProductId ? "Update" : "Add"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <CDBContainer fluid>
          <CDBCard style={{ borderRadius: "15px" }}>
            <CDBCardBody>
              <CDBBtn
                color="primary"
                size="large"
                circle
                onClick={() => setShow(true)}
              >
                Add New Product
              </CDBBtn>
              <CDBDataTable
                bordered
                striped
                hover
                data={data}
                entriesLabel="Show entries"
                pagesAmount={4}
                pageButtonLabel="Go to"
                noRecordsFoundLabel="No records found"
                searchLabel="Search"
                paginationLabel={["Previous", "Next"]}
              />
            </CDBCardBody>
          </CDBCard>
        </CDBContainer>
      </div>
    </>
  );
};

export default AddProduct;
