<template>
  <v-container>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="agregarPalabras()"
    >
      <v-text-field
        v-model="atributos.palabra1"
        :counter="20"
        label="Palabra 1"
        required
      ></v-text-field>
      <v-text-field
        v-model="atributos.palabra2"
        :counter="20"
        label="Palabra 2"
        required
      ></v-text-field>

      <v-btn color="success" class="mr-4" type="submit"> Enviar </v-btn>
      <!-- <v-btn color="error" class="mr-4"> Limpiar </v-btn> -->
    </v-form>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      Atributos: [],
      atributos: {
        palabra1: "",
        palabra2: "",
      },
    };
  },
  methods: {
    agregarPalabras() {
      console.log(this.atributos);
      if (!this.atributos.palabra1 || !this.atributos.palabra2) {
        this.$swal("¡Error!", "Falta agregar una palabra", "error");
      } else {
        this.axios
          .post("/words", this.atributos)
          .then((res) => {
            this.Atributos.push(res.data);
            this.$swal("¡Exitoso!", "Registro Exitoso", "success");

            this.Atributos.palabra1 = "";
            this.Atributos.palabra2 = "";
            //   alert('registro agregado')
            this.$router.push("/tabla");
          })
          .catch((e) => {
            console.log(e.response);
            alert("Error al guardar");
          });
      }
    },
  },
};
</script>