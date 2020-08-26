"use strict";
const express = require("express");
const routes = express.Router();

const movies = [
  {
    id: 1,
    title: "Lion King",
    year: 1990,
    animated: true,
  },
  {
    id: 2,
    title: "The Mask",
    year: 1993,
    animated: false,
  },
  {
    id: 3,
    title: "Kung Pow",
    year: 2002,
    animated: false,
  },
  {
    id: 4,
    title: "Paprika",
    year: 2008,
    animated: true,
  },
];
let nextId = 5;

// GET /movies - respond with a JSON array of movies
routes.get("/movies", (req, res) => {
  res.json(movies);
});
// :id is a path parameter
routes.get("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);
  //   below is the 404 response
  if (movie) {
    res.json(movie);
  } else {
    res.status(404);
    res.send(`No movie with id ${id} exists.`);
  }
  //   above is the 404 response
  res.json(movie);
});
//
routes.post("/movies", (req, res) => {
  const movie = req.body;
  movie.id = nextId++;
  movies.push(movie);

  res.status(201);
  res.json(movie);
});
//
routes.delete("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = movies.findIndex((movie) => movie.id === id);
  if (index !== -1) {
    movies.splice(index, 1);
  }
  res.status(204);
  // u always need to send something
  res.send();
});
//
//
//
// export routes for use in server.js
module.exports = routes;
