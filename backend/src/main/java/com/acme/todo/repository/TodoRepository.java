package com.acme.todo.repository;

import com.acme.todo.entity.Todo;
import com.acme.todo.entity.Todo.Priority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findByUserIdAndDeletedAtIsNullOrderByCreatedAtDesc(Long userId);

    List<Todo> findByUserIdAndCompletedAndDeletedAtIsNullOrderByCreatedAtDesc(Long userId, Boolean completed);

    List<Todo> findByUserIdAndPriorityAndDeletedAtIsNullOrderByCreatedAtDesc(Long userId, Priority priority);

    List<Todo> findByUserIdAndCompletedAndPriorityAndDeletedAtIsNullOrderByCreatedAtDesc(
            Long userId, Boolean completed, Priority priority);

    Optional<Todo> findByIdAndUserIdAndDeletedAtIsNull(Long id, Long userId);

    /**
     * Find a todo by ID and user ID, including soft-deleted todos.
     * Used for retrieving history of deleted todos.
     */
    Optional<Todo> findByIdAndUserId(Long id, Long userId);

    void deleteByIdAndUserId(Long id, Long userId);
}
