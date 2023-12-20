package com.example.restockbackend.allegro;

import lombok.Getter;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

@Getter
public class Offer {

    private final String id;

    private final String sellerLogin;

    private final boolean isSuperSeller;

    private final String name;

    private final String photoURL;

    private final double productPrice;

    private final double deliveryPrice;

    private final boolean isSmart;


    public Offer(Object offerJson) {
        JSONObject offerInfo = (JSONObject) offerJson;

        id = (String) offerInfo.get("id");

        JSONObject seller = (JSONObject) offerInfo.get("seller");
        sellerLogin = (String) seller.get("login");
        isSuperSeller = (boolean) seller.get("superSeller");

        name = (String) offerInfo.get("name");

        JSONArray images = (JSONArray) offerInfo.get("images");
        photoURL = (String) images.stream().map(url -> ((JSONObject) url).get("url")).findFirst().orElseGet(String::new);

        JSONObject sellingMode = (JSONObject) offerInfo.get("sellingMode");
        JSONObject price = (JSONObject) sellingMode.get("price");
        productPrice = Double.parseDouble((String) price.get("amount"));

        JSONObject delivery = (JSONObject) offerInfo.get("delivery");
        JSONObject lowestPrice = (JSONObject) delivery.get("lowestPrice");
        deliveryPrice =  Double.parseDouble((String) lowestPrice.get("amount"));

        isSmart = AllegroClient.getInstance().isSmartOffer() && productPrice >= 45.00;
    }

    public double getFinalPrice() {
        return isSmart ? productPrice : productPrice + deliveryPrice;
    }

}
