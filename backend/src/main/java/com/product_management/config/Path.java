package com.product_management.config;

public final class Path {
    private Path() {}

    public static final String AUTH = "/auth";
    public static final String LOGIN = "/login";
    public static final String AUTH_LOGIN = AUTH + LOGIN;

    public static final String USERS = "/users";
    public static final String PRODUCTS = "/products";
    public static final String ORDERS = "/orders";
}
