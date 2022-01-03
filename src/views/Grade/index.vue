<template>
    <div class="container">
        <AddressBar
            :title="{name:Grade.Lesson.name,path:'Lesson',query:{lesson_id:Grade.Lesson.id}}"
            :grade="Grade.name"
            :directory="[{name:Grade.name,path:'Grade',query:{grade_id:Grade.id}}]"
            :key="Grade"
        />
        <TitlesPannel
            :grade="Grade.name"
            :items="Grade.Units"
            :key="Grade"
            @add-item="add"
            @delete-item="del"
            @item-clicked="unitClicked"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import TitlesPannel from "../../components/TitlesPannel/index.vue";
import AddressBar from "../../components/AddressBar/index.vue";
export default defineComponent({
    components: {
        TitlesPannel,
        AddressBar,
    },
    name: "Lesson",
    data() {
        return {
            new_unit_name: "",
            Grade: {
                id: 15656767,
                name: "grade",
                Lesson: {
                    name: "Lesson",
                    id: 5675467,
                },
                Units: [
                    {
                        name: "Unit",
                        id: 6161626,
                    },
                ],
            },
        };
    },
    async created() {
        this.$route.query.grade_id = this.$route.query.grade_id
            ? this.$route.query.grade_id
            : "";
        this.Grade.id = parseInt(this.$route.query.grade_id.toString());

        this.Grade = await this.fetchGrade(this.Grade.id);
        if (Object.keys(this.Grade).length == 0) {
            this.$router.push({ path: "/404", query: { type: "Grade" } });
        }
        console.log(this.Grade);
    },
    methods: {
        log(text: string) {
            console.log(text);
        },
        unitClicked(id: number) {
            this.log(id.toString());
            this.$router.push({ path: `Unit`, query: { unit_id: id } });
        },
        async del(unit_title: string, id: number) {
            if (
                confirm(`Unit "${unit_title}" will be deleted, Are you sure?`)
            ) {
                await this.deleteUnit(id);
            }
        },
        async add(name: string) {
            await this.addUnit(name);
            this.new_unit_name = "";
        },
        async fetchGrade(id: number) {
            const res = await fetch(`api/grades/${id}`);
            const data = await res.json();
            return data;
        },
        async addUnit(name: string) {
            const res = await fetch(`api/Units`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    Lesson: this.Grade.Lesson,
                    Grade: {
                        name: this.Grade.name,
                        id: this.Grade.id,
                    },
                    SubUnits: [],
                    Notes: [],
                    Questions: [],
                }),
            });
            const data = await res.json();
            if (res.status == 201) {
                // console.log({...this.Grade,Units:[...this.Grade.Units,{name:name,id:data.id}]})
                const res2 = await fetch(`api/Grades/${this.Grade.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        ...this.Grade,
                        Units: [
                            ...this.Grade.Units,
                            { name: name, id: data.id },
                        ],
                    }),
                });
                if (res2.status == 200) {
                    this.Grade = {
                        ...this.Grade,
                        Units: [
                            ...this.Grade.Units,
                            { name: name, id: data.id },
                        ],
                    };
                }
            }
        },
        async deleteUnit(id: number) {
            const res = await fetch(`api/Units/${id}`, { method: "DELETE" });

            const newGradeObject = await this.fetchGrade(this.Grade.id);
            newGradeObject.Units = newGradeObject.Units.filter(
                (unit: { name: string; id: number }) => unit.id !== id
            );
            const res2 = await fetch(`api/Grades/${this.Grade.id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(newGradeObject),
            });
            this.Grade = newGradeObject;
        },
    },
});
</script>
<style scoped>
.container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    padding: 10px;
}
.container::-webkit-scrollbar {
    display: none;
}
</style>