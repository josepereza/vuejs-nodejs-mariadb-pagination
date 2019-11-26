<template>

  <div class="cuerpo">
        <nav>
    <div class="nav-wrapper">
      <a href="#!" class="brand-logo">Logo</a>
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
  <input class="" type="text" placeholder="buscar" v-on:keyup.enter="buscar" v-model="busqueda">
  <table id="" class="table table-hover" >
      <thead>
          <tr>
              <td>ID</td>
              <td>Item Name</td>
              <td>Poblacion</td>
              <td>Saldo</td>
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
            isEdit: false
     }  
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
        
            
        }
}
</script>
 


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");


</style>
