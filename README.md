# To run the project

```
docker-compose up -d
```

Then, open a browser and navigate to

```
localhost:3000
```

# Pre-assumptions I made

To simplify the use case and to make coding less complicated, I assumes that

- When placing orders, customer is already authenticated.

No matter how many orders placed, it will come from the same customer.
So that I can push notification to the customer without having to do authentication just to differentiate each customer's request.

# Answer

I pick Nodejs because the project doesn't require doing any performance intensive operations on the backend.
Tasks are about handling HTTP requests, responding to events, and communicating with external services.
Nodejs is excellent at dealing with asynchronous tasks.

C# (.NET) is also a good alternative for handling asynchronous tasks.
It is a compiled language that offers strongly typed OOP.
The performance is on par with Nodejs.
Unlike .NET, Nodejs doesn't have type-checking feature.
Typescript, an extension language to javascript, offers a type-checking and can run inside Nodejs by transpiling the code to javascript.

Both of these languages are suitable for the project.
Though, .NET is a little more cumbersome to deploy than Nodejs because it has to run on a Windows server (IIS).

Nodejs is what I am comfortable with.
Therefore, it is the language that I choose to implement in this project.
