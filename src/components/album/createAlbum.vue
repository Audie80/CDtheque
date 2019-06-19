<template>
    <div>
        <div class="row mt-3">
            <div class="col">
                <font-awesome-icon icon="arrow-circle-left" @click="$router.push({ name: 'listAlbum', params: ({ artist: artist }) })" size="2x"
                style="cursor:pointer;" />
            </div>
        </div>
        <div class="row mt-3">
            <div class="col">
                <transition enter-active-class="animated fadeIn">
                    <div class="card bg-light"
                    v-show="show">
                        <div class="card-header">
                            <h2>{{ title }}</h2>
                        </div>
                        <div class="card-body">
                            <form @submit.prevent>
                                <div class="form-group row">
                                    <label for="name" class="col-sm-3 col-form-label">Titre : </label>
                                    <div class="col-sm-9">
                                        <input type="text" name="name" class="form-control" v-model.trim="postAlbumData.title" />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="image" class="col-sm-3 col-form-label">Photo : </label>
                                    <div class="col-sm-9">
                                        <input type="file" name="image" accept="image/jpeg" class="form-control-file" />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="birthday" class="col-sm-3 col-form-label">Date : </label>
                                    <div class="col-sm-9">
                                        <input type="date" name="birthday" class="form-control" v-model="postAlbumData.date" />
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary" :disabled="postAlbumData.title == null" @click="postAlbum(id)"
                                v-if="!idAlbum">Créer l'album</button>
                                <button type="submit" class="btn btn-primary" @click="updateAlbum(id, idAlbum)"
                                v-if="idAlbum">Mettre à jour l'album</button>
                            </form>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'createAlbum',
        data: function () {
            return {
                apiURL: 'http://localhost:3000',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                postAlbumData: {
                    title: null,
                    date: null
                },
                show: false //data pour animation
            }
        },
        props: {
            id: String,
            idAlbum: String,
            artist: Object
        },
        computed: {
            title: function () {
                if (this.idAlbum) {
                    return `Mettre à jour un album`
                } else {
                    return `Ajouter un album`
                }
            }
        },
        created () {
            if (this.idAlbum) {
                this.getAlbum(this.id, this.idAlbum)
            }
        },
        mounted () {
            this.show = true //animation quand mode Create
        },
        updated () {
            this.show = true //animation quand mode Update
        },
        watch: {
            '$route': function () {
                if (this.idAlbum) {
                this.getAlbum(this.id, this.idAlbum)
                }
                this.show = false
            }
        },
        methods: {
            // Ajoute un album au tableau albums
            postAlbum: async function(id) {
                let response = await fetch(`${this.apiURL}/artist/${id}/album`, { 
                    headers: this.headers,
                    method: 'POST',
                    body: JSON.stringify({ 
                        title: this.postAlbumData.title,
                        date: this.postAlbumData.date
                        })
                    })
                this.$router.push({ name: 'listAlbum', params: ({ artist: this.artist }) })
            },
            // Recupere l'album à l'index id dans le tableau albums
            getAlbum: async function(id, idAlbum) {
                let response = await fetch(`${this.apiURL}/artist/${id}/album/${idAlbum}`)
                this.postAlbumData = await response.json()
            },
            // Modifie l'album à l'index id dans le tableau albums
            updateAlbum: async function(id, idAlbum) {
                let response = await fetch(`${this.apiURL}/artist/${id}/album/${idAlbum}`, { 
                    headers: this.headers,
                    method: 'POST',
                    body: JSON.stringify({ 
                        title: this.postAlbumData.title,
                        date: this.postAlbumData.date
                        }) 
                    })
                this.$router.push({ name: 'listAlbum', params: ({ artist: this.artist }) })
            }
        }
    }
</script>
    