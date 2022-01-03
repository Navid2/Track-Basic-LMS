<template>
  <div class="container">
    <div class="title">
      <h1 class="lesson-name">{{Lesson.name }}</h1>
      <div class="grades">
      <h3 v-for="grade in Lesson.Grades" :key="grade" :class="['lesson-grade', `${grade.name}-title`]" @click="$router.push({path:`Grade`,query:{grade_id:grade.id}})">
      
        {{ grade.name }}
      </h3>
      <h3 :class="['lesson-grade']" >
        <i class="fas fa-plus"/>
      </h3>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Lesson",
  data() {
    return {
      new_unit_name: "",
      Lesson: 
        {
          id: 5675467,
          name: "Discrete",
          Grades: [
            {
              name: "ten",
              id: 15656767,
            },
            {
              name: "eleven",
              id: 12312,
            },
            {
              name: "twelve",
              id: 76137,
            },
          ],
        },
    };
  },
  async created() {
    this.$route.query.lesson_id = this.$route.query.lesson_id
      ? this.$route.query.lesson_id
      : "";
    this.Lesson.id = parseInt(this.$route.query.lesson_id.toString());

    this.Lesson = await this.fetchLesson(this.Lesson.id);
    if (Object.keys(this.Lesson).length == 0) {
    //   this.$router.push({ path: "/404", query: { type: "Lesson" } });
    }
    console.log(this.Lesson);
  },
  methods: {
    log(text: string) {
      console.log(text);
    },
    async fetchLesson(id: number) {
      const res = await fetch(`api/lessons/${id}`);
      const data = await res.json();
      return data;
    },
  },
});
</script>
<style scoped>


.container {
  height: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
}
.container::-webkit-scrollbar {
  display: none;
}
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lesson-grade {
  background: #525252;
  padding: 0px 8px;
  border-radius: 4px;
  margin: 3px;
  color: white;
}
.ten-title {
  color: rgb(152, 248, 57);
}
.eleven-title {
  color: rgb(135, 187, 255);
}
.twelve-title {
  color: rgb(255, 205, 69);
}
.lesson-name {
  font-weight: 400;
  font-size: 40px;
}
.submitted_units::-webkit-scrollbar {
  display: none;
}
.submitted_units{
  height: 100%;
  overflow: scroll;
}
.units {
  margin: 10px;
  padding: 0px;
  width: 70%;
  background: rgb(235, 235, 235);
  max-height: 100%;
  min-height: fit-content;
  overflow: hidden;
  border-radius: 6px;
}
.unit:active {
  transition: 0.1s;
  background: rgb(243, 243, 243) !important;
}
.unit {
  padding: 10px;
  background: grey;
  margin: 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.5s;
  display: flex;
  justify-content: space-between;
}
.unit.ten {
  background: rgb(152, 248, 57);
}
.unit.eleven {
  background: rgb(135, 187, 255);
}
.unit.twelve {
  background: rgb(255, 205, 69);
}
.unit-title {
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;
  word-wrap: wrap;
  text-align: left;
}
.add-unit {
  width: 100%;
  display: flex;
  align-items: center;
}
.new-unit-name:focus {
  outline: none;
}
.new-unit-name {
  width: inherit;
  height: fit-content;
  margin: 10px;
  padding: 4px 10px;
  font-size: 20px;
  border: none;
  border-radius: 6px;
}
.add:active {
  background: gray;
  transition: 0.2s;
}
.add {
  margin: 10px;
  margin-left: 0;
  padding: 5px 10px;
  background: white;
  color: #ffe058;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s;
}
.add-unit-preview {
  background: honeydew !important;
  color: rgb(189, 176, 0);
  transform: scale(0.9);
  margin-top: 0;
}
.icons {
  display: flex;
  align-items: center;
  margin: 0px 0px;
}
.fas {
  margin: 0px 5px;
  color: inherit;
}
.fa-times {
  color: rgb(255, 62, 62);
  padding: 4px;
  border-radius: 5px;
  cursor: pointer;
}
a{
  text-decoration: none;
  color:inherit;
}
.grades{
    display: flex;
    flex-direction: column;
}

</style>