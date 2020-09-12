package act3;

import java.util.ArrayList;
import java.util.List;

public class Inventario {

  private static List<Producto> inventario;

  public static List<Producto> getInventario() {
    if (inventario == null) {
      inventario = new ArrayList<>();
      inventario.add(new Producto("Celular", "LG", 70000, 100, "https://via.placeholder.com/50"));
      inventario.add(new Producto("LCD", "Samsung", 199900, 120, "https://via.placeholder.com/50"));
      inventario.add(new Producto("Tablet", "Sony", 80000, 150, "https://via.placeholder.com/50"));
      inventario.add(new Producto("Cámara", "Canon", 320000, 85, "https://via.placeholder.com/50"));
    }
    return inventario;
  }
  
  public static Producto buscarProductoPorCodigo(String codigo) {
    if (inventario ==  null)
      getInventario();
    int cod = Integer.parseInt(codigo);
    for (Producto p : inventario) {
      if (p.getCodigo() == cod) {
        return p;
      }
    }
    return null;
  }
  
}
