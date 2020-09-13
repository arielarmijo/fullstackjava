<%-- 
    Document   : comprar
    Created on : 12-09-2020, 0:10:57
    Author     : Ariel Armijo Q. <arielarmijo@yahoo.es>
--%>

<%@page import="java.text.DecimalFormat"%>
<%@page import="java.util.Locale"%>
<%@page import="java.text.NumberFormat"%>
<%@page import="act4.ItemBoleta"%>
<%@page import="java.util.List"%>
<%@page import="act4.Producto"%>
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
        List<ItemBoleta> boleta = (List<ItemBoleta>) request.getAttribute("boleta");
        DecimalFormat fmt = new DecimalFormat("$###,###");
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
          <% for (ItemBoleta item : boleta) {%>
          <tr>
            <td><%= item.getProducto().getNombre()%></td>
            <td><%= item.getProducto().getMarca()%></td>
            <td><%= item.getCantidad()%></td>
            <td><%= fmt.format(item.getPrecio())%></td>
            <td><%= fmt.format(item.getSubTotal())%></td>
          </tr>
          <% }%>
        </tbody>
      </table>
      <div class="d-flex flex-column align-items-end">
        <p>Descuento: <span class="pr-5"><%= request.getAttribute("descuento")%></span></p>
        <p>Total: <span class="font-weight-bold pr-5"><%= request.getAttribute("total")%></span></p>
      </div>
      <div class="d-flex justify-content-end">
        <a href="index.jsp" class="btn btn-warning mr-3">Volver</a>
      </div>
    </div>
  </body>
</html>