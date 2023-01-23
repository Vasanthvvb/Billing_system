package org.example;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Customer {
    private int id;
    private String name;
    private String number;

    public void setId(int id){ this.id = id; }
    public int getId(){ return id; }

    public void setName(String name){ this.name = name; }
    public String getName(){
        return name;
    }

    public void setNumber(String number){ this.number = number; }
    public String getNumber(){
        return number;
    }
//    @Override
//    public String toString(){
//        return "Customer [" + id + " " + name + " " + number +"]";
//    }
}

