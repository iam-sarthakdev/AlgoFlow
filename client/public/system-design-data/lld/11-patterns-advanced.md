# Advanced Design Patterns

## 1. Proxy Pattern
**Goal**: Provide a placeholder for another object to control access to it.

**Use Cases**:
- Virtual Proxy (Lazy initialization of expensive objects)
- Protection Proxy (Access control)
- Remote Proxy (Represents object in different address space)

```java
// Subject Interface
interface Image {
    void display();
}

// Real Subject
class RealImage implements Image {
    private String filename;
    
    public RealImage(String filename) {
        this.filename = filename;
        loadFromDisk(); // Expensive operation
    }
    
    private void loadFromDisk() {
        System.out.println("Loading " + filename);
    }
    
    public void display() {
        System.out.println("Displaying " + filename);
    }
}

// Proxy
class ProxyImage implements Image {
    private RealImage realImage;
    private String filename;
    
    public ProxyImage(String filename) {
        this.filename = filename;
    }
    
    public void display() {
        // Lazy initialization
        if (realImage == null) {
            realImage = new RealImage(filename);
        }
        realImage.display();
    }
}

// Usage
Image img = new ProxyImage("photo.jpg");
// Image not loaded yet
img.display(); // NOW it loads and displays
```

## 2. Chain of Responsibility
**Goal**: Pass a request along a chain of handlers. Each handler decides either to process the request or to pass it to the next handler.

**Use Case**: Middleware, Logging levels, Event bubbling in UI.

```java
// Handler
abstract class Logger {
    public static int INFO = 1;
    public static int DEBUG = 2;
    public static int ERROR = 3;
    
    protected int level;
    protected Logger nextLogger;
    
    public void setNextLogger(Logger nextLogger) {
        this.nextLogger = nextLogger;
    }
    
    public void logMessage(int level, String message) {
        if (this.level <= level) {
            write(message);
        }
        if (nextLogger != null) {
            nextLogger.logMessage(level, message);
        }
    }
    
    abstract protected void write(String message);
}

// Concrete Handlers
class ConsoleLogger extends Logger {
    public ConsoleLogger(int level) { this.level = level; }
    protected void write(String message) { System.out.println("Console: " + message); }
}

class FileLogger extends Logger {
    public FileLogger(int level) { this.level = level; }
    protected void write(String message) { System.out.println("File: " + message); }
}

// Usage
Logger loggerChain = new ConsoleLogger(Logger.INFO);
Logger fileLogger = new FileLogger(Logger.ERROR);
loggerChain.setNextLogger(fileLogger);

loggerChain.logMessage(Logger.INFO, "This is information."); // Console
loggerChain.logMessage(Logger.ERROR, "This is an error."); // Console + File
```

## 3. State Pattern
**Goal**: Allow an object to alter its behavior when its internal state changes.

**Use Case**: TCP Connection states, Vending Machine, Order Status.

```java
// State Interface
interface State {
    void doAction(Context context);
}

// Concrete States
class StartState implements State {
    public void doAction(Context context) {
        System.out.println("Player is in start state");
        context.setState(this);
    }
    public String toString() { return "Start State"; }
}

class StopState implements State {
    public void doAction(Context context) {
        System.out.println("Player is in stop state");
        context.setState(this);
    }
    public String toString() { return "Stop State"; }
}

// Context
class Context {
    private State state;
    
    public void setState(State state) { this.state = state; }
    public State getState() { return state; }
}

// Usage
Context context = new Context();
StartState startState = new StartState();
startState.doAction(context); // State: Start

StopState stopState = new StopState();
stopState.doAction(context); // State: Stop
```

## 4. Template Method Pattern
**Goal**: Define the skeleton of an algorithm in a base class, but let subclasses override specific steps without changing the algorithm's structure.

```java
abstract class Game {
    // Template method (final so it can't be overridden)
    public final void play() {
        initialize();
        startPlay();
        endPlay();
    }
    
    abstract void initialize();
    abstract void startPlay();
    abstract void endPlay();
}

class Cricket extends Game {
    void initialize() { System.out.println("Cricket Game Initialized"); }
    void startPlay() { System.out.println("Cricket Game Started"); }
    void endPlay() { System.out.println("Cricket Game Finished"); }
}

class Football extends Game {
    void initialize() { System.out.println("Football Game Initialized"); }
    void startPlay() { System.out.println("Football Game Started"); }
    void endPlay() { System.out.println("Football Game Finished"); }
}
```

## 5. Visitor Pattern
**Goal**: Add new operations to existing object structures without modifying them.

**Use Case**: Compiler AST traversal, Element processing in different ways.

```java
// Element
interface ComputerPart {
    void accept(ComputerPartVisitor visitor);
}

// Concrete Elements
class Keyboard implements ComputerPart {
    public void accept(ComputerPartVisitor visitor) {
        visitor.visit(this);
    }
}

class Monitor implements ComputerPart {
    public void accept(ComputerPartVisitor visitor) {
        visitor.visit(this);
    }
}

// Visitor
interface ComputerPartVisitor {
    void visit(Keyboard keyboard);
    void visit(Monitor monitor);
}

// Concrete Visitor
class ComputerPartDisplayVisitor implements ComputerPartVisitor {
    public void visit(Keyboard keyboard) {
        System.out.println("Displaying Keyboard.");
    }
    public void visit(Monitor monitor) {
        System.out.println("Displaying Monitor.");
    }
}
```
