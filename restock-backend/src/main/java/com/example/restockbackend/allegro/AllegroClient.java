package com.example.restockbackend.allegro;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static com.example.restockbackend.dao.entity.ParameterEntity.ParameterType.*;
import static com.example.restockbackend.dao.entity.ParameterEntity.BooleanValue.*;
import static com.example.restockbackend.dao.entity.ParameterEntity.ShippingForm.*;

public class AllegroClient {

    private static AllegroClient INSTANCE;

    private static final Logger LOGGER = LoggerFactory.getLogger(AllegroClient.class);

    // credentials

    private static final String CLIENT_ID = "fd790efa765e4229b3d85eebd3b9927d";
    private static final String CLIENT_SECRET = "EE6YX6dQzIRqClW63sJh6Xf45CTIUKZQHA5joZYZmScfdNRHjDWPNBuGFufcd86G";

    // allegro API links

    private static final String AUTH_URL = "https://allegro.pl.allegrosandbox.pl/auth/oauth/token";
    private static final String OFFERS_URL = "https://api.allegro.pl.allegrosandbox.pl/offers/listing";

    // constant values

    private static final String EMPTY_STRING = "";

    private static final String SMART_OPTION = "SMART";

    private static final String SUPER_SELLER_OPTION = "SUPERSELLER";

    private static final String BRAND_ZONE_OPTION = "BRAND_ZONE";

    private static final String PARCEL_LOCKER_DELIVERY = "5b445fe6580ce26bb2f9960a";

    private static final String COURIER_DELIVERY = "5b445fa0580ce26bb2f99602";

    private static final String SORT_BY_PRICE_ASC = "+price";

    private static final String SORT_BY_PRICE_WITH_DELIVERY_ASC = "+withDeliveryPrice";

    private static final String LIMIT = "10";

    // variables used by algorithm

    private boolean smartOffer;

    private final HashMap<String, String> filters = new HashMap<>();


    // singleton methods

    private AllegroClient() {}

    public static AllegroClient getInstance() {
        if(INSTANCE == null) {
            INSTANCE = new AllegroClient();
        }
        return INSTANCE;
    }

    // public methods

    public void addFilter(String filter, String value) {
        filters.put(filter, value);
    }

    public boolean isSmartOffer() {
        return smartOffer;
    }

    public Offer getTheBestOffer(String product, String preferredBrand, String preferredAmount) throws IOException, ParseException {

        // first attempt - searching with filters
        List<Offer> offersWithFilters = getOffersList(getOffersJson(product, true, preferredBrand, preferredAmount));
        List<Offer> offers = new ArrayList<>(offersWithFilters);

        if (filters.getOrDefault(SMART, EMPTY_STRING).equals(TRUE)) {
            setSmartOffer();
            List<Offer> offersWithFiltersAndSmart = getOffersList(getOffersJson(product, true, preferredBrand, preferredAmount));
            offers.addAll(offersWithFiltersAndSmart);
            unsetSmartOffer();
        }

        if (!offers.isEmpty()) {
            return offers.stream().min(Comparator.comparing(Offer::getFinalPrice)).get();
        }

        // second attempt - searching without filters
        List<Offer> offersWithoutFilters = getOffersList(getOffersJson(product, false, preferredBrand, preferredAmount));
        offers.addAll(offersWithoutFilters);

        if (filters.getOrDefault(SMART, EMPTY_STRING).equals(TRUE)) {
            setSmartOffer();
            List<Offer> offersWithoutFiltersButWithSmart = getOffersList(getOffersJson(product, false, preferredBrand, preferredAmount));
            offers.addAll(offersWithoutFiltersButWithSmart);
            unsetSmartOffer();
        }

        // any offer don't match -> return null
        if (offers.isEmpty()) {
            return null;
        }

        // if offers not empty -> internal filtering
        List<Offer> offersBeforeFiltering = new ArrayList<>(offers);
        offers = offers.stream().filter(Offer::isSuperSeller).collect(Collectors.toList());

        if (offers.isEmpty()) {
            return offersBeforeFiltering.stream().min(Comparator.comparing(Offer::getFinalPrice)).get();
        } else {
            offersBeforeFiltering = offers;
        }

        offers = offers.stream().filter(o -> o.getName().toLowerCase().contains(preferredBrand.toLowerCase())).collect(Collectors.toList());

        if (offers.isEmpty()) {
            return offersBeforeFiltering.stream().min(Comparator.comparing(Offer::getFinalPrice)).get();
        } else {
            offersBeforeFiltering = offers;
        }

        offers = offers.stream().filter(o -> o.getName().toLowerCase().contains(preferredAmount.toLowerCase())).collect(Collectors.toList());

        if (offers.isEmpty()) {
            return offersBeforeFiltering.stream().min(Comparator.comparing(Offer::getFinalPrice)).get();
        } else {
            return offers.stream().min(Comparator.comparing(Offer::getFinalPrice)).get();
        }
    }

