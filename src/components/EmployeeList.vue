<template>
  <ul>
    <li
      class="list-item"
      v-for="(employeeData, index) in employeeList"
      :key="index"
    >
      <input type="text.trim" v-model.trim="employeeData.Name" />
      <input
        type="date"
        :value="formatDate(employeeData.DateOfBirth)"
        @input="updateDateOfBirth(employeeData, $event)"
        placeholder="生日"
      />
      <input type="range" v-model="employeeData.Salary" min="0" max="100000" />
      <input type="text.trim" v-model.trim="employeeData.Address" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "EmployeeList",
  props: {
    employeeList: {
      type: Array,
    },
  },
  methods: {
    formatDate(date) {
      // format time to yyyy-MM-dd
      if (!date) return;

      const formattedDate = date.split("T")[0];
      return formattedDate;
    },
    updateDateOfBirth(employeeData, event) {
      const formattedDate = event.target.value;
      employeeData.DateOfBirth = formattedDate;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.list-item {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  margin: 10px 0;
  padding: 0 10px 10px 10px;
  border-bottom: 1px solid rgba($colorBlack, 0.1);

  input {
    width: 70%;
    font-size: 1rem;
  }
}
</style>
