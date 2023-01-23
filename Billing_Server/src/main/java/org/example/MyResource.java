package org.example;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("root")
public class MyResource{

    //Logging In
    @POST
    @Path("login_")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAdmin(Admin a){
        AuthController auth = new AuthController();
        Session sn = auth.login(a);
        if(sn != null){
            return Response.ok(sn).build();
        }
        else
            return Response.status(401).build();
        }

    //Logging Out
    @DELETE
    @Path("logout_/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response logoutAdmin(@PathParam("id") int id){
        SessionController snCon = new SessionController();
        if(snCon.deleteSession(id) == 1) {
            return Response.ok().build();
        }
        else
            return Response.noContent().build();
    }

    //Customers
    @GET
    @Path("customers")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Customer> getCustomer(){
        DbCustomers cusObj = new DbCustomers();
        return cusObj.getCustomers();
    }

    //Getting Products list
    @GET
    @Path("products")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Product> getProducts(){
        DbProducts proObj = new DbProducts();
        return proObj.getProducts();
    }

    //Adding a new Product
    @POST
    @Path("products")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addProduct(Product p){
        DbProducts proObj = new DbProducts();
        if(proObj.addProduct(p) != null){
            return Response.ok(p).build();
        }
        else
            return Response.status(202).build();
    }

    //Updating product details
    @PUT
    @Path("products/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateProduct(@PathParam("id") String id, Product p){
        DbProducts proObj = new DbProducts();
        if(proObj.updateProduct(id, p) != null){
            return Response.ok().build();
        }
        else{
            return Response.status(204).build();
        }
    }

    //Getting Bills list
    @GET
    @Path("bills")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Bill> getBills(){
        DbBills billObj = new DbBills();
        return billObj.getBills();
    }

    //Generate a new bill
    @POST
    @Path("bills")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addBill(Bill b) throws Exception {
        DbBills billObj = new DbBills();
        if(billObj.addBill(b) != null) {
            return Response.ok(b).build();
        }
        else{
            return Response.status(202).build();
        }
    }

    //Getting list of bill items
    @GET
    @Path("billProducts")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Bill_product> getBill_products(){
        DbBill_products obj = new DbBill_products();
        return obj.getBill_product();
    }

    //Getting Discount details
    @GET
    @Path("discountRates")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Discount> getDiscountList(){
        DbDiscounts discount = new DbDiscounts();
        return discount.getDiscountList();
    }

    @POST
    @Path("discountRates")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response setDiscountRate(Discount d){
        DbDiscounts discount = new DbDiscounts();
        if(discount.setDiscount(d) != null) {
            return Response.ok(d).build();
        }
        else{
            return Response.status(202).build();
        }
    }

    @PUT
    @Path("discountRates/{category}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateDiscount(@PathParam("category") String category, Discount d){
        DbDiscounts discount = new DbDiscounts();
        if(discount.updateDiscount(category, d) != null){
            return Response.ok().build();
        }
        else{
            return Response.status(204).build();
        }
    }

    //Getting payment details
    @GET
    @Path("payments")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Payment> getPayments(){
        DbPayments payment = new DbPayments();
        return payment.getPayments();
    }

    //New payment
    @POST
    @Path("payments")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response doPayment(Payment pay){
        DbPayments payment = new DbPayments();
        if (payment.makePayment(pay) != null) {
            return Response.ok().build();
        }
        else{
            return Response.status(202).build();
        }
    }
}



//    @GET
//    @Path("newCustomer/{id}")
//    @Produces(MediaType.APPLICATION_JSON)
//    public Customer getACustomer(@PathParam("id") int id){
//        return obj.getCustomer(id);
//    }