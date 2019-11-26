<template>

  <div class="cuerpos">
        <nav>
    <div class="nav-wrapper">
      <a href="#!" class="brand-logo">InterLogo</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul class="right hide-on-med-and-down">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">Javascript</a></li>
        <li><a href="mobile.html">Mobile</a></li>
      </ul>
    </div>
  </nav>

  <ul class="sidenav" id="mobile-demo">
    <li><a href="sass.html">Sass</a></li>
    <li><a href="badges.html">Components</a></li>
    <li><a href="collapsible.html">Javascript</a></li>
    <li><a href="mobile.html">Mobile</a></li>
  </ul>

  <div class="container">
      <h1>Items</h1>
  <input class="" type="text" placeholder="buscar" v-on:keyup.enter="paginate" v-model="busqueda">
  <table id="" class="table table-hover" >
      <thead>
          <tr>
              <th>ID</th>
              <th>Item Name</th>
              <th>Poblacion</th>
              <th>Saldo</th>
          </tr>
      </thead>

      <tbody>
          <tr>
              <td>
              </td>
              <td> <input class="" type="text" placeholder="Name" v-model="username">
              </td>
              <td> <input class="" type="text" placeholder="Poblacion" v-model="userpoblacion">
              </td>
              <td> <input class="" type="text" placeholder="saldo" v-model="usersaldo">
              </td>
              <td> <button v-if="this.isEdit == false" v-on:click="save()" >Save</button>
                <button v-else 
                  type="button"
                  v-on:click="updateUser()"
                  class="">Update</button></td>
          </tr>
          <tr v-for="item in items" :key="item._id">
              <td>{{ item.id }}</td>
              <td>{{ item.nombre }}</td>
              <td>{{ item.poblacion }}</td>
              <td>{{ item.saldo }}</td>
              <td>
                      <button
                      v-on:click="editUser(item.id,item.nombre,item.poblacion,item.saldo)"
                      class="">Edit</button>
                    <button v-on:click="deleteUser(item.id)" class="">Delete</button>
              </td>

          </tr>
      </tbody>
       

  </table>
     
        
      

      
  </div>
 <div style="display:flex; width:100%; justify-content:center">
  <a href="" v-for="pageNumber in pages" @click.stop.prevent="paginate(pageNumber)" :key="pageNumber" 
  style="padding:20px;background-color:red;color:white">
    {{pageNumber}}</a>
  </div>
      
  </div>
        
                
      
</template>
 
<script>
export default {
    
   data () {
     return {
            message: 'Hello Vue!',
            items: [],
            busqueda: '',
            username: '',
            userpoblacion: '',
            usersaldo: '',
            saldos:[0],
            isEdit: false,
            page: 1,
      perPage: 4,
      pages: [],
      numeroRegistros:null,
      pageNumber:1,
      
      
        
     };
        },
        mounted() {
      M.AutoInit();
      document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
  });
    },

    created: function()  {
      this.listar();

      
      
  },
    methods: {
      listar () {
          this.axios.get('http://173.249.39.9:3000/api/listado')
              .then(res => {
                  this.items = res.data
                  
              })
      },
      buscar () {
          if (this.busqueda != '') {
              this.axios.get('http://173.249.39.9:3000/api/buscar/' + this.busqueda)
                  .then(res => {
                      this.items = res.data
                  })
          } else {
              this.axios.get('http://173.249.39.9:3000/api/listado')
                  .then(res => {
                      this.items = res.data
                  })
          }
               
      },
      save () {
          
      this.axios
          .post("http://173.249.39.9:3000/api/crear", {
              name: this.username,
              poblacion: this.userpoblacion,
              saldo: this.usersaldo
          })
          .then(res => {
              this.username = "";
              this.userpoblacion = "";
              this.usersaldo = null;
              this.listar();
              
          })
          .catch(function (error) {
              console.log(error);
          });


      },
      editUser (id, title, pueblo,saldo) {
          this.id = id;
          this.username = title;
          this.userpoblacion = pueblo;
          this.usersaldo = saldo;
          this.isEdit = true;
      },
      updateUser  (){
        this.axios
            .put(`http://173.249.39.9:3000/api/modificar/${this.id}`, {
            nombre: this.username,
            poblacion: this.userpoblacion,
            saldo: this.usersaldo
            })
            .then(res => {
            this.username = "";
            this.userpoblacion = "";
            this.usersaldo = null;
            this.isEdit = false;
            this.listar();
            
            })
            .catch(err => {
            console.log(err);
            });
      },
      deleteUser (id){
          this.axios
            .delete(`http://173.249.39.9:3000/api/borrar/${id}`)
            .then(res => {
            this.username = "";
            this.listar();
            console.log(res);
            })
            .catch(err => {
            console.log(err);
            });
          },
       paginate(paNumber) {
      this.page = paNumber;
      let perPage = this.perPage;
      let from =((this.page * this.perPage) - this.perPage) || 0;
      let to = (from * this.perPage);
        if (this.busqueda != ''){
           this.axios.get(`http://173.249.39.9:3000/api/intervalo/${perPage}/${from}/${this.busqueda}`)
              .then(res => {
                  this.items = res.data
                  
              })
        }else {
          console.log(perPage+'llegado a precliente'+from)
         this.busqueda='all';
           this.axios.get(`http://173.249.39.9:3000/api/intervalo/${perPage}/${from}/${this.busqueda}`)
                  .then(res => {
                      this.items = res.data
                      console.log('lleado a cliente')
                  })
          }
    },
    numerodeUsuarios() {
          this.axios.get('http://173.249.39.9:3000/api/totalNumeroRegistros')
              .then(res => {

                  this.numeroRegistros = res.data;
                 return this.numeroRegistros[0].total;
                  console.log('numerazo'+this.numeroRegistros[0].total)
                  
              }).then(res =>{
                this.numberOfPages =Math.ceil((res/ this.perPage));
                console.log('numerito de reigtros'+res);
                console.log('numeritaa de paginas'+this.numberOfPages)
                this.pages=[];
      for (let i = 1; i <= this.numberOfPages; i++) {
        this.pages.push(i);
      }
              })
}
  },
  watch: {
    items(){
      this.numerodeUsuarios();
    }
  },
  computed: {
    displayedArticles: function () {
      return this.paginate(this.items)},
     
     } ,  
    
    
            
       
         
}
</script>
 


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
::placeholder {
  color: rgb(233, 146, 146);
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
 color: rgb(223, 132, 132);
}

::-ms-input-placeholder { /* Microsoft Edge */
 color: rgb(233, 146, 146);
}
a:hover{
  background-color: black !important;
}
</style>
