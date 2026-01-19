# Chapter 4: Polymorphism

## 4.1 Concept
"Poly" (Many) + "Morphs" (Forms).
The ability of a message/object to be displayed in more than one form.

---

## 4.2 Compile-Time Polymorphism (Static Binding)
Decisions made by compiler. Fast.

### 4.2.1 Function Overloading
Same function name, different parameters.
*   `add(int a, int b)`
*   `add(double a, double b)`
*   `add(int a, int b, int c)`
*   *Note*: Only changing return type is NOT overloading.

### 4.2.2 Operator Overloading
Giving special meaning to existing operators for user-Defined types.
```cpp
// Allow adding two complex numbers using '+'
Complex operator+ (Complex const &obj) {
    Complex res;
    res.real = real + obj.real;
    res.imag = imag + obj.imag;
    return res;
}
```

---

## 4.3 Run-Time Polymorphism (Dynamic Binding)
Decisions made at runtime. Slower but flexible.

### 4.3.1 Method Overriding
Child class provides specific implementation of a function already defined in Parent.
*   Function name & Signature must be EXACTLY same.

### 4.3.2 Virtual Functions
To achieve runtime polymorphism, use `virtual` keyword in Base class.
```cpp
class Parent {
public:
    virtual void show() { cout << "Parent"; }
};

class Child : public Parent {
public:
    void show() { cout << "Child"; }
};

Parent *p = new Child();
p->show(); // Prints "Child" because of virtual
```
*   Without `virtual`, it would print "Parent" (Early Binding based on pointer type).

### 4.3.3 How it works: V-Table
1.  **V-Table (Virtual Table)**: A static array of function pointers created for every class having virtual functions.
2.  **VPTR (Virtual Pointer)**: A hidden pointer added to every **Object** of that class.
    *   Points to the V-Table of that class.
3.  **Mechanism**:
    *   `p->show()` implies "Go to address stored in VPTR, look up index of show(), call that function".
    *   Since `p` points to Child object, VPTR points to Child's V-Table.
