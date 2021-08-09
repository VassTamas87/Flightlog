package hu.flowacademy.controller;

import hu.flowacademy.dto.PostDto;
import hu.flowacademy.dto.PostSaveDto;
import hu.flowacademy.model.Post;
import hu.flowacademy.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    @GetMapping("")
    public List<PostDto> listAll() {
        return postService.listAll().stream().map(PostDto::toDto).collect(Collectors.toList());
    }

    @PostMapping("/{userId}")
    @ResponseStatus(HttpStatus.CREATED)
    public Post save(@RequestBody PostSaveDto postSaveDto, @PathVariable String userId) {
        log.info("Post created at the user with the id: {}", userId);
        return postService.save(postSaveDto, userId);
    }

    @PutMapping("/{postId}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Post update(@RequestBody PostSaveDto postSaveDto, @PathVariable String postId) {
        log.info("Post updated with the id: {}", postId);
        return postService.update(postSaveDto, postId);
    }

    @DeleteMapping("/{postId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> delete(@PathVariable String postId) {
        postService.delete(postId);
        log.info("Post deleted with the id: {}", postId);
        return ResponseEntity.accepted().build();
    }
}

