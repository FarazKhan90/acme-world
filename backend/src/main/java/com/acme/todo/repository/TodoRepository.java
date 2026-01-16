package com.acme.todo.repository;

import com.acme.todo.entity.Todo;
import com.acme.todo.entity.Todo.Priority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<Todo> findByUserIdAndCompletedOrderByCreatedAtDesc(Long userId, Boolean completed);

    List<Todo> findByUserIdAndPriorityOrderByCreatedAtDesc(Long userId, Priority priority);

    List<Todo> findByUserIdAndCompletedAndPriorityOrderByCreatedAtDesc(
            Long userId, Boolean completed, Priority priority);

    Optional<Todo> findByIdAndUserId(Long id, Long userId);

    void deleteByIdAndUserId(Long id, Long userId);
}
