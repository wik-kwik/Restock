package com.example.restockbackend.allegro;

import lombok.Getter;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

@Getter
public class Offer {

    private final Long id;

    private final String sellerLogin;

    private final boolean isSuperSeller;

    private final String name;

    private final String photoURL;

    private final boolean isSmart;

    private final double productPrice;

    private final double deliveryPrice;


    public Offer(Object offerJson) {
        JSONObject offerInfo = (JSONObject) offerJson;

        id = Long.parseLong((String) offerInfo.get("id"));

        JSONObject seller = (JSONObject) offerInfo.get("seller");
        sellerLogin = (String) seller.get("login");
        isSuperSeller = (boolean) seller.get("superSeller");

        name = (String) offerInfo.get("name");

        JSONArray images = (JSONArray) offerInfo.get("images");
        photoURL = (String) images.stream().map(url -> ((JSONObject) url).get("url")).findFirst().orElseGet(String::new);

        isSmart = AllegroClient.getInstance().isSmartOffer();

        JSONObject sellingMode = (JSONObject) offerInfo.get("sellingMode");
        JSONObject price = (JSONObject) sellingMode.get("price");
        productPrice = Double.parseDouble((String) price.get("amount"));

        JSONObject delivery = (JSONObject) offerInfo.get("delivery");
        JSONObject lowestPrice = (JSONObject) delivery.get("lowestPrice");
        deliveryPrice =  Double.parseDouble((String) lowestPrice.get("amount"));
    }

    public double getFinalPrice() {
        if (isSmart && productPrice >= 45.00) {
            return productPrice;
        } else {
            return productPrice + deliveryPrice;
        }
    }

}
