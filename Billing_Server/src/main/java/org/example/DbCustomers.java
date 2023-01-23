package org.example;

import Db_Connection.DbConn;

import java.sql.PreparedStatement;
import java.sql.*;
import java.util.*;

public class DbCustomers {
    DbConn conn = new DbConn();
    public List<Customer> getCustomers(){
        List<Customer> customers = new ArrayList<>();
        String query = "Select * from customerTable;";
        try {
            Connection newConn = conn.DbConnection();
            Statement stmt = newConn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            while(rs.next()){
                Customer cus = new Customer();
                cus.setId(rs.getInt("cusId"));
                cus.setName(rs.getString("cusName"));
                cus.setNumber(rs.getString("number"));
                customers.add(cus);
            }
            stmt.close();
            newConn.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return customers;
    }

    public int createCustomer(String name, String number) {
        try {
            Connection newConn = conn.DbConnection();
            int response = 0;
            String query = "insert into customerTable (cusName, number) values (?,?);";
            PreparedStatement pdst = newConn.prepareStatement(query);
            pdst.setString(1, name);
            pdst.setString(2, number);
            pdst.executeUpdate();

            String sq = "select * from customerTable where number = '" + number + "' AND cusName = '"+ name + "';";
            Statement stmt = newConn.createStatement();
            ResultSet rs = stmt.executeQuery(sq);
            if (rs.next()) {
                response = rs.getInt("cusId");
            }
            pdst.close();
            stmt.close();
            newConn.close();
            return response;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }
}

//    public Customer getCustomer(int id){
//        for(Customer cus : customers){
//            if(cus.getId() == id){
//                return cus;
//            }
//        }
//        return new Customer();
//    }
