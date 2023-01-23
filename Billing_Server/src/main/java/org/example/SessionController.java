package org.example;

import Db_Connection.DbConn;
import java.sql.*;

public class SessionController {
    DbConn conn = new DbConn();
    public Session createSession(int id, String name) {
        Session sn = new Session();
        boolean flag = false;
        String sq = "select * from sessionTable where uId = " + id + ";";
        try {
            Connection newConn = conn.DbConnection();
            Statement stmt = newConn.createStatement();
            ResultSet rs = stmt.executeQuery(sq);
            if(rs.next()) {
                sn.setAdminId(rs.getInt("uId"));
                sn.setSessionId(rs.getInt("sessionId"));
                sn.setAdminName(rs.getString("uName"));
                flag = true;
            }
            stmt.close();
            newConn.close();
        }
        catch (Exception e) {
            e.printStackTrace();
        }

        if (!flag) {
            String sessionId = id+name;
            sn.setAdminId(id);
            sn.setAdminName(name);
            sn.setSessionId(sessionId.hashCode());
            String query = "insert into sessionTable (uId, uName, sessionId) values (?,?,?)";
            try {
                Connection newConn = conn.DbConnection();
                PreparedStatement pdst = newConn.prepareStatement(query);
                pdst.setInt(1, sn.getAdminId());
                pdst.setString(2, sn.getAdminName());
                pdst.setInt(3, sn.getSessionId());
                pdst.executeUpdate();
                pdst.close();
                newConn.close();
            }
            catch (Exception e) {
                e.printStackTrace();
            }
        }
        return sn;
    }

    public int deleteSession(int id){
        String query = "delete from sessionTable where sessionId = "+id+";";
        try{
            Connection newConn = conn.DbConnection();
            Statement stmt = newConn.createStatement();
            int rs = stmt.executeUpdate(query);
            if(rs == 1){
                conn.DbConnection().close();
                return 1;
            }
            stmt.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return 0;
    }
}
