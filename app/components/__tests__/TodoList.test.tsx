import React from "react";
import { render, screen } from "@testing-library/react";
import TodoList, { Todo } from "../TodoList";
import * as TodoItemModule from "../TodoItem"; // Importamos para hacer mock

describe("TodoList Component", () => {
  // Happy path tests
  it("renderiza un mensaje cuando no hay tareas", () => {
    // Prepare: Configuración con lista vacía
    const todos: Todo[] = [];
    const mockToggle = jest.fn();
    const mockDelete = jest.fn();

    // Execute: Renderizar el componente
    render(
      <TodoList
        todos={todos}
        onToggleTodo={mockToggle}
        onDeleteTodo={mockDelete}
      />
    );

    // Validate: Verificar que se muestra el mensaje de lista vacía
    expect(screen.getByTestId("empty-todos")).toBeInTheDocument();
    expect(screen.getByTestId("empty-todos")).toHaveTextContent(
      "No hay tareas pendientes"
    );
  });

  it("renderiza correctamente una lista de tareas", () => {
    // Prepare: Configuración con lista de tareas
    const todos: Todo[] = [
      { id: 1, text: "Tarea 1", completed: false },
      { id: 2, text: "Tarea 2", completed: true },
      { id: 3, text: "Tarea 3", completed: false },
    ];
    const mockToggle = jest.fn();
    const mockDelete = jest.fn();

    // Execute: Renderizar el componente
    render(
      <TodoList
        todos={todos}
        onToggleTodo={mockToggle}
        onDeleteTodo={mockDelete}
      />
    );

    // Validate: Verificar que se renderizan todas las tareas
    expect(screen.getByTestId("todo-list")).toBeInTheDocument();
    expect(screen.getByTestId("todo-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("todo-item-2")).toBeInTheDocument();
    expect(screen.getByTestId("todo-item-3")).toBeInTheDocument();
  });

  // EJERCICIO 3: Completa el siguiente test para verificar que el componente
  // maneja correctamente los eventos de toggle y delete para cada tarea
  it("pasa correctamente las funciones onToggle y onDelete a cada TodoItem", () => {
    // Prepare: mock de TodoItem
    const mockTodoItem = jest.fn(({ todo }) => <div>{todo.text}</div>);
    jest.spyOn(TodoItemModule, "default").mockImplementation(mockTodoItem);

    const todos: Todo[] = [
      { id: 1, text: "Primera tarea", completed: false },
      { id: 2, text: "Segunda tarea", completed: true },
    ];
    const mockToggle = jest.fn();
    const mockDelete = jest.fn();

    // Execute: Renderizamos TodoList con props
    render(
      <TodoList
        todos={todos}
        onToggleTodo={mockToggle}
        onDeleteTodo={mockDelete}
      />
    );

    // Validate: verificar que TodoItem se llamó con las props esperadas
    expect(mockTodoItem).toHaveBeenCalledTimes(2);
    expect(mockTodoItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        todo: todos[0],
        onToggle: mockToggle,
        onDelete: mockDelete,
      }),
      {}
    );
    expect(mockTodoItem).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        todo: todos[1],
        onToggle: mockToggle,
        onDelete: mockDelete,
      }),
      {}
    );
  });
});
