const express = require('express')
const cors = require('cors')
const app = express()

const JsonDB = require('node-json-db');
const JsonDBConfig = require('node-json-db/dist/lib/JsonDBConfig');

const db = new JsonDB(new JsonDBConfig.Config("CDTheque", true, true, '/'));

try {
  let artists = db.getData('/artists')
} catch (err) {
  db.push('/artists', [])
}

/*try {
  let albums = db.getData(`/artists[${req.params.id}]/albums`)
} catch (err) {
  db.push(`/artists[${req.params.id}]/albums`, [])
}*/

app.use(cors())
app.use(express.json())

// Recupere le tableau d'artistes
app.get('/artists', function (req, res) {
  try {
    res.json(db.getData('/artists'))
  } catch(err) {
    res.json(err)
  }
})

// Recupere l'artiste à l'index id dans le tableau artistes
app.get('/artist/:id', function(req, res) {
  try {
    res.json(db.getData(`/artists[${req.params.id}]`))
  } catch(err) {
    res.json(err)
  }
})

// Ajoute un artiste au tableau artiste
app.post('/artist', function(req, res) {
  try {
    db.push('/artists[]', req.body)
    res.json(db.getData('/artists[-1]')) // le -1 permet de récupérer le dernier enregistrement
  } catch(err) {
    res.json(err)
  }
})

// Modifie l'artiste à l'index id dans le tableau artistes
app.post('/artist/:id', function(req, res) {
  try {
    db.push(`/artists[${req.params.id}]`, req.body)
    res.json(db.getData(`/artists[${req.params.id}]`))
  } catch(err) {
    res.json(err)
  }
})

// Supprime l'artiste à l'index id dans le tableau artistes
app.delete('/artist/:id', function(req, res) {
  try {
    db.delete(`/artists[${req.params.id}]`)
    res.json(true)
  } catch(err) {
    res.json(err)
  }
})

// Recupere le tableau d'albums
app.get('/artist/:id/albums', function (req, res) {
  try {
    res.json(db.getData(`/artists[${req.params.id}]/albums`))
  } catch (err) {
    res.json(err)
  }
})

// Recupere l'album à l'index id dans le tableau albums
app.get('/artist/:id/album/:idAlbum', function (req, res) {
  try {
    res.json(db.getData(`/artists[${req.params.id}]/albums[${req.params.idAlbum}]`))
  } catch (err) {
    res.json(err)
  }
})

// Ajoute un album au tableau album
app.post('/artist/:id/album', function (req, res) {
  try {
    db.push(`/artists[${req.params.id}]/albums[]`, req.body)
    res.json(db.getData(`/artists[${req.params.id}]/albums[-1]`))
  } catch (err) {
    res.json(err)
  }
})

// Modifie l'album à l'index id dans le tableau albums
app.post('/artist/:id/album/:idAlbum', function (req, res) {
  try {
    db.push(`/artists[${req.params.id}]/albums[${req.params.idAlbum}]`, req.body)
    res.json(db.getData(`/artists[${req.params.id}]/albums[${req.params.idAlbum}]`))
  } catch (err) {
    res.json(err)
  }
})

// Supprime l'album à l'index id dans le tableau albums
app.delete('/artist/:id/album/:idAlbum', function (req, res) {
  try {
    db.delete(`/artists[${req.params.id}]/albums[${req.params.idAlbum}]`)
    res.json(true)
  } catch (err) {
    res.json(err)
  }
})

app.listen(3000, function () {
  console.log('CDTheque app listening on port 3000!')
})
