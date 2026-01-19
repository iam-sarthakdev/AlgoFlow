# GRASP Principles

GRASP (General Responsibility Assignment Software Patterns) provides guidelines for assigning responsibilities to classes and objects in object-oriented design.

## 1. Information Expert
**Principle**: Assign responsibility to the class that has the information needed to fulfill it.

**Example**: If you need to calculate the total price of a shopping cart, the `ShoppingCart` class should have this method since it knows about all items.

```java
class ShoppingCart {
    private List<Item> items = new ArrayList<>();
    
    public void addItem(Item item) { items.add(item); }
    
    // Information Expert: Cart knows about items
    public double calculateTotal() {
        return items.stream().mapToDouble(Item::getPrice).sum();
    }
}

class Item {
    private String name;
    private double price;
    
    public double getPrice() { return price; }
}
```

## 2. Creator
**Principle**: Assign class B the responsibility to create class A if:
- B contains or aggregates A
- B records A
- B closely uses A
- B has the initializing data for A

```java
class Order {
    private List<OrderLine> orderLines = new ArrayList<>();
    
    // Creator: Order creates OrderLine
    public void addProduct(Product product, int quantity) {
        OrderLine line = new OrderLine(product, quantity);
        orderLines.add(line);
    }
}

class OrderLine {
    private Product product;
    private int quantity;
    
    public OrderLine(Product product, int quantity) {
        this.product = product;
        this.quantity = quantity;
    }
}
```

## 3. Controller
**Principle**: Assign the responsibility of handling a system event to a class that:
- Represents the overall system (Facade Controller)
- Represents a use case scenario (Use Case Controller)

```java
// Use Case Controller
class CheckoutController {
    private ShoppingCart cart;
    private PaymentService paymentService;
    
    public void processCheckout(User user) {
        double total = cart.calculateTotal();
        paymentService.charge(user, total);
        // ... additional logic
    }
}
```

## 4. Low Coupling
**Principle**: Assign responsibilities to minimize dependencies between classes.

**Bad Example**:
```java
// High Coupling
class OrderProcessor {
    public void process(Order order) {
        // Directly depends on concrete classes
        EmailService email = new EmailService();
        SMSService sms = new SMSService();
        email.send("Order placed");
        sms.send("Order placed");
    }
}
```

**Good Example**:
```java
// Low Coupling via Dependency Injection
interface NotificationService {
    void send(String message);
}

class OrderProcessor {
    private List<NotificationService> notifiers;
    
    public OrderProcessor(List<NotificationService> notifiers) {
        this.notifiers = notifiers;
    }
    
    public void process(Order order) {
        for (NotificationService notifier : notifiers) {
            notifier.send("Order placed");
        }
    }
}
```

## 5. High Cohesion
**Principle**: Keep responsibilities of a class closely related and focused.

**Bad Example**:
```java
// Low Cohesion (does too many unrelated things)
class User {
    private String name;
    
    public void saveToDB() { /* DB logic */ }
    public void sendEmail() { /* Email logic */ }
    public void generateReport() { /* Reporting logic */ }
}
```

**Good Example**:
```java
// High Cohesion (each class has one focus)
class User {
    private String name;
    // Only user data and related behavior
}

class UserRepository {
    public void save(User user) { /* DB logic */ }
}

class UserNotifier {
    public void sendEmail(User user) { /* Email logic */ }
}
```

## 6. Polymorphism
**Principle**: Use polymorphic operations instead of conditional logic based on type.

**Bad**:
```java
if (shape.getType() == "Circle") {
    drawCircle(shape);
} else if (shape.getType() == "Square") {
    drawSquare(shape);
}
```

**Good**:
```java
interface Shape {
    void draw();
}

class Circle implements Shape {
    public void draw() { /* Circle drawing */ }
}

class Square implements Shape {
    public void draw() { /* Square drawing */ }
}

// Just call
shape.draw();
```

## 7. Pure Fabrication
**Principle**: Create a "helper" class that doesn't represent a concept in the problem domain, but is needed to achieve low coupling and high cohesion.

```java
// PersistenceService is a Pure Fabrication
// It doesn't exist in the real world but helps organize code
class PersistenceService {
    public void save(Object obj) {
        // Generic save logic
    }
}
```

## 8. Indirection
**Principle**: Introduce an intermediate object to decouple two components.

```java
// Adapter is an Indirection
class LegacyPrinter {
    public void printOldWay(String text) { /* old code */ }
}

interface Printer {
    void print(String text);
}

class PrinterAdapter implements Printer {
    private LegacyPrinter legacy = new LegacyPrinter();
    
    public void print(String text) {
        legacy.printOldWay(text);
    }
}
```

## 9. Protected Variations
**Principle**: Identify points of predicted variation and create a stable interface around them.

```java
// Interface protects against variations in payment methods
interface PaymentMethod {
    void pay(double amount);
}

class CreditCardPayment implements PaymentMethod {
    public void pay(double amount) { /* CC logic */ }
}

class PayPalPayment implements PaymentMethod {
    public void pay(double amount) { /* PayPal logic */ }
}

// Future: Add BitcoinPayment without breaking existing code
```
