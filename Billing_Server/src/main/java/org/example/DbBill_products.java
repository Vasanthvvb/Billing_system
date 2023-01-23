package org.example;

import java.util.*;
import Db_Connection.DbConn;
import java.sql.*;

public class DbBill_products {
    DbConn conn = new DbConn();
    public List<Bill_product> getBill_product(){
        List<Bill_product> list = new ArrayList<>();

        String query1 = "select * from billProduct";
        try {
            Connection newCon = conn.DbConnection();
            Statement stmt1 = newCon.createStatement();
            ResultSet rs1 = stmt1.executeQuery(query1);
            while(rs1.next()){
                Bill_product obj = new Bill_product();
                obj.setBillId(rs1.getInt("bId"));
                obj.setProId(rs1.getString("productId"));
                obj.setQuantity(rs1.getInt("productQty"));
                obj.setTax(rs1.getFloat("productTax"));
                obj.setDiscount(rs1.getFloat("discount"));
                obj.setTotalPrice(rs1.getFloat("totalPrice"));

                //Getting product name
                String query2 = "select pName from products where pId = '"+ rs1.getString("productId") +"'";
                Statement stmt2 = newCon.createStatement();
                ResultSet rs2 = stmt2.executeQuery(query2);
                if(rs2.next()){
                    obj.setName(rs2.getString("pName"));
                }
                list.add(obj);
                stmt2.close();
            }
            stmt1.close();
            newCon.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return list;
    }
}
