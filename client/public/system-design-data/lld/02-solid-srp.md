# Single Responsibility Principle (SRP)

> **Definition**: "A class should have only one reason to change."

This is the "S" in SOLID. It means a class should satisfy only one objective or responsibility. If a class handles multiple responsibilities, changing one feature might break others.

## The Problem (Violation)
Consider a `Book` class that handles both storing data and printing content.

```java
// VIOLATION of SRP
class Book {
    private String name;
    private String author;
    private String text;

    public Book(String name, String author, String text) {
        this.name = name;
        this.author = author;
        this.text = text;
    }

    // Responsibility 1: Business Logic / Data
    public String replaceWordInText(String word, String replacement){
        return text.replaceAll(word, replacement);
    }

    // Responsibility 2: Presentation / Formatting
    public void printTextToConsole(){
        // Changing to JSON or HTML printing would require changing this class
        System.out.println(text);
    }
}
```

### Why is this bad?
1.  **Coupling**: The core logic of the Book is coupled with how it's displayed.
2.  **Fragility**: If we want to change printing output (e.g., print to file), we modify the `Book` class, risking bugs in the `replaceWordInText` logic.

## The Solution
split the responsibilities into separate classes.

```java
// 1. Data Class
class Book {
    private String name;
    private String author;
    private String text;

    // Standard Getters, Setters, Constructor
    public String getText() { return text; }
}

// 2. Printer Class (Handles Presentation)
class BookPrinter {
    // Only reason to change: Display logic changes
    public void printTextToConsole(Book book) {
        System.out.println(book.getText());
    }
    
    public void printTextToJson(Book book) {
        // ... logic to print JSON
    }
}
```

## Key Takeaway
- If you see `and` in the description of what a class does (e.g., "This class processes payments AND sends emails"), it likely violates SRP.
- **Cohesion**: Classes should be highly cohesive (methods relates to the same purpose).
