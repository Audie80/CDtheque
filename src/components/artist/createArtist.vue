<template>
    <div>
        <div class="row mt-3">
            <div class="col">
                <font-awesome-icon icon="arrow-circle-left" @click="$router.push({ name: 'listArtist' })" size="2x"
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
                                    <label for="name" class="col-sm-3 col-form-label">Nom : </label>
                                    <div class="col-sm-9">
                                        <input type="text" name="name" class="form-control" v-model.trim="postArtistData.name" />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="image" class="col-sm-3 col-form-label">Photo : </label>
                                    <div class="col-sm-9">
                                        <input type="file" name="image" accept="image/jpeg" class="form-control-file" />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="birthday" class="col-sm-3 col-form-label">Date de naissance : </label>
                                    <div class="col-sm-9">
                                        <input type="date" name="birthday" class="form-control" v-model.trim="postArtistData.birthday" />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="country" class="col-sm-3 col-form-label">Nationalité : </label>
                                    <div class="col-sm-9">
                                        <input type="text" name="country" class="form-control" v-model="postArtistData.country" />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="style" class="col-sm-3 col-form-label">Style de musique : </label>
                                    <div class="col-sm-9">
                                        <select id="style" class="form-control" v-model="postArtistData.style" >
                                            <option value="">--Style--</option>
                                            <option value="Pop">Pop</option>
                                            <option value="Rock">Rock</option>
                                            <option value="Variété">Variété</option>
                                            <option value="Rap">Rap</option>
                                            <option value="Classique">Classique</option>
                                            <option value="Métal">Métal</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary" :disabled="postArtistData.name == null" @click="postArtist"
                                v-if="!id">Créer l'artiste</button>
                                <button type="submit" class="btn btn-primary" @click="updateArtist(id)"
                                v-if="id">Mettre à jour l'artiste</button>
                                
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
        name: 'createArtist',
        data: function () {
            return {
                apiURL: 'http://localhost:3000',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                postArtistData: {
                    name: null,
                    birthday: null,
                    country: null,
                    style: null
                },
                show: false //data pour animation
            }
        },
        props: {
            id: String
        },
        computed: {
            title: function () {
                if (this.id) {
                    return `Mettre à jour un artiste`
                } else {
                    return `Ajouter un artiste`
                }
            }
        },
        created () {
            if (this.id) {
                this.getArtist(this.id)
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
                if (this.id) {
                this.getArtist(this.id)
                }
                this.show = false
            }
        },
        methods: {
            // Ajoute un artiste au tableau artistes
            postArtist: async function() {
                let response = await fetch(`${this.apiURL}/artist`, { 
                    headers: this.headers,
                    method: 'POST',
                    body: JSON.stringify({ 
                        name: this.postArtistData.name,
                        birthday: this.postArtistData.birthday,
                        country: this.postArtistData.country,
                        style: this.postArtistData.style
                        })
                    })
                this.$router.push({ name: 'listArtist'})
            },
            // Recupere l'artiste à l'index id dans le tableau artistes
            getArtist: async function(id) {
                let response = await fetch(`${this.apiURL}/artist/${id}`)
                this.postArtistData = await response.json()
            },
            // Modifie l'artiste à l'index id dans le tableau artistes
            updateArtist: async function(id) {
                let response = await fetch(`${this.apiURL}/artist/${id}`, { 
                    headers: this.headers,
                    method: 'POST',
                    body: JSON.stringify({ 
                        name: this.postArtistData.name,
                        birthday: this.postArtistData.birthday,
                        country: this.postArtistData.country,
                        style: this.postArtistData.style,
                        albums: []
                        }) 
                    })
                this.$router.push({ name: 'listArtist'})
            }
        }
    }
</script>