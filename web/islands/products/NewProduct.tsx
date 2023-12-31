import { useState } from "preact/hooks";

export default function NewProduct(props: { token: string }) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
  });
  const [file, setFile] = useState("");

  const updateState = (e: any) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const updateFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("image", file);

    try {
      const resp = await fetch("/api/products/new", {
        method: "POST",
        body: formData,
      });

      if (resp.status != 201) {
        alert("Error al Guardar!");
        return;
      }

      alert("Guardado con éxito!");
    } catch (error) {
      alert("Hubo un error. Vuelva a intentarlo");
    }
  };

  const validateProduct = () => {
    const { name, price } = product;

    const valid = !(name.length > 0) || !(price.length > 0);

    return valid;
  };

  return (
    <>
      <h2>New Product</h2>

      <form onSubmit={handleSubmit}>
        <legend>Fill out all fields</legend>

        <div class="campo">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            onChange={updateState}
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
            onChange={updateState}
          />
        </div>

        <div class="campo">
          <label>Image:</label>
          <input
            type="file"
            name="imagen"
            onChange={updateFile}
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
