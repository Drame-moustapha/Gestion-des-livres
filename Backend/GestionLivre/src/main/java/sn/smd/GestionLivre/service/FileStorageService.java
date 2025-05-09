package sn.smd.GestionLivre.service;


import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileStorageService {
    String storeFile(MultipartFile file);
    Resource getFile(String fileName) throws IOException;
    String getBaseDirectory();
}
