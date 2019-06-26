<template>
    <div>
        <div class="row mt-3">
            <div class="col">
                <font-awesome-icon icon="arrow-circle-left" @click="$router.push({ name: 'listArtist' })" size="2x"
                style="cursor:pointer;" />
            </div>
        </div>
        <div class="row mt-3"
        v-if="artistComputed">
            <div class="col-4">
                <div class="card text-center bg-light" style="width: 18rem;">
                    <div class="card-header">
                        <h3>{{ artistComputed.name }}</h3>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Date de naissance : {{ artistComputed.birthday }}</li>
                        <li class="list-group-item">Nationalité : {{ artistComputed.country }}</li>
                        <li class="list-group-item">Style : {{ artistComputed.style }}</li>
                    </ul>
                </div>
            </div>
            <div class="col-8">
                <table class="table table-hover table-bordered">
                    <thead class="thead-dark">
                        <tr>
                            <th class="text-center">#</th>
                            <th>Titre</th>
                            <th>Date</th>
                            <th class="text-right"><button type="submit" class="btn btn-primary" @click="$router.push({ name: 'createAlbum', params: { artist: artistComputed }})"><font-awesome-icon icon="plus" /></button></th>
                        </tr>
                    </thead>
                    <transition enter-active-class="animated fadeIn">
                        <transition-group name="animated fadeOut" tag="tbody"
                        v-if="listAlbum !== null">
                            <tr
                            v-for="(album, index) of listAlbum" :key="index">
                                <td class="text-center align-middle">{{ index }}</td>
                                <td class="align-middle">{{ album.title }}</td>
                                <td class="align-middle">{{ album.date }}</td>
                                <td class="text-right">
                                    <button type="submit" class="btn btn-primary" @click="$router.push({ name: 'updateAlbum', params: { artist: artistComputed, id: `${id}`, idAlbum: `${index}` }})"><font-awesome-icon icon="edit" /></button> <!-- mettre l'index en string en l'écrivant en interpolation, car les routes avec un Number dans l'url ça marchera pas -->
                                    <button type="submit" class="btn btn-primary ml-1" @click="deleteAlbum(id, index)"><font-awesome-icon icon="trash" /></button>
                                </td>
                            </tr>
                        </transition-group>
                    </transition>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'listAlbum',
        data: function () {
            return {
                apiURL: 'http://localhost:3000',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                listAlbum: null,
                postArtistData: null
                }
        },
        props: {
            id: String,
            artist: Object
        },
        computed: {
            artistComputed: function () {
                if(this.artist) {
                    return this.artist
                } else { 
                    this.getArtist(this.id)
                    return this.postArtistData
                }
            }
        },
        created () {
            this.getAlbums(this.id)
        },
        watch: {
            '$route': function () {
                this.getAlbums(this.id)
            }
        },
        methods: {
            // Recupere l'artiste à l'index id dans le tableau artistes
            getArtist: async function(id) {
                let response = await fetch(`${this.apiURL}/artist/${id}`)
                this.postArtistData = await response.json()
            },
            // Recupere le tableau d'albums
            getAlbums: async function(id) {
                let response = await fetch(`${this.apiURL}/artist/${id}/albums`)
                this.listAlbum = await response.json()
            },
            // Supprime l'album à l'index id dans le tableau albums
            deleteAlbum: async function(id, idAlbum) {
                let response = await fetch(`${this.apiURL}/artist/${id}/album/${idAlbum}`, { headers: this.headers, method: 'DELETE'})
                if(await response.json()) {
                    this.getAlbums(this.id)
                } else {
                    alert('La suppression a échoué')
                }
            }
        }
    }
</script>