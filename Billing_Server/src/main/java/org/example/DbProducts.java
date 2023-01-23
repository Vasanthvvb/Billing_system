package org.example;

import Db_Connection.DbConn;
import java.util.*;
import java.sql.*;
import java.text.DecimalFormat;


public class DbProducts {

    DbConn conn = new DbConn();
    public List<Product> getProducts(){
        List<Product> products = new ArrayList<>();
        String query = "select * from products order by pName asc;";
        try {
            Connection newConn = conn.DbConnection();
            Statement stmt = newConn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            while(rs.next()){
                Product prod = new Product();
                prod.setId(rs.getString("pId"));
                prod.setName(rs.getString("pName"));
                prod.setQuantity(rs.getInt("pQuantity"));
                prod.setPrice(rs.getFloat("pPrice"));
                prod.setTax(rs.getFloat("pTax"));
                prod.setCategory(rs.getString("pCategory"));
                products.add(prod);
            }
            stmt.close();
            newConn.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return products;
    }

    public Product addProduct(Product p){
        boolean flag = false;
        String sq = "Select * from products";
        try {
            Connection newConn = conn.DbConnection();
            Statement stmt = newConn.createStatement();
            ResultSet rs = stmt.executeQuery(sq);
            while(rs.next()){
                if(p.getId().equals(rs.getString("pId")) ||
                        p.getName().equals(rs.getString("pName"))){
                    flag = true;
                }
            }
            stmt.close();
            conn.DbConnection().close();
        }
        catch (Exception e){
            e.printStackTrace();
        }

        if (!flag) {
            String query = "insert into products (pId, pName, pQuantity, pPrice, pTax, pCategory, createdUser) values (?,?,?,?,?,?,?);";
            try {
                Connection newConn = conn.DbConnection();
                PreparedStatement pdst = newConn.prepareStatement(query);
                pdst.setString(1, p.getId());
                pdst.setString(2, p.getName());
                pdst.setInt(3, p.getQuantity());
                pdst.setFloat(4, p.getPrice());
                pdst.setFloat(5, p.getTax());
                pdst.setString(6, p.getCategory());
                pdst.setInt(7, p.getCreatedUser());
                pdst.executeUpdate();
                pdst.close();
                newConn.close();
            }
            catch (Exception e) {
                e.printStackTrace();
            }
            return p;
        }
        return null;
    }

    //Update product Details
    public Product updateProduct(String id, Product p){
        //System.out.println(p.getId()+" "+p.getName()+" "+p.getCategory()+" "+p.getPrice()+" "+p.getTax()+" "+p.getQuantity());
        String updateQuery = "UPDATE products SET pQuantity = ? , pPrice = ? , pTax = ?, modifiedUser = ? where pId = ? ;";
        try {
            Connection newConn = conn.DbConnection();
            PreparedStatement pdst = newConn.prepareStatement(updateQuery);
            pdst.setInt(1, p.getQuantity());
            pdst.setFloat(2, p.getPrice());
            pdst.setFloat(3, p.getTax());
            pdst.setInt(4, p.getModifiedUser());
            pdst.setString(5, id);
            pdst.executeUpdate();
            pdst.close();
            newConn.close();
            return p;
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}