    // private methods

    private void setSmartOffer() {
        smartOffer = true;
    }

    private void unsetSmartOffer() {
        smartOffer = false;
    }

    private List<Offer> getOffersList(String offersResponseJson) throws ParseException {
        List<Offer> allegroOffers = new ArrayList<>();

        JSONObject response = (JSONObject) new JSONParser().parse(offersResponseJson);
        JSONObject items = (JSONObject) response.get("items");
        JSONArray promoted = (JSONArray) items.get("promoted");
        JSONArray regular = (JSONArray) items.get("regular");

        promoted.forEach(offer -> allegroOffers.add(new Offer(offer)));
        regular.forEach(offer -> allegroOffers.add(new Offer(offer)));

        return allegroOffers;
    }

    private String getOffersJson(String phrase, boolean includeFilters, String preferredBrand, String preferredAmount) throws IOException, ParseException {
        StringBuilder urlBuilder = new StringBuilder(OFFERS_URL);

        // add preferred brand and amount of product to phrase, if filters are included
        if (includeFilters) {
            if (preferredBrand != null) {
                phrase = phrase + " " + preferredBrand;
            }
            if (preferredAmount != null) {
                phrase = phrase + " " + preferredAmount;
            }
        }

        // set phrase of searching
        urlBuilder.append("?phrase=").append(urlEncode(phrase));

        // search only BUY_NOW type offers
        urlBuilder.append("&sellingMode.format=BUY_NOW");

        // search only offers with NEW products
        urlBuilder.append("&parameter.11323=11323_1");

        // search only offers with SMART option
        if (smartOffer) {
            urlBuilder.append("&option=").append(SMART_OPTION);
        }

        // search offers with defined filters
        if (includeFilters) {
            // search offers where seller is SUPER_SELLER
            if (filters.getOrDefault(SUPER_SELLER, EMPTY_STRING).equals(TRUE)) {
                urlBuilder.append("&option=").append(SUPER_SELLER_OPTION);
            }
            // search offers from BRAND ZONE
            if (filters.getOrDefault(BRAND_ZONE, EMPTY_STRING).equals(TRUE)) {
                urlBuilder.append("&option=").append(BRAND_ZONE_OPTION);
            }
            // search offers with preferred delivery option
            if (filters.getOrDefault(SHIPPING_FORM, EMPTY_STRING).equals(PACZKOMAT)) {
                urlBuilder.append("&deliveryMethod=").append(PARCEL_LOCKER_DELIVERY);
            } else if (filters.getOrDefault(SHIPPING_FORM, EMPTY_STRING).equals(KURIER)) {
                urlBuilder.append("&deliveryMethod=").append(COURIER_DELIVERY);
            } else {
                urlBuilder.append("&deliveryMethod=").append(PARCEL_LOCKER_DELIVERY);
                urlBuilder.append("&deliveryMethod=").append(COURIER_DELIVERY);
            }
        }

        // sorting variant
        if (smartOffer) {
            urlBuilder.append("&sort=").append(SORT_BY_PRICE_ASC);
        } else  {
            urlBuilder.append("&sort=").append(SORT_BY_PRICE_WITH_DELIVERY_ASC);
        }

        // limit number of returned offers to LIMIT value
        urlBuilder.append("&limit=").append(LIMIT);

        URL url = new URL(urlBuilder.toString());
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setDoOutput(true);
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Authorization", "Bearer " + getAccessToken());
        connection.setRequestProperty("Accept", "application/vnd.allegro.public.v1+json");

        int responseCode = connection.getResponseCode();

        if (responseCode == HttpURLConnection.HTTP_OK) {
            return getResponseAsJson(connection).toJSONString();
        } else {
            LOGGER.info("Failed during offers getting. Response code: " + responseCode);
            return EMPTY_STRING;
        }
    }

    private static String urlEncode(String value) {
        return URLEncoder.encode(value, StandardCharsets.UTF_8);
    }

    private String getAccessToken() throws IOException, ParseException {
        URL url = new URL(AUTH_URL + "?grant_type=client_credentials");
        String credentials = CLIENT_ID + ":" + CLIENT_SECRET;
        String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setDoOutput(true);
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Authorization", "Basic " + encodedCredentials);

        int responseCode = connection.getResponseCode();

        if (responseCode == HttpURLConnection.HTTP_OK) {
            JSONObject response = getResponseAsJson(connection);
            return (String) response.get("access_token");
        } else {
            LOGGER.info("Failed during access token getting. Response code: " + responseCode);
            return EMPTY_STRING;
        }
    }

    private JSONObject getResponseAsJson(HttpURLConnection connection) throws IOException, ParseException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader((connection.getInputStream())));
        StringBuilder response = new StringBuilder();
        String nextLine;
        while ((nextLine = bufferedReader.readLine()) != null) {
            response.append(nextLine);
        }
        bufferedReader.close();
        return (JSONObject) new JSONParser().parse(response.toString());
    }

}
