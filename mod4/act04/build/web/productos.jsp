<%-- 
    Document   : productos
    Created on : 11-09-2020, 20:21:37
    Author     : Ariel Armijo Q. <arielarmijo@yahoo.es>
--%>

<%@page import="java.util.List"%>
<%@page import="act4.Producto"%>
<%@page import="act4.Inventario"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <title>JSP Page</title>
  </head>
  <body>
    <div class="container">
      <h1 class="text-center my-4">Productos</h1>
      <% List<Producto> inventario = Inventario.getInventario(); %>
      <form action="validar" method="POST" class="shadow pb-3">
        <table class="table table-striped table-bordered table-hover text-center">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Stock</th>
              <th>Imagen</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Compra</th>
            </tr>
          </thead>
          <tbody>
            <% for (int i = 0; i < inventario.size(); i++) {%>
            <tr>
              <td><%=inventario.get(i).getCodigo()%></td>
              <td><%=inventario.get(i).getNombre()%></td>
              <td><%=inventario.get(i).getMarca()%></td>
              <td><%=inventario.get(i).getStock()%></td>
              <td><img src=<%=inventario.get(i).getImagen()%> width="50" height="50"></td>
              <td>$<%=inventario.get(i).getPrecio()%></td>
              <td>
                <select name="cantidad-<%=inventario.get(i).getCodigo()%>">
                  <% for (int j = 1; j <= inventario.get(i).getStock(); j++) {%>
                  <option><%=j%></option>
                  <% }%>
                </select>
              </td>
              <td><input type="checkbox" name="producto" value=<%=inventario.get(i).getCodigo()%>></td>
            </tr>
            <% }%>
          </tbody>
        </table>
        <div class="d-flex justify-content-end">
          <div>
            <a href="index.jsp" class="btn btn-warning mr-3">Salir</a>
            <input type="reset" class="btn btn-primary" value="Limpiar">
            <input type="submit" class="btn btn-primary mr-2" value="Comprar">
          </div>
        </div>
      </form>
    </div>
  </body>
</html>