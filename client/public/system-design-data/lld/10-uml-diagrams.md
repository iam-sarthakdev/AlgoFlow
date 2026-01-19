# UML Diagrams

Unified Modeling Language (UML) is a standard way to visualize the design of a system.

## 1. Class Diagram
The most common diagram in LLD. It shows the static structure of the system.

### Relationships
- **Inheritance**: Solid line with closed hollow arrow.
- **Implementation**: Dashed line with closed hollow arrow.
- **Association**: Solid line.
- **Aggregation**: Solid line with hollow diamond (◇).
- **Composition**: Solid line with filled diamond (◆).

```mermaid
classDiagram
    Animal <|-- Dog : Inheritance
    Animal <|-- Cat
    Animal : +int age
    Animal : +String gender
    Animal : +isMammal()
    
    class Dog{
        +String breed
        +bark()
    }

    class House {
        +Room[] rooms
    }
    class Room {
        +int size
    }
    House *-- Room : Composition (Room cannot exist without House)

    class Library {
        +Book[] books
    }
    class Book {
        +String title
    }
    Library o-- Book : Aggregation (Book can exist independently)
```

## 2. Sequence Diagram
Shows how objects interact in a particular time sequence.

**Example**: ATM Withdrawal Process

```mermaid
sequenceDiagram
    participant User
    participant ATM
    participant BankServer
    participant Account

    User->>ATM: Insert Card
    ATM->>BankServer: Verify PIN
    BankServer-->>ATM: PIN OK
    User->>ATM: Request 500
    ATM->>BankServer: Check Balance
    BankServer->>Account: debit(500)
    Account-->>BankServer: New Balance OK
    BankServer-->>ATM: Approve Transaction
    ATM->>User: Dispense Cash
```

## 3. Use Case Diagram
Show interactions between actors (users) and the system.

- **Actor**: Stick figure (User, Admin).
- **Use Case**: Oval (Login, Checkout).
- **System Boundary**: Box around use cases to define scope.
