package com.devon.recruitmentmgmt.util;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class DateTimeUtil {

    public static LocalDateTime convertToLocalDateTime(Date date) {
        if (date == null) {
            return null;
        }
        return LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());
    }

    public static Date convertLocalDateToDate(LocalDateTime applicationDeadline) {
        if (applicationDeadline == null) {
            return null;
        }
        String dateString = applicationDeadline.format(DateTimeFormatter.ISO_LOCAL_DATE);

        Date date = java.sql.Date.valueOf(dateString);
        return date;
    }

}
