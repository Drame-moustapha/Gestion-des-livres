package sn.smd.GestionLivre.service.envoi_email;

import jakarta.mail.MessagingException;


import java.io.IOException;
import java.io.UnsupportedEncodingException;

public interface EnvoiEmailService {

    public void sendEmail(String to, String subject, String text);

    public void sendEmailWithAttachment(String to, String subject, String text, String filePath) throws MessagingException, IOException;
 }
