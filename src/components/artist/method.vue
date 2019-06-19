<template>
  <div>
    <div class="card my-3">
      <div class="card-header">
        <h5 class="card-title">getArtists</h5>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col">
            <button class="btn btn-block btn-primary" @click="getArtists">getArtists</button>
          </div>
          <div class="col">
              <code><pre>{{ getArtistsData.result }}</pre></code>
          </div>
        </div>
      </div>
    </div>
    <div class="card my-3">
      <div class="card-header">
        <h5 class="card-title">getArtist</h5>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col">
            <input type="number" class="form-control mb-2" v-model="getArtistData.id" />
            <button class="btn btn-primary btn-block" @click="getArtist(getArtistData.id)">getArtist({{ getArtistData.id }})</button>
          </div>
          <div class="col">
            <code><pre>{{ getArtistData.result }}</pre></code>
          </div>
        </div>
      </div>
    </div>
    <div class="card my-3">
      <div class="card-header">
        <h5 class="card-title">postArtist</h5>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col">
            <input type="text" class="form-control mb-2" v-model="postArtistData.name" />
            <button class="btn btn-primary btn-block" @click="postArtist">postArtist</button>
          </div>
          <div class="col">
            <code><pre>{{ postArtistData.result }}</pre></code>
          </div>
        </div>
      </div>
    </div>
    <div class="card my-3">
      <div class="card-header">
        <h5 class="card-title">updateArtist</h5>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col">
            <input type="text" class="form-control mb-2" v-model="updateArtistData.name" />
            <input type="number" class="form-control mb-2" v-model="updateArtistData.id" />
            <button class="btn btn-primary btn-block" @click="updateArtist(updateArtistData.id)">updateArtist({{ updateArtistData.id }})</button>
          </div>
          <div class="col">
            <code><pre>{{ updateArtistData.result }}</pre></code>
          </div>
        </div>
      </div>
    </div>
    <div class="card my-3">
      <div class="card-header">
        <h5 class="card-title">deleteArtist</h5>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col">
            <input type="number" class="form-control mb-2" v-model="deleteArtistData.id" />
            <button class="btn btn-primary btn-block" @click="deleteArtist(deleteArtistData.id)">deleteArtist({{ deleteArtistData.id }})</button>
          </div>
          <div class="col">
            <code><pre>{{ deleteArtistData.result }}</pre></code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'method',
  data: function () {
    return {
      getArtistsData: {
        result: null
      },
      getArtistData: {
        id: 0,
        result: null
      },
      postArtistData: {
        name: '',
        result: null
      },
      updateArtistData: {
        id: 0,
        name: '',
        result: null
      },
      deleteArtistData: {
        id: 0,
        result: null
      },
      getAlbumsData: {
        result: null
      },
      getAlbumData: {
        id: 0,
        result: null
      },
      postAlbumData: {
        name: '',
        result: null
      },
      updateAlbumData: {
        id: 0,
        name: '',
        result: null
      },
      deleteAlbumData: {
        id: 0,
        result: null
      },
      apiURL: 'http://localhost:3000',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }
  },
  methods: {
    // Recupere le tableau d'artistes
    getArtists: async function() {
      let response = await fetch(`${this.apiURL}/artists`)
      this.getArtistsData.result = await response.json()
    },
    // Recupere l'artiste à l'index id dans le tableau artistes
    getArtist: async function(id) {
      let response = await fetch(`${this.apiURL}/artist/${id}`)
      this.getArtistData.result = await response.json()
    },
    // Ajoute un artiste au tableau artistes
    postArtist: async function() {
      let response = await fetch(`${this.apiURL}/artist`, { headers: this.headers, method: 'POST', body: JSON.stringify({ name: this.postArtistData.name }) })
      this.postArtistData.result = await response.json()
    },
    // Modifie l'artiste à l'index id dans le tableau artistes
    updateArtist: async function(id) {
      let response = await fetch(`${this.apiURL}/artist/${id}`, { headers: this.headers, method: 'POST', body: JSON.stringify({ name: this.updateArtistData.name }) })
      this.updateArtistData.result = await response.json()
    },
    // Supprime l'artiste à l'index id dans le tableau artistes
    deleteArtist: async function(id) {
      let response = await fetch(`${this.apiURL}/artist/${id}`, { headers: this.headers, method: 'DELETE'})
      this.deleteArtistData.result = await response.json()
    },
    // Recupere le tableau d'albums
    getAlbums: async function(id) {
      let response = await fetch(`${this.apiURL}/artist/${id}/albums`)
      this.getAlbumsData.result = await response.json()
    },
    // Recupere l'album à l'index id dans le tableau albums
    getAlbum: async function(id, idAlbum) {
      let response = await fetch(`${this.apiURL}/artist/${id}/album/${idAlbum}`)
      this.getAlbumData.result = await response.json()
    },
    // Ajoute un album au tableau albums
    postAlbum: async function(id) {
      let response = await fetch(`${this.apiURL}/artist/${id}/album`, { headers: this.headers, method: 'POST', body: JSON.stringify({ name: this.postArtistData.name }) })
      this.postAlbumData.result = await response.json()
    },
    // Modifie l'album à l'index id dans le tableau albums
    updateAlbum: async function(id, idAlbum) {
      let response = await fetch(`${this.apiURL}/artist/${id}/album/${idAlbum}`, { headers: this.headers, method: 'POST', body: JSON.stringify({ name: this.updateArtistData.name }) })
      this.updateAlbumData.result = await response.json()
    },
    // Supprime l'album à l'index id dans le tableau albums
    deleteAlbum: async function(id, idAlbum) {
      let response = await fetch(`${this.apiURL}/artist/${id}/album/${idAlbum}`, { headers: this.headers, method: 'DELETE'})
      this.deleteAlbumData.result = await response.json()
    }
  }
}
</script>
