# Liskov Substitution Principle (LSP)

> **Definition**: "Subtypes must be substitutable for their base types without altering the correctness of the program."

In simpler terms: **A derived class should not break the assumptions made about the parent class.** If `class B` inherits from `class A`, we should be able to use `B` wherever `A` is expected, and the code should still work correctly.

## The Problem (Violation)
The classic **Square vs Rectangle** problem.

```java
class Rectangle {
    protected int width;
    protected int height;

    public void setWidth(int w) { this.width = w; }
    public void setHeight(int h) { this.height = h; }
    public int getArea() { return width * height; }
}

class Square extends Rectangle {
    // In a square, width = height.
    @Override
    public void setWidth(int w) {
        this.width = w;
        this.height = w; // Force height to match
    }

    @Override
    public void setHeight(int h) {
        this.height = h;
        this.width = h; // Force width to match
    }
}
```

### Breaking the Code
```java
public void testArea(Rectangle r) {
    r.setWidth(5);
    r.setHeight(4);
    // If r is a Rectangle, Area = 20.
    // If r is a Square, setHeight(4) also sets width to 4. Area = 16.
    assert(r.getArea() == 20); // FAILS for Square!
}
```
Here, `Square` is NOT a suitable substitute for `Rectangle`, because changing height unexpectedly changes width.

## The Solution
Don't use inheritance if the relationship isn't truly perfectly compliant. Use a common interface `Shape`.

```java
interface Shape {
    int getArea();
}

class Rectangle implements Shape {
    private int width, height;
    public Rectangle(int w, int h) { this.width = w; this.height = h; }
    public int getArea() { return width * height; }
}

class Square implements Shape {
    private int side;
    public Square(int side) { this.side = side; }
    public int getArea() { return side * side; }
}
```
Now, `Rectangle` and `Square` are siblings, not parent/child. You cannot set width/height on a generic `Shape`, preventing the bug.

## Key Checklist for LSP
1.  **No Thrown Exceptions**: Child method shouldn't throw exceptions that Parent doesn't.
2.  **No Weakening Pre-conditions**: Child shouldn't be stricter on inputs than Parent.
3.  **No Strengthening Post-conditions**: Child shouldn't promise less than Parent.
