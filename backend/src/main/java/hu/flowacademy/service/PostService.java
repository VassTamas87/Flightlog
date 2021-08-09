package hu.flowacademy.service;

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

    public Post save(String comment, String userId) {
        User user = userRepository.findFirstById(userId);
        Post post = Post.builder().comment(comment).createdAt(LocalDateTime.now()).user(user).build();
        validate(post);
        return postRepository.save(post);
    }

    public Post update(String comment, String postId) {
        Post post = postRepository.findById(postId).orElseThrow();
        if (!postRepository.existsById(post.getId())) {
            throw new ValidateException("No post exists with the provided id!!!");
        }
        if (comment == null) {
            throw new ValidateException("Comment should be present!!!");
        }
        return postRepository.save(post.toBuilder().id(postId).updatedAt(LocalDateTime.now())
                .comment(comment).build());
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
