## 🗺️ Paths and Parameters

A URL is not one string — it is a **stack of decisions**, and this chapter is about the two you
make most often: *which resource do I want* (the **path**) and *how do I want it* (the **query
parameters**).

```
https://dummyjson.com/products/2?sortBy=price&limit=5
└──────┬──────────┘└─────┬─────┘└──────────┬────────┘
     origin            path            query params
```

---

## 1️⃣ URL Paths

The **path** is everything after the origin and before the `?`. Glue them together and you have
the full URL:

```
base:     https://dummyjson.com
path:     /products
fullURL:  https://dummyjson.com/products
```

### Paths used to be real folders

In the early web, `/about/team.html` genuinely meant *the file `team.html` inside the folder
`about`* on the server's disk. The path was a filesystem path.

That is mostly **no longer true**. Today the server receives the path as a *string* and decides
what to do with it — usually running code and building a response on the fly. Nothing on disk has
to match. The path now describes **what you want**, not **where it is stored**.

✅ **Why it matters:** you cannot infer a server's paths by imagining its folders. The paths are
whatever the server author decided, which is why lesson 4 exists.

---

## 2️⃣ RESTful APIs

**REST** is a convention for designing those paths. The core idea: a path names a **resource — a
noun**, not a command.

| ❌ Command-style | ✅ Resource-style |
|---|---|
| `/getAllUsers` | `GET /users` |
| `/deleteUser?id=2` | `DELETE /users/2` |
| `/createNewUser` | `POST /users` |

The **method supplies the verb**, so the path does not have to. One noun, four things you can do
to it:

```
GET    /users        →  list them
POST   /users        →  make one
GET    /users/2      →  read one
PUT    /users/2      →  update one
DELETE /users/2      →  remove one
```

### Collection vs item — one extra segment

`/users` is the **collection**. `/users/2` is **one item**, identified by a value sitting in the
path itself. That value is a **path parameter**, and it is the difference between "all of them"
and "that one".

> 🧪 On the Chapter 9 page, typing an item id turns the segments from `["products"]` into
> `["products", "2"]` in the breakdown table. That is this lesson, live.

### Stateless

REST APIs are **stateless**: the server remembers nothing between requests. Every request must
carry everything needed to answer it — which is exactly why identifying information lives in the
URL and the headers rather than in a "session" the server keeps for you.

### Why `/v1/` shows up in paths

```
https://api.example.com/v1/users
```

Once other people's code depends on your API, you cannot change its shape without breaking them.
Putting a version in the path lets `/v2/users` exist alongside `/v1/users` while everyone
migrates.

---

## 3️⃣ Query Parameters

Query parameters come after the `?` and **modify** the request rather than identify the resource:

```
https://dummyjson.com/products?limit=5
```

* Format is `key=value`.
* They are **optional** — `/products` on its own is a perfectly good request.
* The **server decides** which keys exist. An unknown key is not your call to make.

### Path or query?

A useful rule of thumb:

| Use the **path** for | Use a **query param** for |
|---|---|
| *which* thing — `/products/2` | *how* you want it — `?limit=5` |
| identity, hierarchy | sorting, filtering, paging, search |
| required | optional |

---

## 4️⃣ The Documentation of an HTTP Server

You do **not** memorise APIs, and you cannot deduce them. **The server has total control** over
which paths and params exist and what they mean. The only way to know is to read its docs.

Good documentation tells you: the base URL, the available paths, which method each accepts, which
params each supports, what the response looks like, and how errors are reported.

### 😈 The hard part: bad input often does not error

You would expect a wrong param to produce an error. Frequently it just... doesn't. Three real
behaviours from `dummyjson.com`, all verified:

| What you send | What you'd expect | What actually happens |
|---|---|---|
| `?sortBy=nonsense` | `400 Bad Request` | **`200 OK`** — data comes back unsorted, no warning |
| `/comments?sortBy=id` | sorted comments | `200 OK` — sorting is **ignored entirely** here |
| `POST /products` | creates a product | **`404`** — this server wants `/products/add` |

Each of these **fails silently**. Your code sees a `200`, decides everything worked, and quietly
shows wrong results. No error message will ever tell you.

### ⚠️ The same idea, spelled differently

The course exercises use `?sort=level`. dummyjson has no `sort` param at all — it uses `?sortBy=`
plus a separate `?order=asc|desc`. Copy the lesson text literally and you get a param the server
throws away.

| | Course API | dummyjson |
|---|---|---|
| sort field | `?sort=level` | `?sortBy=age` |
| direction | *(none)* | `?order=asc` / `?order=desc` |

Two servers, same concept, different spelling. **Read the docs.**

---

## 5️⃣ Multiple Query Parameters

Chain as many as you like. **`?` opens the query string, `&` separates every pair after that:**

```
https://dummyjson.com/products?sortBy=price&order=desc&limit=5
                              ↑            ↑          ↑
                              ?            &          &
```

There is exactly **one `?`** in a URL, no matter how many params follow it. A second `?` is the
classic bug from building URLs by gluing strings together.

---

## 🧰 Building URLs without string concatenation

The temptation is `base + "/" + resource + "?" + key + "=" + value`. Don't. It breaks on:

* a base that already ends in `/` → `https://api.com//users`
* a URL that already has a `?` → two question marks
* a value containing a space, `&` or `/` → a corrupted, sometimes unsafe URL

The browser ships two objects that handle all of it:

```javascript
const url = new URL("https://dummyjson.com");
url.pathname = "/products";

const params = new URLSearchParams();
params.append("q", "john doe");      // encoded to john%20doe automatically
params.append("select", "title,price");
url.search = params.toString();

url.toString();
// → https://dummyjson.com/products?q=john+doe&select=title%2Cprice
```

`URLSearchParams` does the escaping, the `?`, and the `&`s for you.

### Omit-empty

A blank field should **vanish** from the URL, not appear as `&limit=`. So skip any value that is
`undefined`, `null` or `""` — while being careful to **keep `0`**, which is falsy but perfectly
meaningful (`?skip=0`).

```javascript
if (value !== undefined && value !== null && value !== "") {
  params.append(key, String(value));
}
```

✅ **Summary:** the path picks the resource, query params adjust the request, the server decides
what any of it means — and `URL` + `URLSearchParams` assemble it correctly so you never debug a
double `?` again.
