# Chapter 5: Advanced C++ OOP Concepts

## 5.1 Constructors
Special method invoked automatically at creation.
1.  **Default**: `Hero()`.
2.  **Parameterized**: `Hero(int health)`.
3.  **Copy Constructor**: `Hero(Hero& h)`.
    *   Must accept by reference (to avoid infinite recursion).

### 5.1.1 Shallow vs Deep Copy
*   **Shallow Copy**: Default. Copies values member-by-member.
    *   *Danger*: If member is a pointer `char *name`, both objects point to same array. Updating one affects other. Destructor crashes (Double Free).
*   **Deep Copy**: Allocate new memory for `name` and copy string content.
    *   Required when class handles dynamic memory.

---

## 5.2 Destructors
Cleans up resources. `~Hero()`.
*   No args, no return type.
*   **Virtual Destructor**:
    *   If you delete a Derived object via a Base pointer `Base *b = new Derived; delete b;`...
    *   The Derived destructor will NOT be called unless Base destructor is `virtual`.
    *   *Rule*: **Always make Base destructor virtual**.

---

## 5.3 Static Keyword
1.  **Static Data Member**:
    *   Shared by ALL objects of class.
    *   Stored in Global Data Segment, not inside object.
    *   Must be initialized outside class.
2.  **Static Function**:
    *   Can only access static members.
    *   No `this` pointer.
    *   Called via `Hero::random()`.

---

## 5.4 Friend Keyword
Breaks encapsulation (Use carefully).
1.  **Friend Function**: Non-member function given access to Private data.
2.  **Friend Class**: Class A allows Class B to access its privates.
