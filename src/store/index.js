import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    employeeList: [],
    errorMsg: "",
  },
  mutations: {
    UPGRADE_DATA(state, employeeList) {
      state.employeeList = employeeList;
    },
    ADD_DATA(state, data) {
      state.employeeList.unshift(data);
    },
    CLEAR_FORM(state) {
      state.employeeList.shift();
    },
    CLEAR_ERR_MSG(state) {
      setTimeout(() => {
        state.errorMsg = "";
      }, 3000);
    },
  },
  actions: {
    addData({ state, commit }) {
      state.errorMsg = "";

      if (state.employeeList.length === 0) {
        state.errorMsg = "Please update the list first.";
        return;
      }

      if (state.employeeList[0].Name && state.employeeList[0].DateOfBirth) {
        commit("ADD_DATA", {
          Name: "",
          DateOfBirth: null,
          Salary: 0,
          Address: "",
        });
      }

      if (state.employeeList[0].Name || state.employeeList[0].DateOfBirth) {
        state.errorMsg = "Please fill in at least the name and date of birth.";
      }
      return;
    },
    async getData({ state, commit }) {
      try {
        state.loading = true;
        state.errorMsg = "";

        const getURL =
          "http://nexifytw.mynetgear.com:45000/api/Record/GetRecords";
        const res = await axios.get(getURL);
        //console.log(res);
        const data = res.data;

        if (data.Success) {
          commit("UPGRADE_DATA", data.Data);
          state.loading = false;
          // console.log(data.Data);
        } else {
          state.errorMsg =
            "Oops! There's some trouble. Please try again later.";
          commit("CLEAR_ERR_MSG");
        }
      } catch (err) {
        console.error("Error to get data: ", err);
      }
    },
    async saveData({ state, commit, dispatch }) {
      try {
        const bothHaveNameAndBirth = state.employeeList.every(
          (obj) =>
            obj.Name !== "" &&
            (obj.DateOfBirth !== null ||
              obj.DateOfBirth !== undefined ||
              obj.DateOfBirth !== "")
        );
        const onlyHaveNameOrBirth = state.employeeList.every(
          (obj) =>
            obj.Name !== "" ||
            obj.DateOfBirth !== null ||
            obj.DateOfBirth !== undefined ||
            obj.DateOfBirth !== ""
        );

        state.errorMsg = "";
        if (!bothHaveNameAndBirth) {
          commit("CLEAR_FORM");
          return;
        }

        if (bothHaveNameAndBirth) {
          state.loading = true;

          const postURL =
            "http://nexifytw.mynetgear.com:45000/api/Record/SaveRecords";
          const res = await axios.post(postURL, state.employeeList, {
            headers: {
              "access-control-allow-origin": "*",
              "content-type": "application/json",
            },
          });
          const data = res.data;

          if (data.Success) {
            dispatch("getData");
            state.loading = false;
            state.errorMsg = "Data saved successfully!";
            commit("CLEAR_ERR_MSG");
          } else {
            console.error("Failed to post data");
            state.errorMsg =
              "Oops! There's some trouble. Please try again later.";
            commit("CLEAR_ERR_MSG");
          }
          return;
        }

        if (onlyHaveNameOrBirth) {
          state.errorMsg =
            "Please fill in at least the name and date of birth.";
          return;
        }
      } catch (err) {
        console.error("Error to save data: ", err);
      }
    },
  },
});
