# Behavioral Design Patterns

Behavioral patterns are concerned with algorithms and the assignment of responsibilities between objects.

## 1. Observer Pattern
**Goal**: Define a subscription mechanism to notify multiple objects about any events that happen to the object they're observing.

**Use Case**: Youtube Channel Subscribers, Event Listeners in UI.

```java
// Subject
class Channel {
    private List<Subscriber> subs = new ArrayList<>();
    private String title;

    public void subscribe(Subscriber sub) { subs.add(sub); }
    public void unSubscribe(Subscriber sub) { subs.remove(sub); }

    public void upload(String title) {
        this.title = title;
        notifySubscribers();
    }

    private void notifySubscribers() {
        for(Subscriber sub : subs) sub.update(title);
    }
}

// Observer Interface
interface Subscriber {
    void update(String title);
}

// Concrete Observer
class User implements Subscriber {
    private String name;
    public User(String name) { this.name = name; }
    
    @Override
    public void update(String title) {
        System.out.println("Hey " + name + ", Video Uploaded: " + title);
    }
}
```

## 2. Strategy Pattern
**Goal**: Define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.

**Use Case**: Google Maps (Walk, Car, Bike routes), Sorting Algorithms, Payment Methods.

```java
interface RouteStrategy {
    void buildRoute(String a, String b);
}

class RoadStrategy implements RouteStrategy {
    public void buildRoute(String a, String b) { System.out.println("Road Route"); }
}

class WalkStrategy implements RouteStrategy {
    public void buildRoute(String a, String b) { System.out.println("Walking Route"); }
}

class Navigator {
    private RouteStrategy strategy;

    public void setStrategy(RouteStrategy strategy) { this.strategy = strategy; }

    public void buildRoute(String a, String b) {
        strategy.buildRoute(a, b);
    }
}
```

## 3. Command Pattern
**Goal**: Turns a request into a stand-alone object that contains all information about the request.

**Use Case**: Remote Control (Turn On, Turn Off), GUI Buttons.

```java
// Command
interface Command {
    void execute();
}

// Receiver
class Light {
    public void on() { System.out.println("Light On"); }
    public void off() { System.out.println("Light Off"); }
}

// Concrete Command
class LightOnCommand implements Command {
    private Light light;
    public LightOnCommand(Light light) { this.light = light; }
    public void execute() { light.on(); }
}

// Invoker
class RemoteControl {
    private Command command;
    public void setCommand(Command command) { this.command = command; }
    public void pressButton() { command.execute(); }
}
```
