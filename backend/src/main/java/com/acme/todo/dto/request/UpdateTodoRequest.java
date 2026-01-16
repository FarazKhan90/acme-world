package com.acme.todo.dto.request;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateTodoRequest {

    @Size(max = 200, message = "Title must be at most 200 characters")
    private String title;

    private String description;

    private Boolean completed;

    private String priority;

    private LocalDate dueDate;
}
