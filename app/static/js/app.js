/* Add your Application JavaScript */
const app = Vue.createApp({
  components: {
    'home': Home,
    'news-list': NewsList
  },
  data() {
    return {
      welcome: 'Hello World! Welcome to VueJS'
    }
  }
});

const Home = app.component('home', {
  name: 'Home',
  template: `
    <div class="home">
      <img src="/static/images/logo.png" alt="VueJS Logo">
      <h1>{{ welcome }}</h1>
    </div>
  `,
  data() {
    return {
      welcome: 'Hello World! Welcome to VueJS'
    }
  }
});

app.use(router);
app.mount('#app');

app.component('app-header', {
  name: 'AppHeader',
  template: `
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <a class="navbar-brand" href="#">VueJS App</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link to="/" class="nav-link"> Home </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/news" class="nav-link"> News </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>    
  `,
  data: function() {
    return {};
  }
});

app.component('app-footer', {
  name: 'AppFooter',
  template: `
      <footer>
          <div class="container">
            <p>Copyright &copy {{ year }} Flask Inc.</p>
          </div>
      </footer>
  `,
  data: function() {
      return {
        year: (new Date).getFullYear()
      }
  }
});

const NewsList = app.component('news-list', {
  name: 'NewsList',
  template: `
    <div class="news">
      <h2>News</h2>
      <div class="form-inline d-flex justify-content-center">
        <div class="form-group mx-sm-3 mb-2">
          <label class="sr-only" for="search"> Search </label>
          <input type="search" name="search" v-model="searchTerm"
            id="search" class="form-control mb-2 mr-sm-2" placeholder="Enter search term here"
          />
          <button class="btn btn-primary mb-2"
          @click="searchNews">Search</button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 mb-5" v-for="article in articles"> 
          <div class="card h-100 erri_">
            <h5 class="card-title title_">{{ article.title }}</h5>
            <div class="card-body">
              <img class="img-fluid" v-bind:src= article.urlToImage  alt="Photo related to the news.">
              <p class="card-text">{{ article.description }}</p>
              <p class="card-text"><small class="text-muted">{{ article.publishedAt }}</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  created() {
    let self = this;
    fetch('https://newsapi.org/v2/top-headlines?country=us', {
      headers: {
        'Authorization': 'Bearer <api-token>'
      }
    }).then(function(response){
      return response.json();
    }).then(function(data){
      console.log(data);
      self.articles = data.articles;
    });
  },
  data() {
    return {
      articles: [],
      searchTerm: ''
    }
  },
  methods: {
    searchNews() {
      let self = this;
      fetch('https://newsapi.org/v2/everything?q=' + self.searchTerm + '&language=en', {
              headers: {
                'Authorization': 'Bearer <api-token>'
              }
            }).then(function(response) {
              return response.json();
            }).then(function(data) {
              console.log(data);
              self.articles = data.articles;
            });
    }
  }
});

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home, },
    { path: '/news', name: 'NewsList', component: NewsList }
  ]
});