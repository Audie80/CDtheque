import Vue from 'vue';
import Router from 'vue-router';
import method from './components/artist/method.vue';
import createArtist from './components/artist/createArtist.vue';
import listArtist from './components/artist/listArtist.vue';
import listAlbum from './components/album/listAlbum.vue';
import createAlbum from './components/album/createAlbum.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/method',
      name: 'method',
      component: method
    },
    {
      path: '/artist',
      name: 'createArtist',
      component: createArtist
    },
    {
      path: '/artist/:id',
      name: 'updateArtist',
      component: createArtist,
      props: true
    },
    {
      path: '/',
      name: 'listArtist',
      component: listArtist
    },
    {
      path: '/artist/:id/albums',
      name: 'listAlbum',
      component: listAlbum,
      props: true
    },
    {
      path: '/artist/:id/album',
      name: 'createAlbum',
      component: createAlbum,
      props: true
    },
    {
      path: '/artist/:id/album/:idAlbum',
      name: 'updateAlbum',
      component: createAlbum,
      props: true
    }
  ],
});
