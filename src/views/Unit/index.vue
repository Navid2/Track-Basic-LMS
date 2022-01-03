<template>
    <div class="container">
        <AddressBar
            :title="{name:Unit.Lesson.name,path:'Lesson',query:{lesson_id:Unit.Lesson.id}}"
            :grade="Unit.Grade.name"
            :directory="[{name:Unit.Grade.name,path:'Grade',query:{grade_id:Unit.Grade.id}},{name:Unit.name,path:'Unit',query:{unit_id:Unit.id}}]"
            :key="Unit"
        />

        <div class="title">
            <div class="unit-content">
                <div
                    class="btn notes-button"
                    @click="
                        $router.push({
                            name: 'Notes',
                            query: { level: 'Units', id: Unit.id },
                            params: { notes: Unit.Notes },
                        })
                    "
                >
                    Notes
                </div>
                <div class="btn questions-button">Questions</div>
            </div>
        </div>
        <TitlesPannel
            :items="Unit.SubUnits"
            :grade="Unit.Grade.name"
            :key="Unit"
            @add-item="add"
            @delete-item="del"
            @item-clicked="redirectToSubunit"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import TitlesPannel from "../../components/TitlesPannel/index.vue";
import AddressBar from "../../components/AddressBar/index.vue";

export default defineComponent({
    components: { TitlesPannel, AddressBar },
    name: "Lesson",
    data() {
        return {
            new_subunit_name: "",
            Unit: {
                id: 6161626,
                name: "Counting without Counting",
                Lesson: {
                    name: "Discrete",
                    id: 5675467,
                },
                Grade: {
                    name: "eleven",
                    id: 15656767,
                },
                SubUnits: [
                    {
                        name: "Permutation",
                        id: 978767876567,
                    },
                ],
                Notes: ["we must count numbers"],
                Questions: [
                    {
                        Q: "how to count without counting?",
                        A: "using Permutatations",
                    },
                ],
            },
        };
    },
    async created() {
        this.$route.query.unit_id = this.$route.query.unit_id
            ? this.$route.query.unit_id
            : "";
        this.Unit.id = parseInt(this.$route.query.unit_id.toString());

        this.Unit = await this.fetchUnit(this.Unit.id);
        if (Object.keys(this.Unit).length == 0) {
            //   this.$router.push({ path: "/404", query: { type: "Unit" } });
        }
        console.log(this.Unit.SubUnits);
    },
    methods: {
        log(text: string) {
            console.log(text);
        },
        redirectToSubunit(id:number){
            this.$router.push({path:'/SubUnit',query:{subunit_id:id}})

        },
        async del(subunit_title: string, id: number) {
            console.log(subunit_title, id, "deleted");
            if (
                confirm(
                    `Unit "${subunit_title}" will be deleted, Are you sure?`
                )
            ) {
                await this.deleteSubUnit(id);
            }
        },
        async add(name: string) {
            console.log(name + " to be added");
            await this.addSubUnit(name);
        },
        async fetchUnit(id: number) {
            const res = await fetch(`api/Units/${id}`);
            const data = await res.json();
            return data;
        },
        async addSubUnit(name: string) {
            const res = await fetch(`api/subunits`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    Lesson: this.Unit.Lesson,
                    Grade: this.Unit.Grade,
                    Unit: {
                        name: this.Unit.name,
                        id: this.Unit.id,
                    },
                    Notes: [],
                    Questions: [
                        {
                            Q: "Question here",
                            A: "Answer here",
                        },
                    ],
                }),
            });
            const data = await res.json();
            if (res.status == 201) {
                // console.log({...this.Grade,Units:[...this.Grade.Units,{name:name,id:data.id}]})
                const res2 = await fetch(`api/Units/${this.Unit.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        ...this.Unit,
                        SubUnits: [
                            ...this.Unit.SubUnits,
                            { name: name, id: data.id },
                        ],
                    }),
                });
                if (res2.status == 200) {
                    this.Unit = {
                        ...this.Unit,
                        SubUnits: [
                            ...this.Unit.SubUnits,
                            { name: name, id: data.id },
                        ],
                    };
                }
            }
        },
        async deleteSubUnit(id: number) {
            const res = await fetch(`api/SubUnits/${id}`, { method: "DELETE" });

            const newUnitObject = await this.fetchUnit(this.Unit.id);
            newUnitObject.SubUnits = newUnitObject.SubUnits.filter(
                (subunit: { name: string; id: number }) => subunit.id !== id
            );
            const res2 = await fetch(`api/Units/${this.Unit.id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(newUnitObject),
            });
            this.Unit = newUnitObject;
        },
    },
});
</script>
<style scoped>
@media only screen and (max-width: 600px) {
    .units {
        width: 100% !important;
    }
}
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
.title {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.lesson-grade {
    background: #525252;
    padding: 0px 8px;
    margin: 4px;
    border-radius: 4px;
    max-width: 80px;
    overflow: hidden;
    height: 29px;
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
.submitted_subunits::-webkit-scrollbar {
    display: none;
}
.submitted_subunits {
    height: 100%;
    overflow: scroll;
}
.units {
    margin: 10px !important;
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
.add-subunit {
    width: 100%;
    display: flex;
    align-items: center;
}
.new-subunit-name:focus {
    outline: none;
}
.new-subunit-name {
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
.add-subunit-preview {
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
}
.fa-times {
    color: rgb(255, 62, 62);
    padding: 4px;
    border-radius: 5px;
    cursor: pointer;
}
a {
    text-decoration: none;
    color: inherit;
}
.path {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.unit-content {
    display: flex;
    padding: 5px;
    background: rgb(235, 235, 235);
    border-radius: 4px;
    margin-top: 10px;
}
.btn:active {
    background: whitesmoke;
}
.btn {
    background: grey;
    color: white;
    padding: 5px 5px;
    margin: 5px;
    border-radius: 4px;
    cursor: pointer;
    transition-duration: 0.2s;
}
.notes-button {
    background: rgb(255, 255, 93);
    color: grey;
}
.questions-button {
    background: rgb(255, 188, 133);
    color: grey;
}
</style>