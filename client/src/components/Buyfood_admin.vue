<template>
  <v-container>
    <div style="line-height: 32pt" class="columns">
      <div class="is-3 column">
        <div class="title_head">Food & Beverage</div>
        <div class="title_sub">อาหาร และเครื่องดื่ม</div>
      </div>
      <div class="column pt-5" style="text-align: left">
        <img
          style="width: 40px; height: 40px"
          src="../assets/plus.png"
          alt=""
          @click="isopen"
        />
      </div>
    </div>
    <hr />
    <div class="is-multiline columns">
      <div
        v-for="food in food"
        :key="food.food_id"
        class="column is-one-quarter mt-5"
      >
        <div class="card admin_card mx-6 my-6">
          <figure class="image">
            <img
              v-bind:src="imagePath(food.food_image)"
              style="height: 250px"
              alt="Placeholder image"
            />
          </figure>
          <div class="card-content">
            <div style="font-size: 18px">{{ food.food_name }}</div>
            <div style="font-size: 23px">{{ food.food_price }} บาท</div>
          </div>
          <footer class="card-footer" style="background-color: white">
            <div
              style="width: 50%; color: #fd7014"
              @click="edit(food.food_id)"
              class="card-footer-item"
            >
              Edit
            </div>
            <div
              style="width: 50%; color: #fd7014"
              @click="remove(food.food_id)"
              class="card-footer-item"
            >
              Delete
            </div>
          </footer>
        </div>
      </div>
    </div>

    <!-- add modal -->
    <div class="modal" :class="{ 'is-active': add_isopen }">
      <div class="modal-background"></div>
      <div class="modal-card modal-card_admin">
        <header
          class="modal-card-head has-background-black"
          style="border-style: hidden"
        >
          <span class="modal-card-title pl-3 py-1" style="text-align: left"
            ><img src="../assets/Logo.png" class="logo_card"
          /></span>
          <button class="delete" aria-label="close" @click="addc"></button>
        </header>

        <section class="modal-card-body profile_modal">
          <p
            class="regis_txt pb-3"
            style="text-decoration: none; font-size: 30px"
          >
            Add Food & Beverage
          </p>
          <div class="columns">
            <div class="column is-3" style="text-align: right">
              <p class="profile_modal_txt py-2">Picture :</p>
              <p class="profile_modal_txt py-4">Name :</p>
              <p class="profile_modal_txt py-4">Price :</p>
            </div>

            <div class="column pr-6 is-8">
              <v-form ref="form">
                <v-file-input
                  v-model="pic"
                  truncate-length="15"
                  label="picture"
                  rounded
                  dense
                  solo
                  :rules="[() => !!pic || 'This field is required']"
                >
                </v-file-input>

                <v-text-field
                  v-model="name"
                  label="name"
                  rounded
                  dense
                  solo
                  :rules="[() => !!name || 'This field is required']"
                ></v-text-field>

                <v-text-field
                  v-model="price"
                  label="price"
                  rounded
                  dense
                  solo
                  :rules="foodrule"
                ></v-text-field>
              </v-form>
            </div>
          </div>
        </section>

        <footer
          class="modal-card-foot has-background-black"
          style="border-style: hidden"
        >
          <div style="margin: auto">
            <button
              style="
                background-color: #fd7014;
                border-style: hidden;
                color: white;
              "
              class="button mx-3"
              @click="createFood"
            >
              ADD
            </button>
            <button
              style="
                background-color: #222831;
                border-style: hidden;
                color: white;
              "
              class="button mx-3"
              @click="addc"
            >
              CANCEL
            </button>
          </div>
        </footer>
      </div>
    </div>
    <!-- add modal -->

    <!-- edit modal -->
    <div class="modal" :class="{ 'is-active': edit_isopen }">
      <div class="modal-background"></div>
      <div class="modal-card modal-card_admin">
        <header
          class="modal-card-head has-background-black"
          style="border-style: hidden"
        >
          <span class="modal-card-title pl-3 py-1" style="text-align: left"
            ><img src="../assets/Logo.png" class="logo_card"
          /></span>
          <button class="delete" aria-label="close" @click="editc"></button>
        </header>

        <section class="modal-card-body profile_modal">
          <p
            class="regis_txt pb-3"
            style="text-decoration: none; font-size: 30px"
          >
            Edit Food & Beverage
          </p>
          <div class="columns">
            <div class="column is-3" style="text-align: right">
              <p class="profile_modal_txt py-2">Picture :</p>
              <p class="profile_modal_txt py-4">Name :</p>
              <p class="profile_modal_txt py-4">Price :</p>
            </div>

            <div class="column pr-6 is-8">
              <v-form ref="editform">
                <v-file-input
                  v-model="pic"
                  truncate-length="50"
                  label="picture"
                  rounded
                  dense
                  solo
                  :rules="[() => !!pic || 'This field is required']"
                >
                </v-file-input>

                <v-text-field
                  v-model="name"
                  label="name"
                  rounded
                  dense
                  solo
                  :rules="[() => !!name || 'This field is required']"
                ></v-text-field>

                <v-text-field
                  v-model="price"
                  label="price"
                  rounded
                  dense
                  solo
                  :rules="foodrule"
                ></v-text-field>
              </v-form>
            </div>
          </div>
        </section>

        <footer
          class="modal-card-foot has-background-black"
          style="border-style: hidden"
        >
          <div style="margin: auto">
            <button
              style="
                background-color: #fd7014;
                border-style: hidden;
                color: white;
              "
              class="button mx-3"
              @click="editFood"
            >
              EDIT
            </button>
            <button
              style="
                background-color: #222831;
                border-style: hidden;
                color: white;
              "
              class="button mx-3"
              @click="editc"
            >
              CANCEL
            </button>
          </div>
        </footer>
      </div>
    </div>
    <!-- edit modal -->

    <!-- delete modal -->
    <div class="modal" :class="{ 'is-active': delete_isopen }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header
          class="modal-card-head has-background-black"
          style="border-style: hidden"
        >
          <span class="modal-card-title pl-3 py-1" style="text-align: left"
            ><img src="../assets/Logo.png" class="logo_card"
          /></span>
          <button class="delete" aria-label="close" @click="deletec"></button>
        </header>
        <section class="modal-card-body profile_modal">
          <div style="font-size: 20px; text-align: center; color: white">
            Are you sure that you want to delete ?
          </div>
        </section>
        <footer
          class="modal-card-foot has-background-black"
          style="border-style: hidden"
        >
          <div style="margin: auto">
            <button
              @click="removefood"
              style="
                background-color: #fd7014;
                border-style: hidden;
                color: white;
              "
              class="button mx-3 px-6"
            >
              OK
            </button>
            <button
              style="
                background-color: #222831;
                border-style: hidden;
                color: white;
              "
              class="button mx-3"
              @click="deletec"
            >
              CANCEL
            </button>
          </div>
        </footer>
      </div>
    </div>
    <!-- delete modal -->
  </v-container>
