# Interface Segregation Principle (ISP)

> **Definition**: "Clients should not be forced to depend upon interfaces that they do not use."

Basically: **Many specific interfaces are better than one general-purpose interface.** Avoid "Fat Interfaces" that force implementing classes to implement empty methods or throw "NotImplemented" exceptions.

## The Problem (Violation)
Imagine a `Worker` interface for a factory system.

```java
interface Worker {
    void work();
    void eat();
}

class Human implements Worker {
    public void work() { System.out.println("Working..."); }
    public void eat() { System.out.println("Eating lunch..."); }
}

class Robot implements Worker {
    public void work() { System.out.println("Working..."); }
    // Violation! Robots don't eat.
    public void eat() {
        throw new UnsupportedOperationException("Robots don't eat!");
    }
}
```
Here, `Robot` depends on `eat()`, which it doesn't need.

## The Solution
Segregate the interface into smaller roles.

```java
// 1. Split Interfaces
interface Workable {
    void work();
}

interface Feedable {
    void eat();
}

// 2. Implement only what is needed
class Human implements Workable, Feedable {
    public void work() { System.out.println("Working..."); }
    public void eat() { System.out.println("Eating..."); }
}

class Robot implements Workable {
    public void work() { System.out.println("Working..."); }
    // No eat method needed!
}
```

## Benefits
- **Decoupling**: Changes to `Feedable` don't affect `Robot` or the `Workable` interface.
- **Clarity**: The code clearly expresses capabilities (Traits).
