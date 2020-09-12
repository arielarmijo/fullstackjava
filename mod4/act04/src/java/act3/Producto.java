package act3;

public class Producto {

  static int siguienteCodigo = 123456;
  private int codigo;
  private String nombre;
  private String marca;
  private int stock;
  private int precio;
  private String imagen;

  public Producto(String nombre, String marca, int precio, int stock, String imagen) {
    this.codigo = siguienteCodigo++;
    this.nombre = nombre;
    this.marca = marca;
    this.precio = precio;
    this.stock = stock;
    this.imagen = imagen;
  }

  public int getCodigo() {
    return codigo;
  }

  public void setCodigo(int codigo) {
    this.codigo = codigo;
  }

  public String getNombre() {
    return nombre;
  }

  public void setNombre(String nombre) {
    this.nombre = nombre;
  }

  public String getMarca() {
    return marca;
  }

  public void setMarca(String marca) {
    this.marca = marca;
  }

  public int getStock() {
    return stock;
  }

  public void setStock(int stock) {
    this.stock = stock;
  }

  public int getPrecio() {
    return precio;
  }

  public void setPrecio(int precio) {
    this.precio = precio;
  }

  public String getImagen() {
    return imagen;
  }

  public void setImagen(String imagen) {
    this.imagen = imagen;
  }
  
}
