# Chapter 3: Inheritance

## 3.1 Concept
 The capability of a class to derive properties and characteristics from another class.
*   **Base Class** (Parent/Super).
*   **Derived Class** (Child/Sub).

### 3.1.1 Syntax and Modes
```cpp
class Child : public Parent { ... };
```
**Access Specifier Mapping**:
*   **Public Mode**:
    *   Parent Public -> Child Public.
    *   Parent Protected -> Child Protected.
    *   Parent Private -> Not Accessible.
*   **Protected Mode**: Public/Protected -> Protected.
*   **Private Mode**: Public/Protected -> Private.

---

## 3.2 Types of Inheritance
1.  **Single**: A -> B.
2.  **Multilevel**: A -> B -> C.
3.  **Hierarchical**: One Parent, Multiple Children. (A -> B, A -> C).
4.  **Multiple** (C++ Feature): One Child, Multiple Parents. (A -> C, B -> C).
5.  **Hybrid**: Combination (e.g., Diamond).

---

## 3.3 Issues in Inheritance

### 3.3.1 Inheritance Ambiguity
If Class A and Class B both have `func()`, and Class C inherits both.
`obj.func()` is ambiguous.
*   *Fix*: Scope Resolution `obj.A::func()`.

### 3.3.2 The Diamond Problem
*   Class A (Grandparent).
*   Class B inherits A. Class C inherits A.
*   Class D inherits B and C.
*   **Issue**: D contains **Two Copies** of A. Compilcation error or wasted memory.
*   **Solution**: **Virtual Inheritance**.
    ```cpp
    class B : virtual public A { ... };
    class C : virtual public A { ... };
    ```
    Ensures A is constructed only once.
