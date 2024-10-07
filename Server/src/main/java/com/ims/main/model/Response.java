package com.ims.main.model;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Response {
	
	private String message;
	private boolean error;
	private Object data;
	
//	public Response = new Response(); 
}
