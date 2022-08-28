// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let newId = 1;
const PATH = "/posts"

const server = express();
// to enable parsing of json bodies for post requests
// server.use(express.json());

server.use(express.json());
// TODO: your code to handle requests

server.post(PATH, (req, res) => {
  const { author, title, contents } = req.body;

  if (!author || !title || !contents) {
    return res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para crear el Post" });
  }

  const newPost = {
    author,
    title,
    contents,
    id : newId
  }

  posts.push(newId);
  newId++

  res.json(newPost);
})

server.post(`${PATH}/author/:author`, (req, res) => {
  const { title, contents } = req.body;
  const { author } = req.params

  if (!title || !contents) {
    return res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para crear el Post" });
  }

  const newPost = {
    author,
    title,
    contents,
    id: newId
  }

  posts.push(newPost);
  newId++

  res.json(newPost);

});

server.get(PATH, (req, res) => {
  const { term } = req.query
  if (term) {
    const filtrado = posts.filter(p => p.title.includes(term) || p.contents.includes(term))
    res.json(filtrado);
  } else {
    res.json(posts);
  }
})

server.get(`${PATH}/:author`, (req, res) => {
  const { author } = req.params;

    let autores = posts.filter(p => p.author === author)
    if (autores.length > 0) {
      return res.json(autores);
    }

  res.status(STATUS_USER_ERROR).json({ error: "No existe ningun post del autor indicado" });
})

server.get(`${PATH}/:author/:title`, (req, res) => {
  const { author, title } = req.params;

  if (author && title) {
    const coincidencia = posts.filter(p => p.author.includes(author) && p.title.includes(title))
    return res.json(coincidencia);
  }

  res.status(STATUS_USER_ERROR).json({ error: "No existe ningun post con dicho titulo y autor indicado" });
})

server.put(PATH, (req, res) => {
  const { id, title, contents } = req.body;

  if (!id || !title || !contents) {
    return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
  }
})
module.exports = { posts, server };
