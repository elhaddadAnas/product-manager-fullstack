package com.product_management.exceptions;

public class ProductDeletionException extends RuntimeException {
    public ProductDeletionException(String message) {
        super(message);
    }
}
