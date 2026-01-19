# Chapter 6: SOLID Principles and Design Patterns

## 6.1 SOLID Principles
Essential for scalable software design.

1.  **Single Responsibility Principle (SRP)**: A class should have one, and only one, reason to change.
2.  **Open/Closed Principle (OCP)**: Open for extension, but Closed for modification. (Use Inheritance/Interfaces instead of modifying existing code).
3.  **Liskov Substitution Principle (LSP)**: Objects of a superclass should be replaceable with objects of subclass without breaking the app. (If Ostrich extends Bird, but Bird has `fly()`, that's a violation).
4.  **Interface Segregation Principle (ISP)**: Clients should not be forced to depend on interfaces they do not use. Split large interfaces.
5.  **Dependency Inversion Principle (DIP)**: Depend on abstractions, not concretions.

---

## 6.2 Design Patterns (Overview)
Reusable solutions to common problems.

### 6.2.1 Creational Patterns
*   **Singleton**: Ensure a class has only one instance (Database Connection).
    *   *Implementation*: Private constructor, Static instance.
*   **Factory**: Define interface for creating object, let subclasses decide which class to instantiate.

### 6.2.2 Structural Patterns
*   **Adapter**: Convert interface of a class into another interface client expects. (Wrapper).

### 6.2.3 Behavioral Patterns
*   **Observer**: One-to-many dependency. When one object changes state, all dependents are notified. (Event Listeners).
*   **Strategy**: Define family of algorithms, encapsulate each, and make them interchangeable.
