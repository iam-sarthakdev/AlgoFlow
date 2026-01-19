# 1. Introduction to Low Level Design (LLD)

Low Level Design (LLD), also known as Object-Oriented Design (OOD) in the context of interviews, is the phase where you convert High-Level Design (HLD) components into detailed class diagrams, database schemas, and method signatures. It focuses on the internal structure of components, ensuring they are modular, maintainable, and extensible.

## why is LLD Important?
- **Maintainability**: Good LLD makes code easy to understand and modify.
- **Extensibility**: It allows adding new features with minimal changes to existing code.
- **Testability**: Well-designed classes are easier to unit test.
- **Interview Relevance**: In Machine Coding rounds (Flipkart, Uber, Swiggy, etc.), you are expected to produce working, modular code within 90-120 minutes.

---

# 2. Key Concepts in LLD

Before diving into patterns, you must master the building blocks:

### 2.1 Object-Oriented Programming (OOP)
- **Classes & Objects**: Blueprints and instances.
- **Encapsulation**: Hiding internal state.
- **Inheritance**: `is-a` relationship.
- **Polymorphism**: `behaves-like` or overriding behavior.
- **Abstraction**: Hiding complexity.

### 2.2 Relationships
1.  **Association**: "Uses a". Object A uses Object B.
    -   *Example*: A `Teacher` teaches a `Student`.
2.  **Aggregation**: "Has a" (Weak). Child can exist without Parent.
    -   *Example*: `Library` has `Books`. If Library is destroyed, Books still exist.
3.  **Composition**: "Part of" (Strong). Child cannot exist without Parent.
    -   *Example*: `House` has `Rooms`. If House is destroyed, Rooms are gone.
4.  **Inheritance**: "Is a".
    -   *Example*: `Car` is a `Vehicle`.

---
## 3. The Interview Framework
When asked to design a system (e.g., "Design a Parking Lot"), follow this structure:
1.  **Requirement Gathering**: Clarify ambiguity (What types of vehicles? Pricing model?).
2.  **Use Case Diagram**: Identify actors and actions.
3.  **Class Diagram**: Identify core classes and their relationships.
4.  **Schema Design**: Database tables (if applicable).
5.  **Code**: Write skeleton code with Interfaces and Models.

> [!TIP]
> Always start with Interfaces! Program to an interface, not an implementation.

