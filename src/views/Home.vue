<template>
    <div class="home">
        <div class="lessons-container">
            <div class="lessons">
                <div
                    class="lesson"
                    v-for="item in lessons"
                    :key="item"
                >
                    <h2>{{ item.name }}</h2>
                    <div class="grades">
                        <p
                            :class="grade.name"
                            v-for="grade in item.Grades"
                            :key="grade"
                            v-on:click="
                $router.push({
                  path: 'Grade',
                  query: { grade_id: grade.id },
                })
              "
                        >
                            {{ grade.name }}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <footer>
        <div class="lesson add-lesson">
            <div class="grades add-lesson">
                <input
                    class="lesson-name"
                    v-model="new_lesson_name"
                    v-on:keydown.enter="addNewLesson"
                >
                <i
                    class="fas fa-plus"
                    @click="addNewLesson"
                />
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
import Footer from "@/components/Footer.vue";
import { defineComponent } from "vue";

export default defineComponent({
    name: "Home",
    components: { Footer },
    data() {
        return {
            new_lesson_name: "",
            lessons: [
                {
                    id: 5675467,
                    name: "Math",
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
            ],
        };
    },
    computed: {},
    async created() {
        this.lessons = await this.fetchLessons();
    },
    methods: {
        async addNewLesson() {
            const newLessonName = this.new_lesson_name;
            this.new_lesson_name = "";
            const lesson_res = await fetch("api/Lessons", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    name: newLessonName,
                    Grades: [],
                }),
            });
            const lesson_data = await lesson_res.json();
            console.log(lesson_data);

            const lesson_id = lesson_data.id;

            let grades = [
                { name: "ten", id: null },
                { name: "eleven", id: null },
                { name: "twelve", id: null },
            ];
            grades = await Promise.all(
                grades.map(async (grade) => {
                    const res = await fetch("api/Grades", {
                        method: "POST",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify({
                            name: grade.name,
                            Lesson: {
                                name: newLessonName,
                                id: lesson_id,
                            },
                            Units: [],
                        }),
                    });
                    const data = await res.json();
                    grade.id = data.id;
                    return grade;
                })
            );
            console.log(grades);
            const lesson_res2 = await fetch(`api/Lessons/${lesson_id}`, {
                method: "PATCH",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ Grades: grades }),
            });
            if (lesson_res2.ok) {
                this.lessons = [
                    ...this.lessons,
                    {
                        id: lesson_id,
                        name: newLessonName,
                        Grades: grades as any,
                    },
                ];
            }
        },
        async fetchLessons() {
            const res = await fetch(`api/Lessons`);
            const data = await res.json();
            return data;
        },
    },
});
</script>
<style scoped>
@media only screen and (max-width: 600px) {
    .lessons-container {
        width: 100%;
    }
}
.lessons-container {
    width: 60%;
}
.home::-webkit-scrollbar {
    display: none;
}
.home {
    overflow: scroll;
    display: flex;
    flex-flow: column;
    align-items: center;
    height: 100%;
}
.lessons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    flex-grow: 1;
}
.lesson h2 {
    font-weight: 600;
}
.lesson {
    transition: 0.3s;
    background: rgb(231, 231, 231);
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 10px;
    border-radius: 3px;
    min-width: 300px;
    width: 300px;
}
.lesson.active {
    transition: 0.3s ease;
    position: absolute;

    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    text-align: center;
}
.grades {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3px;
}

.grades p:active {
    background: rgb(180, 180, 180);
    transition: 0.2s;
}
.grades p {
    margin: 6px 4px;
    padding: 3px;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.1s;
}
h2 {
    margin: 8px;
}
.ten {
    background: rgb(152, 248, 57);
}
.eleven {
    background: rgb(135, 187, 255);
}
.twelve {
    background: rgb(255, 205, 69);
}

.lesson-grade-menu {
    margin: 10px;
    background: whitesmoke;
}
.unit {
    border-radius: 4px;
    background: rgb(188, 248, 67);
    margin: 8px 8px 8px 8px;
    padding: 6px;
    display: flex;
    justify-content: flex-start;
    cursor: pointer;
}
.ten.active {
    border-bottom: solid 5px rgb(121, 121, 121);
}
.icon-container {
    background: yellow;
    width: fit-content;
    padding: 6px;
}
.fa-plus {
    transform: scale(1.1);

    margin: 4px;
    cursor: pointer;
    background: rgb(231, 231, 231);
    padding: 5px;
    border-radius: 3px;
}

input.lesson-name {
    outline: none;
    border: none;
    font-size: 15px;
    width: 100%;
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
    color: rgb(58, 58, 58);
    background: rgb(243, 243, 243);
}
.lesson.add-lesson {
    background: rgb(207, 207, 207);
    color: rgb(70, 70, 70);
    border-radius: 10px 10px 0px 0px;
    width: 40% !important;
    padding-bottom: 10px;
    margin-bottom: -5px;
    box-shadow: rgba(0, 0, 0, 0.397) 0px 0px 6px;
}
footer {
    display: flex;
    justify-content: center;
    width: 100%;
}
</style>