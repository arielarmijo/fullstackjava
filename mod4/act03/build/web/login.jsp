<%-- 
    Document   : validacion
    Created on : 10-09-2020, 22:30:27
    Author     : Ariel Armijo Q. <arielarmijo@yahoo.es>
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
  <head>
    <title>Validación</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
  </head>
  <body>
    <div class="container">
      <h1 class="text-center">Validación</h1>
        <%
          String usuario = request.getParameter("usuario");
          String password = request.getParameter("password");
        if (usuario.equals("DuocUc") && password.equals(usuario)) { %>
      <div class="alert alert-success">Usuario y contraseña correctos</div>
      <% } else { %>
      <div class="alert alert-danger">Usuario y contraseña incorrectos</div>
      <%}%>
    </div>
  </body>
</html>