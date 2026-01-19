# Low Level Design (LLD) - The Master Guide

## 1. What is LLD?
Low Level Design (LLD) is the phase where High Level Design (HLD) is broken down into detailed diagrams and code structures. It deals with Class Diagrams, Database Schema, API Contracts, and Algorithms.

**Goal**: Modular, Extensible, Maintainable Code.

---

## 2. SOLID Principles
The foundation of good object-oriented design.

### 2.1 Single Responsibility Principle (SRP)
*"A class should have only one reason to change."*
*   **Violation**: A `Book` class that prints itself. If printing format changes, `Book` changes. If content logic changes, `Book` changes.
*   **Fix**: `Book` stores data. `BookPrinter` handles printing.

### 2.2 Open/Closed Principle (OCP)
*"Open for Extension, Closed for Modification."*
*   **Violation**: A `Calculator` class with a switch case for `add`, `sub`. To add `multiply`, you edit the class.
*   **Fix**: Use an interface `Operation` with `execute()`. New classes `AddOperation`, `MultiplyOperation`.

### 2.3 Liskov Substitution Principle (LSP)
*"Objects of a superclass should be replaceable with objects of a subclass without affecting correctness."*
*   **Violation**: `Square` extends `Rectangle`. Setting `width` of Square changes `height`. Breaks Rectangle behavior expectation.
*   **Fix**: Don't inherit. Use a common `Shape` interface.

### 2.4 Interface Segregation Principle (ISP)
*"Clients should not be forced to depend upon interfaces that they do not use."*
*   **Violation**: `Worker` interface has `eat()` and `work()`. Reader inherits `Worker` but robots don't `eat()`.
*   **Fix**: Split into `Workable` and `Feedable`.

### 2.5 Dependency Inversion Principle (DIP)
*"Depend on abstractions, not concretions."*
*   **Violation**: `MacBook` class creates a `WiredKeyboard` inside constructor. Tightly coupled.
*   **Fix**: `MacBook` takes `Keyboard` interface in constructor. Can pass `WiredKeyboard` or `BluetoothKeyboard`.

---

## 3. Design Patterns
General reusable solutions to commonly occurring problems.

### 3.1 Creational Patterns (Object Creation)
1.  **Singleton**: Ensure a class has only one instance (e.g., Database Connection, Logger).
    *   *Implementation*: Private constructor, Static instance, Public static getter.
2.  **Factory**: Create objects without specifying exact class. (e.g., `ShapeFactory` returns `Circle`, `Square`).
3.  **Builder**: Construct complex objects step-by-step. (e.g., `PizzaBuilder` -> `setSize().addCheese().build()`).

### 3.2 Structural Patterns (Class Composition)
1.  **Adapter**: Connect incompatible interfaces. (e.g., Memory Card -> Card Reader -> USB Port).
2.  **Decorator**: specific behavior dynamically. (e.g., `Coffee` -> `MilkDecorator(Coffee)` -> `SugarDecorator(...)`).
3.  **Facade**: Simplified interface to complex system. (e.g., `Car.startKey()` triggers Battery, Engine, Fuel injection).
4.  **Proxy**: Placeholder for another object. (e.g., Lazy Loading images, Access Control).

### 3.3 Behavioral Patterns (Communication)
1.  **Observer**: Publish-Subscribe. Subject notifies Observers on change. (e.g., Youtube Channel -> Subscribers, MVC Architecture).
2.  **Strategy**: Family of algorithms. Switchable at runtime. (e.g., `RouteStrategy` -> `Fastest`, `Shortest`, `Scenic`).
3.  **Iterator**: Traverse a collection without exposing underlying structure.

---

## 4. Unified Modeling Language (UML)
Standard way to visualize design.

### Class Diagram Relationships
1.  **Association (`—`)**: Relationship. "Teacher teaches Student".
2.  **Inheritance (`—|>`)**: "Is-a". "Dog is an Animal".
3.  **Realization/Implementation (`..|>`)**: Class implements Interface.
4.  **Aggregation (`<>—`)**: "Has-a" (Weak). "Department has Teachers". (Teachers exist without Dept).
5.  **Composition (`<#>—`)**: "Part-of" (Strong). "House has Rooms". (Rooms destroyed if House destroyed).

---

## 5. Case Studies (Common Interview Questions)

### 5.1 Design a Parking Lot
*   **Actors**: Admin, Customer, Attendant.
*   **Classes**: `ParkingLot`, `ParkingFloor`, `ParkingSpot` (Handicapped, Compact, Large), `Vehicle` (Car, Truck, Bike), `Ticket`, `Gate`.
*   **Enums**: `VehicleType`, `SpotType`, `TicketStatus`.
*   **Key Logic**:
    *   `findNearestSpot(VehicleType)`
    *   `calculateFee(Ticket)`

### 5.2 Design an Elevator System
*   **Classes**: `ElevatorSystem`, `ElevatorCar`, `Button` (Internal, External), `Door`.
*   **Logic**: Scheduling Algorithm (SCAN/LOOK).
*   **States**: `IDLE`, `MOVING_UP`, `MOVING_DOWN`.

### 5.3 Design a Tic-Tac-Toe Game
*   **Classes**: `Game`, `Board`, `Player`, `Move`.
*   **Logic**: `checkWinner()` after every move using O(1) row/col check.
