To help you master industry-level development, here are the concise notes on the architectural concepts and naming conventions I applied to your code.

---

## 1. BEM Naming Convention (Block, Element, Modifier)

This is the most popular industry convention for naming CSS classes. It prevents "CSS leakage" (where styles accidentally affect other parts of the page).

* **Block:** A standalone entity (e.g., `.card`, `.nav`).
* **Element:** A part of the block that has no standalone meaning (e.g., `.card__title`, `.nav__link`). Joined by two underscores.
* **Modifier:** A flag used to change appearance or behavior (e.g., `.card--dark`, `.btn--primary`). Joined by two dashes.

---

## 2. DRY Principle (Don't Repeat Yourself)

In your original code, you redefined font sizes and colors for every section.

* **Concept:** Move shared properties (like `text-align: center` or `font-size: 40px`) into a base class (like `.hero`).
* **Benefit:** If you want to change the heading size of all banners, you only change **one** line of code instead of six.

---

## 3. CSS Variables (Custom Properties)

Industry projects use a `:root` selector to store brand colors and spacing.

* **Usage:** Instead of remembering `rgb(0, 151, 238)`, you use `var(--color-blue)`.
* **Maintenance:** This acts as a "Single Source of Truth." Changing the variable at the top updates the entire website instantly.

---

## 4. Semantic HTML

We replaced many `div` tags with tags that describe their content.

* **`<nav>`:** Tells search engines and screen readers where the navigation menu is.
* **`<section>`:** Defines a thematic grouping of content (like a hero banner).
* **`<main>`:** Identifies the primary content of the document.

---

## 5. Modern Layout Engines

We moved away from hard-coded heights and old-school positioning.

* **Flexbox (`display: flex`):** Used for the **Nav** and **CTA groups**. It’s the best way to align items in a single dimension (horizontal or vertical).
* **CSS Grid (`display: grid`):** Used for the **Cards**. It is the standard for two-dimensional layouts (rows and columns).
* **FR Units:** We used `1fr 1fr` instead of percentages. This tells the browser to give each column "one fraction" of the available space, which is more stable across different screen sizes.

---

## 6. CSS Specificity & Performance

* **Convention:** Always prefer **Classes** over **IDs** for styling.
* **Reason:** IDs have high "specificity," making them hard to override later. Classes are "flatter" and make the CSS more performant and easier to scale.

That's it :)

---

## How grid-template-column: 1fr 1fr works ?

The `1fr 1fr` value is the modern, industry-standard way to create layouts. To understand it, you first need to understand the **`fr` (Fractional)** unit.

### 1. What is an `fr` unit?

The `fr` unit represents a **fraction of the free space** in the grid container. Unlike percentages (`%`), which are calculated based on the total width, `fr` units are calculated **after** fixed-size items (like margins, gaps, or fixed-width columns) are taken out.

### 2. How `1fr 1fr` is calculated

When you write `grid-template-columns: 1fr 1fr;`, the browser performs these steps:

1. **Identifies the total "shares":** It adds up the numbers (1 + 1 = 2 shares total).
2. **Calculates available space:** It looks at the total width of the container and subtracts any `gap` you’ve defined.
3. **Divides the space:** It gives each column  (50%) of that remaining space.

### 3. Why it’s better than `50% 50%`

This is where many beginners get stuck. If you use percentages with a gap, your layout will likely break:

* **Using Percentages:** `50% + 50% + 20px gap` = **More than 100%**. This causes horizontal scrolling or breaks the grid.
* **Using `fr` units:** `1fr + 1fr + 20px gap` = **Exactly 100%**. The browser handles the math by subtracting the 20px first, then splitting the rest.

### 4. Visual Comparison

Imagine your container is **1000px** wide and you have a **20px gap**.

| Unit Used | Calculation | Result |
| --- | --- | --- |
| `1fr 1fr` |  | Two columns of **490px** each. (Perfect fit) |
| `1fr 2fr` |  | Col 1: **326px**, Col 2: **653px**. (Golden ratio style) |
| `50% 50%` |  | **1020px**. (Overflows/Breaks) |

### 5. Pro Tip: The `repeat()` function

In industry-level code, if you want many equal columns (like a 4-column photo gallery), we don't write `1fr 1fr 1fr 1fr`. Instead, we use:

```css
/* This is exactly the same as 1fr 1fr 1fr 1fr */
grid-template-columns: repeat(4, 1fr); 

```

### Summary

* **`1fr 1fr`** = 2 equal columns.
* **`2fr 1fr`** = The left column is twice as wide as the right.
* **The magic:** It automatically handles `gap` and `padding` math for you, making your website much more "bulletproof" on different screen sizes.

```