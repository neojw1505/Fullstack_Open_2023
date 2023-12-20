const express = require("express");
const morgan = require('morgan')
const app = express();

const requestLogger = (request, response, next) => {
    console.log("Method:", request.method);
    console.log("Path:  ", request.path);
    console.log("Body:  ", request.body);
    console.log("---");
    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

morgan.token('request-body', function(req){
    if (req.method === "POST") {
        return JSON.stringify(req.body);
    }
})
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens['request-body'](req, res)
    ].join(' ')
  }))
app.use(express.json());
// app.use(requestLogger);



let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  console.log(persons);
  response.json(persons);
});

app.get("/info", (request, response) => {
  let date = new Date();
  const info = `<p>Phonebook has info for 2 people <br/><br/> ${date}</p>`;

  response.send(info);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);
  console.log(persons);
  response.status(204).end();
});

const generateId = () => {
  const maxId = Math.max(...persons.map((p) => p.id));
  return maxId + 1;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const existingPerson = persons.find((p) => p.name === body.name);
  console.log("person exists", existingPerson);
  if (!body.name || existingPerson) {
    return response.status(404).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  console.log(persons);

  response.json(person);
});


app.use(unknownEndpoint);

const PORT = 3002;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
