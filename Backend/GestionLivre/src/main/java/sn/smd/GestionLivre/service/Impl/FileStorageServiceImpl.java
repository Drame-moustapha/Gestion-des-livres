package sn.smd.GestionLivre.service.Impl;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import sn.smd.GestionLivre.service.FileStorageService;


import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileStorageServiceImpl implements FileStorageService {
   // @Value("${app.file.uploaddir}")
    @Value("${app.file.uploaddir}")
    private  String rootLocation;


    @Override
    public String storeFile(MultipartFile file) {
        try {
            System.out.println("root location "+rootLocation);
            Path dirPath = Paths.get(rootLocation);
            Files.createDirectories(dirPath);
            Path targetLocation = dirPath.resolve(file.getOriginalFilename());
            Files.copy(file.getInputStream(), targetLocation);
            System.out.println(file.getOriginalFilename());
            return targetLocation.toString();
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }

    @Override
    public Resource getFile(String fileName) throws IOException {
        System.out.println("root location " + rootLocation);
        Path filePath = Paths.get(rootLocation).resolve(fileName);
        File file = filePath.toFile();
        System.out.println("file path " + filePath);
        if (!file.exists()) {
            throw new IOException("File not found: " + fileName);
        }
        return new FileSystemResource(file);
    }

    @Override
    public String getBaseDirectory() {
        return rootLocation;
    }
}
