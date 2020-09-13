package act4;

public class ItemBoleta {

  private Producto producto;
  private int cantidad;
  private int precio;

  public ItemBoleta(Producto producto, int cantidad, int precio) {
    this.producto = producto;
    this.cantidad = cantidad;
    this.precio = precio;
  }

  public int getPrecio() {
    return precio;
  }

  public void setPrecio(int precio) {
    this.precio = precio;
  }

  public Producto getProducto() {
    return producto;
  }

  public void setProducto(Producto producto) {
    this.producto = producto;
  }

  public int getCantidad() {
    return cantidad;
  }

  public void setCantidad(int cantidad) {
    this.cantidad = cantidad;
  }
  
  public int getSubTotal() {
    return precio * cantidad;
  }

}