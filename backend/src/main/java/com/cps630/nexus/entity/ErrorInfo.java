package com.cps630.nexus.entity;

public class ErrorInfo {
	private String message;
	private String detail;
	
	public ErrorInfo() {}
	
	public ErrorInfo(String message) {
		this.message = message;
	}
	
	public ErrorInfo(String message, String detail) {
		this.message = message;
		this.detail = detail;
	}
	
	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	public String getDetail() {
		return detail;
	}
	
	public void setDetail(String detail) {
		this.detail = detail;
	}

	@Override
	public String toString() {
		return "Error [message=" + message + ", detail=" + detail + "]";
	}
}