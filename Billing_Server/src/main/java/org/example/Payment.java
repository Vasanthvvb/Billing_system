package org.example;

public class Payment {
    private int payId;
    private int billId;
    private String date;
    private float amount;
    private int userId;

    public int getPayId() {
        return payId;
    }
    public void setPayId(int payId) {
        this.payId = payId;
    }

    public int getBillId() {
        return billId;
    }
    public void setBillId(int billId) {
        this.billId = billId;
    }

    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }

    public float getAmount() {
        return amount;
    }
    public void setAmount(float amount) {
        this.amount = amount;
    }

    public int getUserId() {
        return userId;
    }
    public void setUserId(int userId) {
        this.userId = userId;
    }
}
