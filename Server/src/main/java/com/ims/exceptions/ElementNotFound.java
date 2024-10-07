package com.ims.exceptions;

public class ElementNotFound extends RuntimeException{
	private String message;

    public ElementNotFound() {}

    public ElementNotFound(String msg) {
        super(msg);
        this.message = msg;
    }

}
