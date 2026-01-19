# Case Study: Library Management System

A **medium-complexity** LLD problem commonly asked in interviews at Flipkart, Amazon, and Microsoft.

## Requirements

### Functional Requirements
1. Members can search for books by title, author, or subject.
2. Members can borrow and return books.
3. System tracks book availability.
4. Fines for late returns.
5. Librarian can add/remove books and manage members.
6. Each book can have multiple copies.

### Use Cases
- **Member**: Search book, Borrow book, Return book, Pay fine.
- **Librarian**: Add book, Remove book, Add member, Block member.

---

## Core Classes

### 1. Book & BookItem
```java
class Book {
    private String ISBN;
    private String title;
    private String author;
    private String subject;
    private LocalDate publicationDate;
    
    // Constructor, Getters, Setters
    public Book(String ISBN, String title, String author, String subject) {
        this.ISBN = ISBN;
        this.title = title;
        this.author = author;
        this.subject = subject;
    }
}

// Each physical copy is a BookItem
class BookItem extends Book {
    private String barcode; // Unique for each copy
    private LocalDate borrowed;
    private LocalDate dueDate;
    private double price;
    private BookStatus status;
    
    public BookItem(String ISBN, String title, String author, String subject, String barcode) {
        super(ISBN, title, author, subject);
        this.barcode = barcode;
        this.status = BookStatus.AVAILABLE;
    }
    
    public boolean isAvailable() {
        return status == BookStatus.AVAILABLE;
    }
    
    public void checkout() {
        this.borrowed = LocalDate.now();
        this.dueDate = borrowed.plusDays(14); // 2 weeks
        this.status = BookStatus.LOANED;
    }
    
    public void returnBook() {
        this.status = BookStatus.AVAILABLE;
        this.borrowed = null;
        this.dueDate = null;
    }
    
    public long getOverdueDays() {
        if (dueDate == null) return 0;
        return ChronoUnit.DAYS.between(dueDate, LocalDate.now());
    }
}

enum BookStatus {
    AVAILABLE, RESERVED, LOANED, LOST
}
```

### 2. Account / User
```java
abstract class Account {
    protected String id;
    protected String password;
    protected AccountStatus status;
    protected Person person;
    
    public abstract boolean resetPassword();
}

class Librarian extends Account {
    public boolean addBookItem(BookItem bookItem) {
        // Add to catalog
        return true;
    }
    
    public boolean blockMember(String memberId) {
        // Update member status
        return true;
    }
    
    public boolean resetPassword() {
        // Librarian can reset their own password
        return true;
    }
}

class Member extends Account {
    private LocalDate dateOfMembership;
    private int totalBooksCheckedOut;
    
    public int getTotalBooksCheckedOut() {
        return totalBooksCheckedOut;
    }
    
    public boolean reserveBookItem(BookItem bookItem) {
        // Reserve logic
        return true;
    }
    
    private void incrementBooksCheckedOut() {
        totalBooksCheckedOut++;
    }
    
    public boolean resetPassword() {
        // Member reset password
        return true;
    }
}

enum AccountStatus {
    ACTIVE, CLOSED, CANCELED, BLACKLISTED
}

class Person {
    private String name;
    private String address;
    private String email;
    private String phone;
}
```

### 3. Library & Catalog
```java
class Library {
    private String name;
    private Address location;
    private List<BookItem> books;
    
    public List<BookItem> searchByTitle(String title) {
        return books.stream()
            .filter(b -> b.getTitle().contains(title))
            .collect(Collectors.toList());
    }
    
    public List<BookItem> searchByAuthor(String author) {
        return books.stream()
            .filter(b -> b.getAuthor().contains(author))
            .collect(Collectors.toList());
    }
}

class Catalog {
    private Map<String, List<BookItem>> bookTitles;
    private Map<String, List<BookItem>> bookAuthors;
    
    public List<BookItem> searchByTitle(String query) {
        // Use index for fast lookup
        return bookTitles.getOrDefault(query, new ArrayList<>());
    }
}
```

### 4. Book Lending & Fine
```java
class BookLending {
    private String lendingId;
    private LocalDate creationDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private BookItem book;
    private Member member;
    
    public static BookLending lendBook(BookItem book, Member member) {
        if (!book.isAvailable()) {
            throw new IllegalStateException("Book not available");
        }
        
        BookLending lending = new BookLending();
        lending.lendingId = UUID.randomUUID().toString();
        lending.creationDate = LocalDate.now();
        lending.dueDate = LocalDate.now().plusDays(14);
        lending.book = book;
        lending.member = member;
        
        book.checkout();
        return lending;
    }
    
    public Fine returnBook() {
        this.returnDate = LocalDate.now();
        long overdueDays = ChronoUnit.DAYS.between(dueDate, returnDate);
        
        book.returnBook();
        
        if (overdueDays > 0) {
            return new Fine(this, overdueDays * 1.0); // $1 per day
        }
        return null;
    }
}

class Fine {
    private BookLending lending;
    private double amount;
    private LocalDate creationDate;
    
    public Fine(BookLending lending, double amount) {
        this.lending = lending;
        this.amount = amount;
        this.creationDate = LocalDate.now();
    }
    
    public void payFine() {
        // Payment processing
        System.out.println("Fine of $" + amount + " paid.");
    }
}
```

### 5. Notification (Observer Pattern)
```java
interface Observer {
    void update(String message);
}

class EmailNotification implements Observer {
    private String email;
    
    public EmailNotification(String email) { this.email = email; }
    
    public void update(String message) {
        System.out.println("Email to " + email + ": " + message);
    }
}

class NotificationService {
    private List<Observer> observers = new ArrayList<>();
    
    public void subscribe(Observer observer) {
        observers.add(observer);
    }
    
    public void notifyDueSoon(BookLending lending) {
        String message = "Your book is due soon!";
        for (Observer observer : observers) {
            observer.update(message);
        }
    }
}
```

---

## Complete Flow Example

```java
public class LibraryDemo {
    public static void main(String[] args) {
        // Setup
        BookItem book1 = new BookItem("123", "Clean Code", "Robert Martin", "CS", "BC001");
        Member member = new Member();
        member.setId("M001");
        
        // Lend Book
        BookLending lending = BookLending.lendBook(book1, member);
        System.out.println("Book lent successfully");
        
        // Simulate late return (for demo, manually set due date in past)
        // In real scenario, this would be after actual time passes
        
        // Return Book
        Fine fine = lending.returnBook();
        if (fine != null) {
            System.out.println("Late return! Fine: $" + fine.getAmount());
            fine.payFine();
        }
    }
}
```

---

## Design Patterns Used
1. **Singleton**: Library instance.
2. **Observer**: Notification system for due dates.
3. **Factory**: Creating different account types.
4. **Strategy**: Different search strategies (by title, author, ISBN).

## Interview Tips
- Clarify if there are reservation queues when books are unavailable.
- Ask about max books per member.
- Discuss how to handle lost books.
- Mention database indexes for fast search.
