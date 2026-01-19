# Structural Design Patterns

Structural patterns explain how to assemble objects and classes into larger structures, while keeping these structures flexible and efficient.

## 1. Adapter Pattern
**Goal**: Allows incompatible interfaces to work together. It acts as a bridge between two incompatible interfaces.

**Use Case**: Integrating a 3rd party legacy API (XML) into a new system (JSON).

```java
// Target Interface (What our system expects)
interface LightningPhone {
    void recharge();
    void useLightning();
}

// Adaptee (3rd Party / Legacy)
class AndroidPhone {
    void recharge() { System.out.println("Recharging Android..."); }
    void useMicroUsb() { System.out.println("Micro USB connected"); }
}

// Adapter
class LightningToMicroUsbAdapter implements LightningPhone {
    private AndroidPhone androidPhone;

    public LightningToMicroUsbAdapter(AndroidPhone androidPhone) {
        this.androidPhone = androidPhone;
    }

    @Override
    public void useLightning() {
        System.out.println("MicroUsb connected via Lightning Adapter");
        androidPhone.useMicroUsb();
    }

    @Override
    public void recharge() {
        androidPhone.recharge();
    }
}
```

## 2. Decorator Pattern
**Goal**: Attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.

**Use Case**: Pizza toppings (Base Pizza + Cheese + Pepperoni), Coffee types.

```java
// Component
interface Coffee {
    double getCost();
    String getDescription();
}

// Concrete Component
class SimpleCoffee implements Coffee {
    public double getCost() { return 10.0; }
    public String getDescription() { return "Simple Coffee"; }
}

// Decorator
class MilkDecorator implements Coffee {
    private Coffee coffee; // Has-a relationship

    public MilkDecorator(Coffee coffee) { this.coffee = coffee; }

    public double getCost() { return coffee.getCost() + 2.0; }
    public String getDescription() { return coffee.getDescription() + ", Milk"; }
}

// Usage
Coffee myCoffee = new SimpleCoffee();
myCoffee = new MilkDecorator(myCoffee); // Cost: 12.0
```

## 3. Facade Pattern
**Goal**: Provide a simplified interface to a library, a framework, or any other complex set of classes.

**Use Case**: A simple method `computer.start()` that internally calls `cpu.freeze()`, `mem.load()`, `hd.read()`.

```java
class ComputerFacade {
    private CPU cpu;
    private Memory memory;
    private HardDrive hardDrive;

    public ComputerFacade() {
        this.cpu = new CPU();
        this.memory = new Memory();
        this.hardDrive = new HardDrive();
    }

    public void start() {
        cpu.freeze();
        memory.load(BOOT_ADDRESS, hardDrive.read(BOOT_SECTOR, SECTOR_SIZE));
        cpu.jump(BOOT_ADDRESS);
        cpu.execute();
    }
}
```
