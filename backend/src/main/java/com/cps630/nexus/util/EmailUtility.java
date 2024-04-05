package com.cps630.nexus.util;

import java.util.Properties;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

public class EmailUtility {
	EmailUtility() {}
	
	public static void sendEmail(String recipient, String title, String message) {
		JavaMailSender sender = buildMailSender();
		
		SimpleMailMessage mailMessage = new SimpleMailMessage();
		mailMessage.setFrom(ConstantUtil.APP_EMAIL);
		mailMessage.setTo(recipient);
		mailMessage.setSubject(title);
		mailMessage.setText(message);
		
		sender.send(mailMessage);
	}
	
	public static void sendEmail(String recipient, String replyTo, String title, String message) {
		JavaMailSender sender = buildMailSender();
		
		SimpleMailMessage mailMessage = new SimpleMailMessage();
		mailMessage.setFrom(ConstantUtil.APP_EMAIL);
		mailMessage.setReplyTo(replyTo);
		mailMessage.setTo(recipient);
		mailMessage.setSubject(title);
		mailMessage.setText(message);
		
		sender.send(mailMessage);
	}
	
	/**
	 * Set properties to connect to Gmail SMTP server
	 * @return
	 */
	private static JavaMailSender buildMailSender() {
		JavaMailSenderImpl sender = new JavaMailSenderImpl();
		sender.setHost("smtp.gmail.com");
		sender.setPort(587);
		sender.setUsername(ConstantUtil.APP_EMAIL);
		sender.setPassword("knar nqwz pwpm rclp");
		
		Properties props = new Properties();
		props.setProperty("mail.smtp.auth", "true");
		props.setProperty("mail.smtp.starttls.enable", "true");
		
		sender.setJavaMailProperties(props);
		
		return sender;
	}
}