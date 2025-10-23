## 🧩 Error Handling and Debugging: A Comparison

It is essential to recognize that **errors are not the same as bugs**, and consequently, **error handling is not the same as debugging**.

### 🐞 Bugs vs. Debugging

* **Bugs** are bits of code that are not working as intended.
* **Debugging** is the manual process performed by the developer to go through code and find where it is misbehaving.
  * Examples include fixing a broken URL or adding a missing parameter to a function call.
* **Rule of Thumb:** Do not use `try/catch` to handle bugs. If your code has a bug, you must find and fix it.

### ⚠️ Errors vs. Error Handling

* **Errors** are issues that can arise even in good code that has no bugs.
* **Error handling** is an **automated process** designed into production code. This logic protects the program from *expected* edge cases, such as weak internet connections, poor user input, or errors from external APIs.
  * Example: validating user input (e.g., preventing punctuation when typing a character name) and displaying an error message if the input is invalid.

---

## ⚙️ Error Handling in JavaScript: The `try/catch` Paradigm

JavaScript uses the **`try/catch` paradigm** for handling errors that occur while a program is running — a mechanism similar to what Python uses.

### Mechanism

1. **Throwing an Error:** When something goes wrong (e.g., trying to access a property on an undefined variable), JavaScript automatically *throws* an error.
2. **Trying and Catching:** Wrapping potentially problematic code in a `try/catch` block allows the program to handle the issue gracefully.
3. **Preventing Crashes:** Proper error handling prevents the entire program from crashing.

### Example: Standard `try/catch` Structure

```javascript
try {
  // Code that might throw an error
  // Example: trying to access a property on an undefined object
  const speed = car.speed;
} catch (error) {
  // Handle the error gracefully
  console.error("An error occurred:", error);
}
```

✅ **Tip:** Always log or otherwise record the caught error for debugging purposes.

---

## ⚡ Asynchronous Error Handling with `async/await`

While `try` and `catch` are the standard mechanisms for synchronous error handling in JavaScript, the original Promise API using `.then()` did **not** permit the use of these blocks.

### Promises and `.catch()`

When using the original Promise API, the **`.catch()`** method is employed to handle rejected promises:

```javascript
fetchUser()
  .then(function(user) {
    console.log(`User fetched: ${user}`);
  })
  .catch(function(err) {
    console.log(`An error was thrown: ${err}`);
  });
```

### The Benefits of `async/await`

The introduction of **`async`** and **`await`** simplified asynchronous error handling because they *do* allow the use of `try/catch` blocks. This makes asynchronous code look more like synchronous code, improving readability and control flow.

👉 Additionally, every `async` function automatically returns a Promise, allowing flexibility to still chain `.then()` or `.catch()` if desired.

### Example: `async/await` with `try/catch`

```javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data'); 
    const data = await response.json();
    console.log('Fetched data:', data);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}
```

✅ **Summary:** The `async/await` syntax unifies synchronous and asynchronous error handling, providing cleaner and more intuitive control over promise-based operations.
