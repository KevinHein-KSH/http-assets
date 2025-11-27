# JSON Overview

### What JSON Is
JSON (JavaScript Object Notation) is a **text-based data format** used to represent structured data.  
It is based on JavaScript object syntax, but it is a **language-agnostic standard** supported by almost every major programming language (Go, Python, C#, Java, etc.).

JSON represents **objects, arrays, numbers, strings, booleans, and null** as text.  
A JavaScript object exists only inside your program’s memory; if you want to send that object outside your program (over HTTP, into files, or into databases), you convert it to JSON or another wire format first.

**Pronunciation:** “Jay-sawn” or “Jason”.

---

### Where JSON Is Commonly Used
- HTTP request and response bodies  
- `.json` configuration files  
- NoSQL databases such as MongoDB, Firestore, ElasticSearch  
- Saving structured data to disk  
- Sending structured data between services or microservices  

---

## Working With JSON in JavaScript

JavaScript provides three main tools for handling JSON:

- **`JSON.stringify()`** → converts a JavaScript value into a JSON string  
- **`JSON.parse()`** → converts a JSON string back into a JavaScript value  
- **`Response.prototype.json()`** → parses the body of a `fetch()` response as JSON  

JSON isn’t only something we *receive* — we also *send* JSON frequently.

---

## JSON.stringify() — Serializing / Sending Data

`JSON.stringify()` converts a JavaScript value (object, array, primitive) into a **JSON string**.  
This process is called **serialization**.

### Common uses:
- Preparing data to send to a server (e.g., `fetch()` request bodies)  
- Storing structured data in files, localStorage, or databases  
- Logging or debugging structured data  

### Example (correct fetch usage):
```js
fetch("/api/location", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(locationObj) // must be a string
});
```

## JSON.parse() — Converting JSON Back Into a JavaScript Value

`JSON.parse()` takes a JSON string and reconstructs the JavaScript value it describes.

#### Example:
```
const json = '{ 
                "title":"Avengers Endgame",
                "Rating":4.7,
                "inTheaters":false
              }'; // string

const obj = JSON.parse(json);
console.log(obj.title); // Avengers Endgame
```

#### When it's used:

- Receiving JSON text from a server
- Reading JSON from a file
- Reading from localStorage
- Testing with mock JSON strings
---

### Error Handling When Parsing JSON

`JSON.parse()` throws an error if the input string is not valid JSON.
To prevent crashes, wrap parsing in a `try/catch`:
```
try {
  const obj = JSON.parse(locationString);
  printLocationObj(obj);
} catch {
  console.log("invalid json string");
}
```

Why this matters:

- Prevents app crashes from malformed JSON
- Allows graceful fallback behavior
- Ensures backend JSON formats are validated early (common with mock data)
---
## Parsing HTTP Responses as JSON

When using the fetch() API, the returned Response object provides a .json() method that:

- Reads the response stream
- Parses the text as JSON
- Returns a promise that resolves to a JavaScript value

### Example:
```
const resp = await fetch("/api/data");
const javascriptObjectResponse = await resp.json();
```

### Notes:

- `.json()` is asynchronous → requires `await` or `.then()`
- It returns a parsed JavaScript object, not a JSON string

## Summary

- JSON is a **universal, language-independent format** for representing structured data as text.
- Use `JSON.stringify()` to convert JavaScript values into JSON strings for sending or storing.
- Use `JSON.parse()` to convert JSON strings back into JavaScript values.
- Use `resp.json()` when working with fetch() responses to parse server-returned JSON into usable JavaScript object.