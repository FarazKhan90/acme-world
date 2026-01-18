package com.acme.todo.repository;

import com.acme.todo.entity.TodoAuditLog;
import com.acme.todo.entity.TodoAuditActionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for managing TodoAuditLog entities.
 * Provides read-only access patterns for audit trail queries.
 */
@Repository
public interface TodoAuditLogRepository extends JpaRepository<TodoAuditLog, Long> {

    /**
     * Find all audit log entries for a specific todo, ordered by most recent first.
     *
     * @param todoId the ID of the todo
     * @return list of audit log entries in reverse chronological order
     */
    List<TodoAuditLog> findByTodoIdOrderByCreatedAtDesc(Long todoId);

    /**
     * Find all audit log entries for a specific todo and user, ordered by most recent first.
     * Used to ensure users can only access audit logs for their own todos.
     *
     * @param todoId the ID of the todo
     * @param userId the ID of the user
     * @return list of audit log entries in reverse chronological order
     */
    List<TodoAuditLog> findByTodoIdAndUserIdOrderByCreatedAtDesc(Long todoId, Long userId);

    /**
     * Find all audit log entries for a specific user, ordered by most recent first.
     *
     * @param userId the ID of the user
     * @return list of audit log entries in reverse chronological order
     */
    List<TodoAuditLog> findByUserIdOrderByCreatedAtDesc(Long userId);

    /**
     * Find all audit log entries of a specific action type for a todo.
     *
     * @param todoId the ID of the todo
     * @param actionType the type of action to filter by
     * @return list of audit log entries matching the criteria
     */
    List<TodoAuditLog> findByTodoIdAndActionTypeOrderByCreatedAtDesc(Long todoId, TodoAuditActionType actionType);
}
