package com.acme.todo.dto.response;

import com.acme.todo.entity.TodoAuditLog;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO for returning audit log entries in API responses.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoAuditLogResponse {

    private Long id;
    private String actionType;
    private String snapshot;
    private LocalDateTime createdAt;
    private String createdBy;

    /**
     * Creates a response DTO from a TodoAuditLog entity.
     *
     * @param auditLog the audit log entity
     * @return a new TodoAuditLogResponse
     */
    public static TodoAuditLogResponse fromEntity(TodoAuditLog auditLog) {
        return TodoAuditLogResponse.builder()
                .id(auditLog.getId())
                .actionType(auditLog.getActionType() != null ? auditLog.getActionType().name() : null)
                .snapshot(auditLog.getSnapshot())
                .createdAt(auditLog.getCreatedAt())
                .createdBy(auditLog.getCreatedBy())
                .build();
    }
}
