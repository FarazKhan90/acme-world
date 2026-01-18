package com.acme.todo.entity;

/**
 * Enum representing the types of actions that can be recorded in the todo audit log.
 * Used for tracking the history of changes to todo items.
 */
public enum TodoAuditActionType {
    /**
     * A new todo was created
     */
    CREATED,

    /**
     * An existing todo was updated (title, description, priority, or due date changed)
     */
    UPDATED,

    /**
     * A todo was marked as completed
     */
    COMPLETED,

    /**
     * A todo was marked as incomplete (uncompleted)
     */
    UNCOMPLETED,

    /**
     * A todo was deleted (soft-deleted)
     */
    DELETED
}
