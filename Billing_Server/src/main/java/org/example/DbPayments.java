package org.example;

import Db_Connection.DbConn;

import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class DbPayments {
    DbConn conn = new DbConn();
    public List<Payment> getPayments(){
        List<Payment> paymentList = new ArrayList<>();
        String query = "select * from paymentTable";
        try {
            Connection newConn = conn.DbConnection();
            Statement stmt = newConn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            while(rs.next()){
                Payment payment = new Payment();
                payment.setPayId(rs.getInt("payId"));
                payment.setBillId(rs.getInt("bId"));
                payment.setDate(rs.getString("payDate"));
                payment.setAmount(rs.getFloat("amount"));
                paymentList.add(payment);
            }
            stmt.close();
            newConn.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return paymentList;
    }

    public Payment makePayment(Payment p){
        LocalDate date = LocalDate.now();
        try {
            Connection newConn = conn.DbConnection();
            String sq = "select * from billTable where bId = "+p.getBillId()+";";
            Statement stmt = newConn.createStatement();
            ResultSet rs = stmt.executeQuery(sq);
            if(rs.next()){
                float balance = rs.getFloat("balance");
                if(balance != 0) {
                    balance = balance - p.getAmount();
                    String sq1 = "update billTable set balance = " + balance + " where bId = " + p.getBillId() + ";";
                    stmt.executeUpdate(sq1);

                    String query = "insert into paymentTable (bId, payDate, amount, userId) values (?,?,?,?);";
                    PreparedStatement pdst = newConn.prepareStatement(query);
                    pdst.setInt(1, p.getBillId());
                    pdst.setDate(2, Date.valueOf(date));
                    pdst.setFloat(3, p.getAmount());
                    pdst.setInt(4, p.getUserId());
                    pdst.executeUpdate();
                    pdst.close();
                    return p;
                }
            }
            stmt.close();
            newConn.close();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
