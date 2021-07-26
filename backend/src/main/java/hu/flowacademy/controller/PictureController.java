package hu.flowacademy.controller;

import hu.flowacademy.model.Picture;
import hu.flowacademy.service.PictureStorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
public class PictureController {

    @Autowired
    private PictureStorageService pictureStorageService;

    @PostMapping("/upload/{userId}")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file, @PathVariable String userId) {
        try {
            pictureStorageService.store(file, userId);
        } catch (Exception e) {
            log.error("Problem while uploading file {} : {} ", file.getOriginalFilename(), e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }
        return ResponseEntity.ok("Successful file upload.");
    }

    @GetMapping("/picture/{userId}")
    public ResponseEntity<Resource> getPicture(@PathVariable String userId) {
        Picture picture = pictureStorageService.getPicture(userId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(picture.getType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + picture.getName() + "\"")
                .body(new ByteArrayResource(picture.getData()));
    }

    @DeleteMapping("/picture/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> delete(@PathVariable String userId) {
        pictureStorageService.delete(userId);
        return ResponseEntity.accepted().build();
    }
}