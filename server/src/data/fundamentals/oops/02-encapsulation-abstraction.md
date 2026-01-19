# Chapter 2: Encapsulation and Abstraction

## 2.1 Encapsulation
Wrapping up data (variables) and information (methods) into a single unit (Class).
**"Data Hiding"**.

### 2.1.1 Access Modifiers
Define the scope/visibility of class members.
1.  **Public**: Accessible from anywhere (inside and outside class).
2.  **Private**: Accessible ONLY inside the class. (Default in C++).
    *   Accessed via Getters/Setters.
    *   *Why?* Control. We can add validation logic in Setter.
3.  **Protected**: Accessible inside class and **Derived classes**.

### 2.1.2 Benefits
*   **Security**: Hides implementation details.
*   **Flexibility**: Implementation can change (read-only, write-only) without affecting users.

---

## 2.2 Abstraction
Hiding the complexity and showing only the essentials.
*   *Example*: Car. You know steering/accelerator (Interface), you don't know fuel injection details (Implementation).

### 2.2.1 Abstract Class
A class that **cannot be instantiated**. Used as a base class.
*   Contains at least one **Pure Virtual Function**:
    ```cpp
    virtual void draw() = 0; // " = 0" makes it pure
    ```
*   Derived classes MUST enforce implementation of the pure virtual function, otherwise they also become abstract.

### 2.2.2 Interface (Java style)
In C++, an abstract class with ONLY pure virtual functions acts as an Interface.
It defines a **contract**.
