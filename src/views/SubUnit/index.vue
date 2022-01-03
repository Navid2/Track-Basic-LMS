<template>
    <div class="container">
        <AddressBar
            :title="{name:SubUnit.Lesson.name,path:'Lesson',query:{lesson_id:SubUnit.Lesson.id}}"
            :grade="SubUnit.Grade.name"
            :directory="[{name:SubUnit.Grade.name,path:'Grade',query:{grade_id:SubUnit.Grade.id}},{name:SubUnit.Unit.name,path:'Unit',query:{unit_id:SubUnit.Unit.id}},{name:SubUnit.name,path:'SubUnit',query:{subunit_id:SubUnit.id}}]"
            :key="SubUnit"
        />
        <Notes @new-note="addNote" @delete-note="removeNote" @edit-note="editNote" :Notes="SubUnit.Notes" :key="SubUnit"/>
        <!--<QAPannel @new-qa="addNote" @delete-qa="removeNote" :Questions="SubUnit.Questions" :key="SubUnit"/>-->
        
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import TitlesPannel from "../../components/TitlesPannel/index.vue";
import AddressBar from "../../components/AddressBar/index.vue";
import Notes from "../../components/Notes/index.vue"
import QAPannel from "../../components/QAPannel/index.vue"
export default defineComponent({
    components: { TitlesPannel, AddressBar,Notes ,QAPannel},
    name: "SubUnit",
    data() {
        return {
            new_subunit_name: "",
            SubUnit: {
                id: 1,
                name: "Subunit",
                Lesson: {
                    name: "Lesson",
                    id: 1,
                },
                Grade: {
                    name: "Grade",
                    id: 1,
                },
                Unit: {
                    name: "Unit",
                    id: 1,
                },
                Notes: [] as Array<string>,
                Questions: [],
            },
        };
    },
    async created() {
        this.$route.query.subunit_id = this.$route.query.subunit_id
            ? this.$route.query.subunit_id
            : "";
        this.SubUnit.id = parseInt(this.$route.query.subunit_id.toString());

        this.SubUnit = await this.fetchSubUnit(this.SubUnit.id);
        if (Object.keys(this.SubUnit).length == 0) {
            //   this.$router.push({ path: "/404", query: { type: "Unit" } });
        }
    },
    methods: {
        log(text: string) {
            console.log(text);
        },
        async fetchSubUnit(id: number) {
            const res = await fetch(`api/SubUnits/${id}`);
            const data = await res.json();
            return data;
        },
        async addNote(note:string){
            const res=await fetch(`api/SubUnits/${this.SubUnit.id}`,{method:'PATCH',headers:{'Content-type':'application/json'},body:JSON.stringify({Notes:[...this.SubUnit.Notes,note]})})
            if(res.ok){
                this.SubUnit.Notes=[...this.SubUnit.Notes,note];
                this.SubUnit={...this.SubUnit}
            }
        },
        async editNote(data:{note:string,index:number}){
            const res=await fetch(`api/SubUnits/${this.SubUnit.id}`,{method:'PATCH',headers:{'Content-type':'application/json'},body:JSON.stringify({Notes:[...this.SubUnit.Notes.slice(0,data.index),data.note,...this.SubUnit.Notes.slice(data.index+1)]})})
            if(res.ok){
                this.SubUnit.Notes=[...this.SubUnit.Notes.slice(0,data.index),data.note,...this.SubUnit.Notes.slice(data.index+1)];
                this.SubUnit={...this.SubUnit}
            }
        },
        async removeNote(index:number){
            const res=await fetch(`api/SubUnits/${this.SubUnit.id}`,{method:'PATCH',headers:{'Content-type':'application/json'},body:JSON.stringify({Notes:[...this.SubUnit.Notes.slice(0,index),...this.SubUnit.Notes.slice(index+1)]})})
            if(res.ok){
                this.SubUnit.Notes=[...this.SubUnit.Notes.slice(0,index),...this.SubUnit.Notes.slice(index+1)];
                this.SubUnit={...this.SubUnit}

            }

        }
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