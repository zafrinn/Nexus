package com.cps630.nexus.projection;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface AdvertisementProjection {
	public Integer getAdvertisementId();
	public String getDisplayName();
	public String getTitle();
	public String getDescription();
	public LocalDateTime getCreatedTimestamp();
	public BigDecimal getPrice();
	public String getLocation();
	public Boolean getEnabled();
}