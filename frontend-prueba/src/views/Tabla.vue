<template>
  <div class="container">
    <form @submit.prevent="editarPalabras(palabraEditar)" v-if="editar">
      <h3>Editar Palabra</h3>

      <input
        type="text"
        class="form-control my-2"
        placeholder="Palabra 1"
        v-model="palabraEditar.palabra1"
      />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Palabra 2"
        v-model="palabraEditar.palabra2"
      />
      <button class="btn btn-success my-2 mx-2" type="submit">Editar</button>
      <button class="btn btn-danger my-2" type="submit" @click="editar = false">
        Cancelar
      </button>
    </form>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Palabra 1</th>
          <th scope="col">Palabra 2</th>
          <th scope="col">Anagramas?</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in palabras" :key="index">
          <td scope="row">{{ item.palabra1 }}</td>
          <td>{{ item.palabra2 }}</td>
          <td>{{ anagrama(item.palabra1, item.palabra2) }}</td>
          <td>
            <button
              class="btn btn-danger mx-2"
              @click="eliminarPalabras(item._id)"
            >
              Eliminar
            </button>
            <button
              class="btn btn-warning mx-2"
              @click="activarEdicion(item._id)"
            >
              Editar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      palabras: [],
      editar: false,
      palabraEditar: {
        palabra1: "",
        palabra2: "",
      },
    };
  },

  created() {
    this.listarPalabras();
  },

  methods: {
    listarPalabras() {
      this.axios
        .get("/words")
        .then((res) => {
          console.log(res.data);
          this.palabras = res.data;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    //funcion para comparar las 2 palabras si son anagramas o no
    anagrama(palabra1, palabra2) {
      if (palabra1.length == palabra2.length) {
        if (palabra1.toLowerCase().split("").sort().join()) {
          return "✅";
        } else {
          return "❌";
        }
      } else {
        return "❌";
      }
    },
    eliminarPalabras(id) {
      this.$swal("¡Ok!", "Haz eliminado con exito", "error");

      this.axios
        .delete(`/words/${id}`)
        .then((res) => {
          const index = this.palabras.findIndex(
            (item) => item._id === res.data._id
          );
          this.palabras.splice(index, 1);
          // this.$router.push("/register");
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    activarEdicion(id) {
      this.editar = true;
      this.axios
        .get(`/words/${id}`)
        .then((res) => {
          this.palabraEditar = res.data;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    editarPalabras(item) {
      if (!this.palabraEditar.palabra1 || !this.palabraEditar.palabra2) {
        this.$swal("¡Error!", "Falta agregar una palabra", "error");
      } else {     
        this.axios
          .put(`/words/${item._id}`, item)
          .then((res) => {
            this.$swal("¡Update!", "Actualizado Correctamente", "success");
            this.close();
            const index = this.palabras.findIndex((n) => n._id === res.data._id);
            this.palabras[index].palabra1 = res.data.palabra1;
            this.palabras[index].palabra2 = res.data.palabra2;
            this.$router.push("/register");
            this.editar = false;
          })
          .catch((e) => {
            console.log(e.response);
          });
      }
    },
  },
};
</script>