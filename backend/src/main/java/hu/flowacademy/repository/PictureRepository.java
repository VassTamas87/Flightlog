package hu.flowacademy.repository;

import hu.flowacademy.model.Picture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PictureRepository extends JpaRepository<Picture, String> {
    Picture findFirstByUserId(String userId);
}