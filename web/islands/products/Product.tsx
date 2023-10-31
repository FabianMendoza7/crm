export default function Product(props: { key: number; data: any }) {
  const { id, name, price, image } = props.data;

  const deleteProduct = async (id: number) => {
    console.log("Eliminando...", id);

    if (confirm("Are you sure?")) {
      const resp = await fetch(`http://localhost:3001/products/${id}`, {
        method: "DELETE",
      });
      if (resp.status != 200) {
        const data = await resp.json();
        console.log(">> data", data);
        const { error } = data;

        if (error && error.code == "23503") {
          alert(
            "El producto no se puede eliminar ya que tiene al menos un pedido",
          );
        } else {
          alert("Error al Eliminar");
        }
        return;
      }

      alert("Eliminado con éxito!");
    }
  };

  return (
    <li class="producto">
      <div class="info-producto">
        <p class="nombre">{name}</p>
        <p class="precio">${price}</p>
        {image
          ? <img src={`http://localhost:3001/${image}`} alt="image" />
          : null}
      </div>
      <div class="acciones">
        <a href={`/products/edit/${id}`} class="btn btn-azul">
          <i class="fas fa-pen-alt"></i>
          Edit Product
        </a>
        <button
          type="button"
          class="btn btn-rojo btn-eliminar"
          onClick={() => deleteProduct(id)}
        >
          <i class="fas fa-times"></i>
          Delete Customer
        </button>
      </div>
    </li>
  );
}
