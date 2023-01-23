package org.example;

public class Product {
    private String id;
    private String name;
    private int quantity;
    private float price;
    private float tax;
    private String category;
    private int createdUser;
    private int modifiedUser;

    public void setId(String id){ this.id = id; }
    public String getId(){ return id; }

    public void setName(String name){ this.name = name; }
    public String getName(){ return name; }

    public void setQuantity(int quantity){ this.quantity = quantity; }
    public int getQuantity(){ return quantity; }

    public void setPrice(float price){ this.price = price; }
    public float getPrice(){ return price; }

    public float getTax() {
        return tax;
    }
    public void setTax(float tax) {
        this.tax = tax;
    }

    public void setCategory(String category){ this.category = category; }
    public String getCategory(){ return category; }

    public int getCreatedUser() {
        return createdUser;
    }
    public void setCreatedUser(int createdUser) {
        this.createdUser = createdUser;
    }

    public int getModifiedUser() {
        return modifiedUser;
    }
    public void setModifiedUser(int modifiedUser) {
        this.modifiedUser = modifiedUser;
    }
}
