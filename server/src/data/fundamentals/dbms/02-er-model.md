# Chapter 2: Entity-Relationship (ER) Model

## 2.1 Concepts
A high-level conceptual data model.
*   **Entity**: A "thing" or object in the real world with an independent existence. (e.g., Student, Car).
    *   *Represented by*: Rectangle.
*   **Attributes**: Properties that describe the entity. (e.g., Name, Age).
    *   *Represented by*: Oval.

### types of Attributes
1.  **Simple vs Composite**: `Age` (Simple) vs `Address` (Composite: Street, City, Zip).
2.  **Single-Valued vs Multi-Valued**: `Name` (Single) vs `PhoneNumbers` (Multi). *Multi-Valued = Double Oval*.
3.  **Stored vs Derived**: `DOB` (Stored) vs `Age` (Derived from DOB). *Derived = Dashed Oval*.
4.  **Key Attribute**: Uniquely identifies entity. *Underlined*.

---

## 2.2 Relationships
An association among several entities.
*   *Represented by*: Diamond.
*   **Degree**: Number of entities participating. (Binary = 2, Ternary = 3).
*   **Cardinality Ratio**:
    *   **1:1 (One-to-One)**: Manager manages 1 Department.
    *   **1:N (One-to-Many)**: Customer places N Orders.
    *   **M:N (Many-to-Many)**: Student takes N Courses, Course has M Student.

### Participation Constraints
*   **Total Participation (Double Line)**: Every entity MUST participate. (e.g., Every Loan belongs to a Branch).
*   **Partial Participation (Single Line)**: Some entities may not participate. (e.g., Not every Employee manages a Department).

---

## 2.3 Weak Entity
An entity that does not have a key attribute of its own.
*   Identifying relationship needs to link it to a **Strong Entity**.
*   **Partial Key (Discriminator)**: Distinguishes weak entities within the strong entity.
*   *Represented by*: Double Rectangle.

> **Example**: `Dependents` of an `Employee`. Identification depends on EmployeeID. Partial Key might be `DependentName`.

---

## 2.4 Enhanced ER (EER) Model
*   **Specialization/Generalization**: Subclassing.
    *   `Employee` IS-A `Manager`. `Employee` IS-A `Engineer`.
    *   *Disjoint*: Can be only one subclass.
    *   *Overlapping*: Can be multiple.
*   **Aggregation**: Treating a relationship as an entity.
