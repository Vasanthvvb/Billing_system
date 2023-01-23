package Db_Connection;
import java.sql.*;

public class DbConn {

    private Connection conn;
    final String url = "jdbc:postgresql://localhost:5432/billing_system";
    final String user = "postgres";
    final String password = "dbadmin";

    public Connection DbConnection() {
        try {
            Class.forName("org.postgresql.Driver");
            this.conn = DriverManager.getConnection(url, user, password);
            return conn;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
