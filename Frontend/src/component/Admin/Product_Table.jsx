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
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddProduct = () => {
  const [product, setProduct] = useState([]);
  const [name, setName] = useState("");
  const [kategoriId, setKategoriId] = useState("");
  const [kategoris, setKategoris] = useState([]);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getKategori");
        setKategoris(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    if (show) {
      fetchKategori(); // Memanggil fungsi hanya ketika modal ditampilkan
    }
    fetchProducts();
  }, [show]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getproducts");
      setProduct(response.data);
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
      await axios.postForm("http://localhost:5000/products", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      Swal.fire({
        title: "Create Product successful!",
        text: "Saved.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/Dashboard/product");
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // Data for CDBDataTable
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
        label: "Kategori", // Kolom kategori
        field: "kategori_id", // Ubah dari kategori_id menjadi kategori
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
        label: "image",
        field: "image",
        sort: "asc",
      },
      {
        label: "Action",
        field: "action",
      },
    ],
    rows: product.map((products, index) => ({
      index: index + 1,
      name: products.name,
      kategori_id: products.kategori_id,
      price: products.price,
      stock: products.stock,
      description: products.description,
      image: (
        <img
          src={`http://localhost:5000/imageProduct/${products.image}`}
          alt={products.name}
          style={{ width: "100px" }}
        />
      ),
      action: (
        <>
          <button
            type="button"
            className="btn btn-secondary btn-sm me-3 text-capitalize"
          >
            Edit
          </button>
          <button className="btn btn-outline-danger btn-sm text-capitalize">
            Delete
          </button>
        </>
      ),
      clickEvent: () => alert("Klik Oke Untuk Melanjutkan Delete"),
    })),
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Create Product
      </Button> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={saveProduct}>
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productImage">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={loadImage} required />
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="img-thumbnail mt-2"
                />
              )}
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Save Product
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
              onClick={() => handleShow(true)}
            >
              Create New Product
            </CDBBtn>
            <CDBDataTable
              responsive
              striped
              bordered
              hover
              data={data}
              pagination
              materialSearch={true}
            />
          </CDBCardBody>
        </CDBCard>
      </CDBContainer>
    </>
  );
};

export default AddProduct;
