package org.example;

import Db_Connection.DbConn;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

public class AuthController {

    DbConn conn = new DbConn();
    public Session login(Admin a){
        String query = "Select * from admin where email='"+a.getUserName()+"';";
        try {
            Connection newConn = conn.DbConnection();
            Statement stmt = newConn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            while(rs.next()){
                if(a.getUserName().equals(rs.getString("email")) &&
                    a.getPassword().equals(rs.getString("password"))){
                    SessionController snCon = new SessionController();
                    return snCon.createSession(rs.getInt("id"), rs.getString("userName"));
                }
            }
            stmt.close();
            newConn.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
