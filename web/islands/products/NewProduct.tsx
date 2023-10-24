import { useState } from "preact/hooks";

export default function NewProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
  });
  const [file, setFile] = useState("");

  const handleUpdateState = (e: any) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateFile = (e: any) => {
    setFile(e.target.value[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const resp = await fetch("http://localhost:3001/products", {
      method: "POST",
      body: JSON.stringify(product),
    });

    if (resp.status != 201) {
      alert("Error al Guardar!");
      return;
    }

    alert("Guardado con éxito!");
  };

  const validateProduct = () => {
    const { name, price } = product;

    const valid = !(name.length > 0) || !(price.length > 0);

    return valid;
  };

  return (
    <>
      <h1 class="font-bold text-gray-800 text-left pl-8">New Product</h1>

      <form onSubmit={handleSubmit}>
        <legend>Fill out all fields</legend>

        <div class="campo">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            onChange={handleUpdateState}
          />
        </div>

        <div class="campo">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            min="0.00"
            step="0.01"
            placeholder="Price"
            onChange={handleUpdateState}
          />
        </div>

        <div class="campo">
          <label>Image:</label>
          <input
            type="file"
            name="imagen"
            onChange={handleUpdateFile}
          />
        </div>

        <div class="enviar">
          <input
            type="submit"
            class="btn btn-azul"
            value="Add Product"
            style={"cursor: pointer"}
            disabled={validateProduct()}
          />
        </div>
      </form>
    </>
  );
}
