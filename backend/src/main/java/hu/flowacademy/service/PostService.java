package hu.flowacademy.service;

import hu.flowacademy.dto.PostSaveDto;
import hu.flowacademy.exception.ValidateException;
import hu.flowacademy.model.Post;
import hu.flowacademy.model.User;
import hu.flowacademy.repository.PostRepository;
import hu.flowacademy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public List<Post> listAll() {
        return postRepository.findAll();
    }

    public Post save(PostSaveDto postSaveDto, String userId) {
        User user = userRepository.findFirstById(userId);
        Post post = Post.builder().comment(postSaveDto.getComment()).createdAt(LocalDateTime.now()).user(user).build();
        validate(post);
        return postRepository.save(post);
    }

    public Post update(PostSaveDto postSaveDto, String postId) {
        Post post = postRepository.findById(postId).orElseThrow();
        if (!postRepository.existsById(post.getId())) {
            throw new ValidateException("No post exists with the provided id!!!");
        }
        if (!StringUtils.hasText(postSaveDto.getComment())) {
            throw new ValidateException("Comment should be present!!!");
        }
        return postRepository.save(post.toBuilder().id(postId).updatedAt(LocalDateTime.now())
                .comment(postSaveDto.getComment()).build());
    }

    public void delete(String postId) {
        postRepository.deleteById(postId);
    }

    void validate(Post post) {
        if (!StringUtils.hasText(post.getComment())) {
            throw new ValidateException("Comment should be present!!!");
        }
    }
}
