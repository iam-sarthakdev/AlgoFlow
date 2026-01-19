# Creational Design Patterns

Creational patterns deal with object creation mechanisms, trying to create objects in a manner suitable to the situation. They hide the creation logic, making the system more flexible.

## 1. Singleton Pattern
**Goal**: Ensure a class has only one instance and provide a global point of access to it.

**Use Case**: Database connections, Logging service, Configuration manager.

```java
public class Database {
    // 1. Static instance
    private static Database instance;

    // 2. Private constructor
    private Database() {}

    // 3. Public static method (Thread Safe)
    public static synchronized Database getInstance() {
        if (instance == null) {
            instance = new Database();
        }
        return instance;
    }
    
    public void query(String sql) {
        System.out.println("Executing: " + sql);
    }
}
```

## 2. Factory Pattern
**Goal**: Define an interface for creating an object, but let subclasses decide which class to instantiate.

**Use Case**: Notification System (Email, SMS, Push).

```java
// Interface
interface Notification {
    void notifyUser();
}

// Implementations
class SMSNotification implements Notification {
    public void notifyUser() { System.out.println("Sending SMS..."); }
}
class EmailNotification implements Notification {
    public void notifyUser() { System.out.println("Sending Email..."); }
}

// Factory
class NotificationFactory {
    public Notification createNotification(String type) {
        if (type.equals("SMS")) return new SMSNotification();
        if (type.equals("EMAIL")) return new EmailNotification();
        return null;
    }
}
```

## 3. Builder Pattern
**Goal**: Separate the construction of a complex object from its representation. It allows you to create different representations of an object using the same construction code.

**Use Case**: Constructing a complex `Pizza` or `HTTP Request` with many optional parameters.

```java
class Pizza {
    private String dough;   // required
    private String sauce;   // required
    private String topping; // optional

    private Pizza(Builder builder) {
        this.dough = builder.dough;
        this.sauce = builder.sauce;
        this.topping = builder.topping;
    }

    public static class Builder {
        private String dough;
        private String sauce;
        private String topping;

        public Builder(String dough, String sauce) {
            this.dough = dough;
            this.sauce = sauce;
        }

        public Builder setTopping(String topping) {
            this.topping = topping;
            return this;
        }

        public Pizza build() {
            return new Pizza(this);
        }
    }
}

// Usage
Pizza p = new Pizza.Builder("Thin Crust", "Tomato")
                   .setTopping("Cheese")
                   .build();
```
