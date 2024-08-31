import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Modal, Image } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    kategori_id: "",
    price: "",
    stock: "",
    description: "",
    file: null,
  });
  const [preview, setPreview] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    fetchKategori();
    fetchProducts();
  }, []);

  const fetchKategori = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getKategori");
      setKategori(response.data);
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

  const handleSaveProduct = async () => {
    const productData = new FormData();
    for (const key in formData) {
      productData.append(key, formData[key]);
    }
    try {
      if (editProduct) {
        await axios.patch(
          `http://localhost:5000/products/${editProduct.id}`,
          productData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        await axios.post("http://localhost:5000/products", productData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchProducts();
      handleClose();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      kategori_id: product.kategori_id,
      price: product.price,
      stock: product.stock,
      description: product.description,
      file: null,
    });
    setPreview(product.image_url); // Assuming the response has `image_url`
    setShowModal(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setEditProduct(null);
    setFormData({
      name: "",
      kategori_id: "",
      price: "",
      stock: "",
      description: "",
      file: null,
    });
    setPreview("");
  };

  return (
    <div>
      <Button onClick={() => setShowModal(true)} variant="primary">
        Add Product
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Kategori</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>
                {categories.find((cat) => cat.id === product.kategori_id)?.name}
              </td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.description}</td>
              <td>
                <Image src={product.image_url} rounded width={100} />
              </td>
              <td>
                <Button
                  onClick={() => handleEditProduct(product)}
                  variant="warning"
                >
                  Edit
                </Button>{" "}
                <Button
                  onClick={() => handleDeleteProduct(product.id)}
                  variant="danger"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editProduct ? "Edit Product" : "Add Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="kategori_id"
                value={formData.kategori_id}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.nameKategori}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Product price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Product stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Product description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductImage">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="file" onChange={handleChange} />
              {preview && <Image src={preview} thumbnail />}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddProduct;
