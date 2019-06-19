<template>
    <div>
        <table class="table table-hover table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th class="text-center">#</th>
                    <th>Nom</th>
                    <th>Date de naissance</th>
                    <th>Nationalité</th>
                    <th>Style</th>
                    <th class="text-right"><button type="submit" class="btn btn-primary" @click="$router.push({ name: 'createArtist'})"><font-awesome-icon icon="plus" /></button></th>
                </tr>
            </thead>
            <transition enter-active-class="animated fadeIn">
                <transition-group name="animated fadeOut" tag="tbody"
                v-if="listArtist !== null">
                    <tr
                    v-for="(artist, index) of listArtist" :key="artist.name" @click="$router.push({ name: 'listAlbum', params: { id: `${index}`, artist: artist }})">
                        <td class="text-center align-middle">{{ index }}</td>
                        <td class="align-middle">{{ artist.name }}</td>
                        <td class="align-middle">{{ artist.birthday }}</td>
                        <td class="align-middle">{{ artist.country }}</td>
                        <td class="align-middle">{{ artist.style }}</td>
                        <td class="text-right">
                            <button type="submit" class="btn btn-primary" @click.stop="$router.push({ name: 'updateArtist', params: { id: `${index}` }})"><font-awesome-icon icon="edit" /></button> <!-- mettre l'index en string en l'écrivant en interpolation, car les routes avec un Number dans l'url ça marchera pas -->
                            <button type="submit" class="btn btn-primary ml-1" @click.stop="deleteArtist(index)"><font-awesome-icon icon="trash" /></button>
                        </td>
                    </tr>
                </transition-group>
            </transition>
        </table>
    </div>
</template>

<style scoped>
    tbody tr {
        cursor: pointer;
    }
</style>

<script>
    export default {
        name: 'listArtist',
        data: function () {
            return {
                apiURL: 'http://localhost:3000',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                listArtist: null
            }
        },
        created () {
            this.getArtists()
        },
        watch: {
            '$route': function () {
                this.getArtists()
            }
        },
        methods: {
            // Recupere le tableau d'artistes
            getArtists: async function() {
                let response = await fetch(`${this.apiURL}/artists`)
                this.listArtist = await response.json()
            },
            // Supprime l'artiste à l'index id dans le tableau artistes
            deleteArtist: async function(id) {
                let response = await fetch(`${this.apiURL}/artist/${id}`, { headers: this.headers, method: 'DELETE'})
                if(await response.json()) {
                    this.getArtists()
                } else {
                    alert('La suppression a échoué')
                }
            }
        }
    }
</script>