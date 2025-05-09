package sn.smd.GestionLivre.service.envoi_email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


import java.io.IOException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@AllArgsConstructor
public class EnvoiEmailServiceImpl  implements EnvoiEmailService{
    @Autowired
    private final JavaMailSender emailSender;


    private final String emailMe = "newsletter@univ-zig.sn";
    
    @Override
    public void sendEmail(String to, String subject, String text) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        message.setFrom(emailMe);

        try {
            emailSender.send(message);
            System.out.println("Email sent successfully.");
        } catch (MailException e) {
            System.err.println("Failed to send email: " + e.getMessage());
            // Autres actions à entreprendre en cas d'échec de l'envoi d'e-mail
        }
    }

    @Override
    public void sendEmailWithAttachment(String to, String subject, String text, String filePath) throws MessagingException, IOException, MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text);
        helper.setFrom(emailMe,"sunu bibliothéque ");

        // Charger le document à partir du chemin du fichier
        Path path = Paths.get(filePath);
        byte[] documentBytes = Files.readAllBytes(path);

        // Ajouter le document en pièce jointe
        helper.addAttachment(path.getFileName().toString(), new ByteArrayResource(documentBytes));

        // Envoyer l'e-mail
        emailSender.send(message);
    }


}