</template>

<script>
import FoodService from "../service/FoodService";
import axios from 'axios';

export default {
  mounted() {
    this.getFood();
  },
  data() {
    return {
      image:
        "https://www.syioknya.com/custom/picture/18240/syioknya1_5d95c544a07f7.png",
      add_isopen: false,
      edit_isopen: false,
      delete_isopen: false,
      food: [],
      keep_index: 0,
      name: "",
      price: "",
      pic: null,
      foodrule: [
        (v) => !!v || "This field is required",
        (v) => /^[0-9]*$/.test(v) || "Please input number",
      ],
    };
  },
  methods: {
    async removefood() {
      await FoodService.delFood(this.keep_index);
      this.delete_isopen = false;
      this.getFood();
    },
    editc() {
      this.$refs.editform.resetValidation();
      this.edit_isopen = false;
      this.name = "";
      this.price = "";
      this.pic = null;
    },
    deletec() {
      this.name = "";
      this.price = "";
      this.pic = null;
      this.delete_isopen = false;
    },
    addc() {
      this.$refs.form.resetValidation();
      this.add_isopen = false;
      this.name = "";
      this.price = "";
      this.pic = null;
    },
    async edit(index) {
      this.edit_isopen = true;
      this.keep_index = index;
      for (var food of this.food) {
        if (food.food_id == index) {
          let config = {responseType:'blob'}
          let result = await axios.get('http://localhost:12000/'+food.food_image, config)
          this.pic = new File([result.data], "Old Picture.png");
          this.name = food.food_name;
          this.price = food.food_price;
        }
      }
    },
    remove(index) {
      this.delete_isopen = true;
      this.keep_index = index;
    },
    createEditForm: function () {
      let form = new FormData();
      form.append("food_name", this.name);
      form.append("food_image", this.pic);
      form.append("food_price", this.price);
      return form;
    },
    createAddForm: function () {
      let form = new FormData();
      form.append("food_name", this.name);
      form.append("food_image", this.pic);
      form.append("food_price", this.price);
      return form;
    },
    // async createFood(){
    //     var result = await FoodService.createFood()
    // },
    async editFood() {
      if (this.$refs.editform.validate()) {
        try {
          // req.params.food_id, req.body.food_name, req.file.path, req.body.food_price, null,  req.body.staff_id
          var result = await FoodService.editFood(
            this.createEditForm(),
            this.keep_index
          );
          console.log("res", result.status);
          console.log("success by vuejs");
          alert("Success");
          this.name = "";
          this.price = "";
          this.pic = null;
          this.getFood();
          this.edit_isopen = false;
        } catch (err) {
          console.log(err);
        }
      }
    },
    async createFood() {
      if (this.$refs.form.validate()) {
        try {
          var result = await FoodService.createFood(this.createAddForm());
          console.log("res", result.status);
          console.log("success by vuejs");
          alert("Success");
          this.$refs.form.resetValidation();
          this.$refs.editform.resetValidation();
          this.getFood();
          this.name = "";
          this.price = "";
          this.pic = null;
          this.add_isopen = false;
        } catch (err) {
          console.log(err);
        }
      }
    },
    async getFood() {
      try {
        let keep = await FoodService.getFood();
        console.log(keep);
        this.food = keep.data;
      } catch (err) {
        console.log(err);
      }
    },
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:12000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    isopen() {
      this.add_isopen = true;
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style>
.admin_card {
  background-color: #fd7014 !important;
  color: #ffffff !important;
  /* max-height: 400px; */
}

.modal-card_admin {
  width: 50%;
}
</style>
