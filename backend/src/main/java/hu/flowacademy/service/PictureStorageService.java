package hu.flowacademy.service;

import java.io.IOException;

import java.util.Objects;

import hu.flowacademy.model.Picture;
import hu.flowacademy.model.User;
import hu.flowacademy.repository.PictureRepository;
import hu.flowacademy.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;

@Transactional
@Service
@Slf4j
public class PictureStorageService {

    @Autowired
    private PictureRepository pictureRepository;

    @Autowired
    private UserRepository userRepository;

    public Picture store(MultipartFile file, String userId) throws IOException {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        User user = userRepository.findFirstById(userId);
        Picture picture = new Picture(fileName, file.getContentType(), file.getBytes(), user);
        log.info("Picture has been saved with the name: {}", picture.getName());
        delete(userId);
        return pictureRepository.save(picture);
    }

    public Picture getPicture(String userId) {
        return pictureRepository.findFirstByUserId(userId);
    }

    public void delete(String userId) {
        pictureRepository.deleteAllByUserId(userId);
    }
}