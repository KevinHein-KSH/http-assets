# Understanding JavaScript Promises

## What is a Promise?

A **Promise** is a built-in JavaScript **object** that represents a value that may not be available yet. It’s not a function or a class, but a **data structure** with a state and a result.
It can be in one of three states:

- **Pending** – waiting for the result
- **Fulfilled** – successfully completed
- **Rejected** – failed with an error

A Promise acts as a placeholder for a value that will eventually be known.

---

## Why use Promises?

JavaScript runs on a **single thread**, which means long operations (like API requests or file reads) can block other code.
Promises help you handle these **asynchronous operations** cleanly — without callback nesting or blocking behavior.

---

## Using `setTimeout()` in Examples

`setTimeout()` is often used to **simulate delay** in Promise demos — similar to how network or file operations take time in real life.

Example:

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Data loaded successfully!");
  }, 1000);
});
```

Here, `setTimeout` mimics a 1‑second delay before resolving the Promise.

---

## Handling Promises with `.then()` and `.catch()`

Use `.then()` to handle successful results and `.catch()` for errors.

```js
promise
  .then((result) => {
    console.log(result); // runs when resolved
  })
  .catch((error) => {
    console.error(error); // runs if rejected
  });
```

You can chain multiple `.then()` calls to perform sequential operations.

---

## Handling Promises with `async` / `await`

`async` / `await` is **syntactic sugar** for Promises, allowing you to write asynchronous code that looks synchronous.

```js
async function loadData() {
  try {
    const result = await promise; // waits for the Promise to settle
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

loadData();
```

**Key points:**

- `await` only works inside an `async` function.
- `async` functions always return a Promise.

---

## Summary

- A **Promise** is an object with a state: `pending → fulfilled` or `pending → rejected`.
- Use `.then()` and `.catch()` to handle results or errors.
- Use `async` / `await` for cleaner, synchronous-style async code.
- Use `setTimeout()` in examples to simulate real-world delays.

---

### Quick Example

```js
function fakeRequest() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.3;
      success ? resolve("✅ Success!") : reject("❌ Failed!");
    }, 1000);
  });
}

async function run() {
  try {
    const result = await fakeRequest();
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}

run();
```

This example shows how Promises and `async/await` work together to handle asynchronous results cleanly.
