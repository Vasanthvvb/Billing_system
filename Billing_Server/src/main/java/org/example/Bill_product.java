package org.example;

public class Bill_product {

    private int billId;
    private String proId;
    private String name;
    private int quantity;
    private float tax;
    private float totalPrice;
    private float discount;

    public int getBillId() {
        return billId;
    }
    public void setBillId(int billId) {
        this.billId = billId;
    }

    public String getProId() {
        return proId;
    }
    public void setProId(String proId) {
        this.proId = proId;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public float getTax() {
        return tax;
    }
    public void setTax(float tax) {
        this.tax = tax;
    }

    public float getTotalPrice() {
        return totalPrice;
    }
    public void setTotalPrice(float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public float getDiscount() {
        return discount;
    }
    public void setDiscount(float discount) {
        this.discount = discount;
    }

}


