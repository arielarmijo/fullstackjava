/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import act3.Inventario;
import act3.Producto;
import java.io.IOException;
import java.io.PrintWriter;
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
      
      int[] cantidades = new int[codigos.length];
      
      for (int i = 0; i < codigos.length; i++) {
        cantidades[i] = Integer.parseInt(request.getParameter("cantidad-" + codigos[i]));
      }
      
      int totalProductos = 0;
      
      for (int n : cantidades) {
        totalProductos += n;
      }
      
      Producto[] productos = new Producto[codigos.length];
      
      for (int i = 0; i < codigos.length; i++) {
        productos[i] = Inventario.buscarProductoPorCodigo(codigos[i]);
        int stock = productos[i].getStock() - cantidades[i];
        productos[i].setStock(stock);
      }
      
      int total = 0;
      
      for (int i = 0; i < cantidades.length; i++) {
        total += cantidades[i] * productos[i].getPrecio();
      }
      int descuento = 0;
      if (totalProductos >= 5)
        descuento = (int) Math.round(total * 0.03);
      
      total -= descuento;
      
      // Envío de variables de un Servlet a un JSP
      request.setAttribute("productos", productos);
      request.setAttribute("cantidades", cantidades);
      request.setAttribute("descuento", descuento);
      request.setAttribute("total", total);
      request.getRequestDispatcher("compra.jsp").forward(request, response);

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
