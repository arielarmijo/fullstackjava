<%-- 
    Document   : comprar
    Created on : 12-09-2020, 0:10:57
    Author     : Ariel Armijo Q. <arielarmijo@yahoo.es>
--%>

<%@page import="act3.Producto"%>
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
      <h1 class="text-center mt-5 mb-4">Comprobante de Compra</h1>
      <%
        Producto[] productos = (Producto[]) request.getAttribute("productos");
        int[] cantidades = (int[]) request.getAttribute("cantidades");
      %>
      <table class="table table-striped table-bordered table-hover text-center">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <% for (int i = 0; i < productos.length; i++) {%>
          <tr>
            <td><%= productos[i].getNombre()%></td>
            <td><%= productos[i].getMarca()%></td>
            <td><%= cantidades[i]%></td>
            <td><%= productos[i].getPrecio()%></td>
            <td>$<%= productos[i].getPrecio() * cantidades[i]%></td>
          </tr>
          <% }%>
        </tbody>
      </table>
      <div class="d-flex flex-column align-items-end">
        <p>Descuento: $<span class="pr-5"><%= request.getAttribute("descuento")%></span></p>
        <p>Total: $<span class="font-weight-bold pr-5"><%= request.getAttribute("total")%></span></p>
      </div>
      <div class="d-flex justify-content-end">
        <a href="index.jsp" class="btn btn-warning mr-3">Volver</a>
      </div>
    </div>
  </body>
</html>