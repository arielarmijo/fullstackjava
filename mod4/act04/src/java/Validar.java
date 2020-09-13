/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import act4.Inventario;
import act4.ItemBoleta;
import act4.Producto;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Ariel Armijo Q. <arielarmijo@yahoo.es>
 */
public class Validar extends HttpServlet {

  /**
   * Processes requests for both HTTP <code>GET</code> and <code>POST</code> methods.
   *
   * @param request servlet request
   * @param response servlet response
   * @throws ServletException if a servlet-specific error occurs
   * @throws IOException if an I/O error occurs
   */
  protected void processRequest(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    response.setContentType("text/html;charset=UTF-8");
    try (PrintWriter out = response.getWriter()) {

      String[] codigos = request.getParameterValues("producto");

      if (codigos != null) {

        List<ItemBoleta> boleta = new ArrayList<>();

        for (String codigo : codigos) {
          Producto producto = Inventario.buscarProductoPorCodigo(codigo);
          int cantidad = Integer.parseInt(request.getParameter("cantidad-" + codigo));
          boleta.add(new ItemBoleta(producto, cantidad, producto.getPrecio()));
        }

        int totalProductos = 0;
        int total = 0;
        int descuento = 0;

        for (ItemBoleta item : boleta) {
          totalProductos += item.getCantidad();
          total += item.getCantidad() * item.getPrecio();
        }

        if (totalProductos >= 5) {
          descuento = (int) Math.round(total * 0.03);
        }

        total -= descuento;
        
        DecimalFormat fmt = new DecimalFormat("$###,###");

        // Envío de variables de un Servlet a un JSP
        request.setAttribute("boleta", boleta);
        request.setAttribute("descuento", fmt.format(descuento));
        request.setAttribute("total", fmt.format(total));
        request.getRequestDispatcher("boleta.jsp").forward(request, response);

      } else {
        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<head>");
        out.println("<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css\">");
        out.println("<title>Servlet validacion</title>");
        out.println("</head>");
        out.println("<body class=\"container\">");
        out.println("<div class=\"alert alert-danger mt-5\">No se ha seleccionado ningún producto</div>");
        out.println("<a href=\"productos.jsp\" class=\"btn btn-primary\">Volver</a>");
        out.println("</body>");
        out.println("</html>");
      }

    }
  }

  // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
  /**
   * Handles the HTTP <code>GET</code> method.
   *
   * @param request servlet request
   * @param response servlet response
   * @throws ServletException if a servlet-specific error occurs
   * @throws IOException if an I/O error occurs
   */
  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    processRequest(request, response);
  }

  /**
   * Handles the HTTP <code>POST</code> method.
   *
   * @param request servlet request
   * @param response servlet response
   * @throws ServletException if a servlet-specific error occurs
   * @throws IOException if an I/O error occurs
   */
  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    processRequest(request, response);
  }

  /**
   * Returns a short description of the servlet.
   *
   * @return a String containing servlet description
   */
  @Override
  public String getServletInfo() {
    return "Short description";
  }// </editor-fold>

}
