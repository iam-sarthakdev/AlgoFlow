# Dependency Inversion Principle (DIP)

> **Definition**: "High-level modules should not depend on low-level modules. Both should depend on abstractions." AND "Abstractions should not depend on details. Details should depend on abstractions."

This is simply **Dependent on Interfaces, not Classes**. It allows you to swap out low-level implementations (like database drivers, notification services) without changing the high-level business logic.

## The Problem (Violation)
A `MacBook` class tightly coupled to a specific keyboard.

```java
class WiredKeyboard { }
class BluetoothKeyboard { }

class MacBook {
    private WiredKeyboard keyboard;

    public MacBook() {
        // Tightly coupled! We cannot use a BluetoothKeyboard without changing code.
        this.keyboard = new WiredKeyboard();
    }
}
```

## The Solution
Invert the dependency. `MacBook` shouldn't care *which* keyboard it has, only that it *has* a keyboard.

```java
// 1. Abstraction
interface Keyboard { }

// 2. Details
class WiredKeyboard implements Keyboard { }
class BluetoothKeyboard implements Keyboard { }

// 3. High-Level Module
class MacBook {
    private Keyboard keyboard;

    // Dependency Injection (Constructor Injection)
    public MacBook(Keyboard keyboard) {
        this.keyboard = keyboard;
    }
}

// Usage
Keyboard wired = new WiredKeyboard();
MacBook mac1 = new MacBook(wired); // Works

Keyboard bluetooth = new BluetoothKeyboard();
MacBook mac2 = new MacBook(bluetooth); // Also works!
```

## Key Terminologies
- **Inversion of Control (IoC)**: The principle where the control of object creation is "inverted" (given to a framework or caller) rather than the object itself managing it.
- **Dependency Injection (DI)**: A pattern to implement IoC (like passing the keyboard in the constructor).
