package org.example;

import java.util.*;

public class Bill {
    private int bId;
    private int cId;
    private String name;
    private String number;
    private float total;
    private float balance;
    private String date;
    private int userId;
    private ArrayList<String> proId;
    private ArrayList<Integer> proQty;
    private ArrayList<Float> proTax;


    public int getbId() {
        return bId;
    }
    public void setbId(int bId) {
        this.bId = bId;
    }

    public int getcId() {
        return cId;
    }
    public void setcId(int cId) {
        this.cId = cId;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getNumber() {
        return number;
    }
    public void setNumber(String number) {
        this.number = number;
    }

    public float getTotal() {
        return total;
    }
    public void setTotal(float total) {
        this.total = total;
    }

    public float getBalance() {
        return balance;
    }
    public void setBalance(float balance) {
        this.balance = balance;
    }

    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }

    public int getUserId() {
        return userId;
    }
    public void setUserId(int userId) {
        this.userId = userId;
    }

    public ArrayList<String> getProId() {
        return proId;
    }
    public void setProId(ArrayList<String> proId) {
        this.proId = proId;
    }

    public ArrayList<Integer> getProQty() {
        return proQty;
    }
    public void setProQty(ArrayList<Integer> proQty) {
        this.proQty = proQty;
    }

    public ArrayList<Float> getProTax() {
        return proTax;
    }
    public void setProTax(ArrayList<Float> proTax) {
        this.proTax = proTax;
    }

}
