package org.example;

import Db_Connection.DbConn;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.text.DecimalFormat;

public class DbDiscounts {
    DbConn conn = new DbConn();
    //private static final DecimalFormat df = new DecimalFormat("0.00");
    public List<Discount> getDiscountList(){
        List<Discount> discountList = new ArrayList<>();
        String query = "Select * from discountTable order by categories asc;";
        try {
            Connection newConn = conn.DbConnection();
            Statement stmt = newConn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            while(rs.next()){
                Discount d_count = new Discount();
                d_count.setCategory(rs.getString("categories"));
                d_count.setDiscountRate(rs.getFloat("discountRate"));
                discountList.add(d_count);
            }
            stmt.close();
            newConn.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return discountList;
    }

    public Discount setDiscount(Discount d){
        String query = "insert into discountTable (categories, discountRate) values (?,?);";
        try {
            Connection newConn = conn.DbConnection();
            PreparedStatement pdst = newConn.prepareStatement(query);
            pdst.setString(1, d.getCategory());
            pdst.setFloat(2, d.getDiscountRate());
            pdst.executeUpdate();
            newConn.close();
            return d;
            }
        catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    public Discount updateDiscount(String category, Discount d){
        String updateQuery = "update discountTable set discountRate = ? where categories = ?;";
        try{
            Connection newConn = conn.DbConnection();
            PreparedStatement pdst0 = newConn.prepareStatement(updateQuery);
            pdst0.setFloat(1, d.getDiscountRate());
            pdst0.setString(2, category);
            pdst0.executeUpdate();
            newConn.close();
            return d;
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
