# Open/Closed Principle (OCP)

> **Definition**: "Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification."

This means you should be able to add new functionality without changing existing code. This prevents regression bugs in tested code.

## The Problem (Violation)
Imagine a `PaymentProcessor` using a switch statement.

```java
class PaymentProcessor {
    public void processPayment(String type, double amount) {
        if (type.equals("CreditCard")) {
            // logic for CC
            System.out.println("Processing Credit Card: " + amount);
        } else if (type.equals("PayPal")) {
            // logic for PayPal
            System.out.println("Processing PayPal: " + amount);
        }
    }
}
```

### Why is this bad?
- To add `Bitcoin`, you must modify the `processPayment` method.
- This creates a risk of breaking `CreditCard` or `PayPal` logic.

## The Solution
Use **Polymorphism** and **Interfaces**.

```java
// 1. Define an Interface (Abstraction)
interface PaymentMethod {
    void pay(double amount);
}

// 2. Implement Concrete Classes (Extension)
class CreditCardPayment implements PaymentMethod {
    public void pay(double amount) {
        System.out.println("Processing Credit Card: " + amount);
    }
}

class PayPalPayment implements PaymentMethod {
    public void pay(double amount) {
        System.out.println("Processing PayPal: " + amount);
    }
}

// 3. New Feature (Bitcoin) - No changes to existing classes!
class BitcoinPayment implements PaymentMethod {
    public void pay(double amount) {
        System.out.println("Processing Bitcoin: " + amount);
    }
}

// 4. The Processor (Closed for Modification)
class PaymentProcessor {
    public void processPayment(PaymentMethod method, double amount) {
        // This code NEVER needs to change, no matter how many payment types we add.
        method.pay(amount);
    }
}
```

## Real World Example: Strategy Pattern
The OCP is the heart of the **Strategy Design Pattern**. Whenever you see extensive `if-else` or `switch` blocks checking for types, consider refactoring using OCP.
