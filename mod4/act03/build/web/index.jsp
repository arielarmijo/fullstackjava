<%-- 
    Document   : index
    Created on : 10-09-2020, 22:14:41
    Author     : Ariel Armijo Q. <arielarmijo@yahoo.es>
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <title>Actividad 3</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
  </head>
  <body>
    <div class="container">
      <h1 class="text-center">Acceso</h1>
      <div class="row justify-content-center">
        <form action="login.jsp" class="d-inline-block p-3">
          <div class="form-group row justify-content-center">
            <label for="usuario" class="col-4 col-form-label text-right">Usuario:</label>
            <div class="col-8">
              <input type="text" id="usuario" name="usuario" class="form-control">
            </div>
          </div>
          <div class="form-group row justify-content-center">
            <label for="password" class="col-4 col-form-label text-right">Contraseña:</label>
            <div class="col-8">
              <input type="password" id="password" name="password" class="form-control">
            </div>
          </div>
          <div class="form-group row justify-content-end mx-0">
            <input type="reset" class="btn btn-warning mr-2" value="Limpiar"/>
            <input type="submit" class="btn btn-primary mr-3" value="Validar">
          </div>
        </form>
      </div>
    </div>
  </body>
</html>