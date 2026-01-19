# Chapter 1: Introduction to OOP & Classes

## 1.1 Paradigm Shift
*   **Procedural Programming (C)**:
    *   Focus on functions (procedures).
    *   Data moves openly around the system.
    *   Top-down approach.
    *   Difficult to maintain/scale.
*   **Object-Oriented Programming (C++, Java)**:
    *   Focus on **Objects**.
    *   Data is protected (Encapsulation).
    *   Bottom-up approach.
    *   Models real-world entities.

---

## 1.2 Class and Object
*   **Class**: A user-defined data type. It is a blueprint/template.
    *   Does NOT occupy memory (conceptually).
*   **Object**: An instance of a class.
    *   Occupies memory.

### 1.2.1 Anatomy of a C++ Class
```cpp
class Hero {
    // Properties (Data Members)
    int health;
    char level;

public:
    // Methods (Member Functions)
    void print() {
        cout << level << endl;
    }
};
```

### 1.2.2 Memory Allocation
*   **Static Allocation (Stack)**:
    ```cpp
    Hero h1;
    ```
    *   Fast.
    *   Automatically destroyed when out of scope.
*   **Dynamic Allocation (Heap)**:
    ```cpp
    Hero *h2 = new Hero();
    ```
    *   Flexible size/lifetime.
    *   Must be manually destroyed using `delete h2`.

### 1.2.3 Empty Class Size
Why is `sizeof(EmptyClass)` 1 byte and not 0?
To ensure that two different objects of the same class have different addresses.

---

## 1.3 The `this` Pointer
*   A special pointer available inside non-static member functions.
*   Points to the object invoking the function.
*   Type: `Hero * const this` (Constant pointer).
```cpp
void setHealth(int health) {
    this->health = health; // Resolves naming conflict
}
```

---

## 1.4 Padding and Alignment (Advanced)
Processors read memory in words (e.g., 4 bytes).
To minimize CPU cycles, data is aligned naturally.
*   structure: `char (1) + int (4)`.
*   Naive size: 5 bytes.
*   Actual size: 8 bytes. (3 bytes padding added after char so int starts at multiple of 4).
