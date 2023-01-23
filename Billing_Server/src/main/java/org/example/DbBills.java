package org.example;

import Db_Connection.DbConn;
import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class DbBills {
    DbConn conn = new DbConn();
    public List<Bill> getBills(){
        List<Bill> bills = new ArrayList<>();
        //Getting Bills details
        String query = "select * from billTable order by bId asc;";
        try{
            Connection newConn = conn.DbConnection();
            Statement stmt = newConn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            while(rs.next()){
                Bill bill = new Bill();
                bill.setbId(rs.getInt("bId"));
                bill.setcId(rs.getInt("cId"));
                bill.setTotal(rs.getFloat("totalAmount"));
                bill.setBalance(rs.getFloat("balance"));
                bill.setDate(rs.getString("bDate"));
                bill.setUserId(rs.getInt("userId"));
                bills.add(bill);
            }
            stmt.close();
            newConn.close();
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return bills;
    }


    public Bill addBill(Bill b) throws Exception{
        Connection newConn = conn.DbConnection();
        int response;
        float discountRate;
        float totalPrice;
        float taxPrice;
        //float totalPrice1;
        String cusName = b.getName();
        String cusNumber = b.getNumber();

        //Validating mobile number
        Pattern p = Pattern.compile("^\\d{10}$");
        Matcher m = p.matcher(cusNumber);
        if (m.matches()) {
            //Validating Customer
            String sq = "select * from customerTable where number = '" + cusNumber + "' AND cusName = '" + cusName +"';";
            Statement stmt = newConn.createStatement();
            ResultSet rs = stmt.executeQuery(sq);
            if (!rs.next()) {
                DbCustomers customer = new DbCustomers();
                response = customer.createCustomer(cusName, cusNumber);
            } else {
                response = rs.getInt("cusId");
            }
            stmt.close();
        }
        else{
            return null;
        }

        //Adding a new bill
        if(response != 0){
            LocalDate date = LocalDate.now();
            String query = "insert into billTable (cId, totalAmount, balance, bDate, userId) values (?,?,?,?,?) returning bId;";
            PreparedStatement pdst = newConn.prepareStatement(query);
            pdst.setInt(1, response);
            pdst.setFloat(2, b.getTotal());
            pdst.setFloat(3, b.getBalance());
            pdst.setDate(4, Date.valueOf(date));
            pdst.setInt(5, b.getUserId());
            pdst.execute();

            //Getting bill id
            ResultSet last_entry= pdst.getResultSet();
            last_entry.next();
            int last_entry_billId = last_entry.getInt(1);
            //System.out.println(last_entry_billId);
            b.setbId(last_entry_billId);

            //Storing list of bill items
            for(int i=0; i<b.getProId().size(); i++){
                String sq2 = "select * from products where pId = '"+b.getProId().get(i)+"';";
                Statement stmt2 = conn.DbConnection().createStatement();
                ResultSet rs2 = stmt2.executeQuery(sq2);

                 //Getting discount_rates
                 if(rs2.next()) {
                     float price = rs2.getInt("pPrice");
                     String category = rs2.getString("PCategory");
                     String sq3 = "SELECT discountTable.discountRate from discountTable inner join products" +
                             " on discountTable.categories = products.pCategory where products.pCategory " +
                             "= '" + category + "';";
                     Statement stmt3 = conn.DbConnection().createStatement();
                     ResultSet rs3 = stmt3.executeQuery(sq3);

                     //Computing bill details
                     if(rs3.next()) {
                         taxPrice = (price*b.getProTax().get(i))/100;
                         discountRate = rs3.getFloat("discountRate");
                         totalPrice = ((price+taxPrice) - (((price+taxPrice)*discountRate)/100)/b.getProQty().get(i))*b.getProQty().get(i);
                         //totalPrice = (price*b.getProQty().get(i)) - ((price*discountRate)/100*b.getProQty().get(i));
                     }
                     else{
                         discountRate = 0;
                         taxPrice = (price*b.getProTax().get(i))/100;
                         totalPrice = (taxPrice+price) * b.getProQty().get(i);
                         //totalPrice = price * b.getProQty().get(i);
                     }

                     String insertQuery = "insert into billProduct (bId, productId, discount, productQty, totalPrice, productTax)" +
                             "values(?,?,?,?,?,?);";
                     PreparedStatement pdst1 = newConn.prepareStatement(insertQuery);
                     pdst1.setInt(1, last_entry_billId);
                     pdst1.setString(2, b.getProId().get(i));
                     pdst1.setFloat(3, discountRate);
                     pdst1.setInt(4, b.getProQty().get(i));
                     pdst1.setFloat(5, totalPrice);
                     pdst1.setFloat(6, b.getProTax().get(i));
                     pdst1.executeUpdate();
                     pdst1.close();

                     //Updating quantity of the products
                     int existingQuantity = rs2.getInt("pQuantity");

                     String updateQuery = "UPDATE PRODUCTS SET pQuantity = ? - ? WHERE pId = ? ;";
                     PreparedStatement pdst2 = newConn.prepareStatement(updateQuery);
                     pdst2.setInt(1, existingQuantity);
                     pdst2.setInt(2, b.getProQty().get(i));
                     pdst2.setString(3, b.getProId().get(i));
                     pdst2.executeUpdate();
                     pdst2.close();
                     stmt3.close();
                 }
                 stmt2.close();
            }
            newConn.close();
            return b;
        }
        newConn.close();
        return null;
    }
}
