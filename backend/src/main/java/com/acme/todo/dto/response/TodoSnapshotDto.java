package com.acme.todo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * DTO representing a snapshot of a todo's state at a specific point in time.
 * Used for JSONB serialization in audit log entries.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoSnapshotDto {

    private Long id;
    private String title;
    private String description;
    private Boolean completed;
    private String priority;
    private LocalDate dueDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;

    /**
     * Creates a snapshot DTO from a Todo entity.
     *
     * @param todo the todo entity to snapshot
     * @return a new TodoSnapshotDto containing the todo's current state
     */
    public static TodoSnapshotDto fromEntity(com.acme.todo.entity.Todo todo) {
        return TodoSnapshotDto.builder()
                .id(todo.getId())
                .title(todo.getTitle())
                .description(todo.getDescription())
                .completed(todo.getCompleted())
                .priority(todo.getPriority() != null ? todo.getPriority().name() : null)
                .dueDate(todo.getDueDate())
                .createdAt(todo.getCreatedAt())
                .updatedAt(todo.getUpdatedAt())
                .deletedAt(todo.getDeletedAt())
                .build();
    }
}
