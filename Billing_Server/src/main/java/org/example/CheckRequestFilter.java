package org.example;

import Db_Connection.DbConn;
import java.io.IOException;
import javax.ws.rs.container.*;
import javax.ws.rs.core.*;
import javax.ws.rs.ext.Provider;
import java.sql.*;

@Provider
//@AnnotationForResourceOne
@PreMatching
public class CheckRequestFilter implements ContainerRequestFilter{
    @Override
    public void filter(ContainerRequestContext crc) throws IOException {

        DbConn conn = new DbConn();
        UriInfo uriInfo = crc.getUriInfo();
        if(uriInfo.getPath().equals("root/login_")) {
            System.out.println("login filter");
        }
        else {
            String auth = crc.getHeaders().get("authToken").toString();
            //System.out.println(auth.getClass().getSimpleName());
            auth = auth.replaceAll("[\\[\\]]", "");
            try {
                Connection newCon = conn.DbConnection();
                String query = "select * from sessionTable where sessionId='" + auth + "'";
                PreparedStatement pst = newCon.prepareStatement(query);
                ResultSet rs = pst.executeQuery();
                if (!rs.next()) {
                    crc.abortWith(Response.status(Response.Status.BAD_REQUEST)
                            .entity("Token is not valid please login again")
                            .build());
                }
                newCon.close();
            }
            catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}