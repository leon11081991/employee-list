<template>
  <div id="app">
    <div v-if="$store.state.loading" class="loading">loading...</div>
    <div class="content-wrapper">
      <div class="buttons">
        <Button label="Add" @click="addHandler" />
        <Button label="Save" @click="saveHandler" />
        <Button label="Update" @click="updateHandler" />
      </div>

      <div class="msg-wrapper">
        <p v-if="errorMsg" class="msg-txt">{{ errorMsg }}</p>
      </div>

      <div class="dataList">
        <div class="labels">
          <div>Name</div>
          <div>Birthday</div>
          <div>Salary</div>
          <div>Address</div>
        </div>
        <EmployeeList :employeeList="employeeList" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./components/Button.vue";
import EmployeeList from "./components/EmployeeList.vue";

export default {
  name: "App",
  components: { Button, EmployeeList },
  computed: {
    errorMsg() {
      return this.$store.state.errorMsg;
    },
    employeeList() {
      return this.$store.state.employeeList;
    },
  },
  methods: {
    addHandler() {
      this.$store.dispatch("addData");
    },
    updateHandler() {
      this.$store.dispatch("getData");
    },
    saveHandler() {
      this.$store.dispatch("saveData");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./assets/reset.css";
@import "@/assets/variables.scss";

:root {
  font-family: $fontFamilyBase;
  font-size: $fontSizeBase;
  color: $colorBlack;
}

body {
  margin: 0;
}

#app {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading {
  width: 100%;
  position: absolute;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba($colorBlack, 0.6);
  z-index: 1;
  font-size: 1.5rem;
  color: white;
}

.content-wrapper {
  position: relative;
  width: 80%;
  max-width: 700px;
  min-height: 400px;
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0px 5px 30px 0px rgba($colorBlack, 0.5);
}

.msg-wrapper {
  margin: 10px 0;
  .msg-txt {
    color: $colorRed;
  }
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.labels {
  position: relative;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  padding: 10px;
  border-bottom: 1px solid rgba($colorBlack, 0.1);
}

.dataList {
  margin-top: 10px;
  height: 400px;
  overflow-y: scroll;
}
</style>
