<template>
    <div class="container">
        <AddressBar
            :directory="getDirectory"
            :title="getTitle"
            :grade="getGrade"
            :key="parent"
        />
        <Notes
            :key="notes"
            :Notes="notes"
            @new-note="addNote"
            @edit-note="editNote"
            @delete-note="deleteNote"
        />
    </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import Notes from "../../components/Notes/index.vue";

import AddressBar from "../../components/AddressBar/index.vue";
// import Lesson from "../../models/Lesson";
// import Grade from "../../models/Grade";
// import Unit from "../../models/Unit";
// import SubUnit from "../../models/Subunit";

// type parent = Lesson | Grade | Unit | SubUnit | {};

export default defineComponent({
    async created() {
        console.log(this.$route.params);
        // if (this.$route.params.notes) {
        //     this.notes =
        //         typeof this.$route.params.notes == "object"
        //             ? this.$route.params.notes
        //             : [];
        // } else {
        const res = await fetch(
            `api/${this.$route.query.level}/${this.$route.query.id}`
        );
        const data = await res.json();
        this.parent = data;
        console.log(this.parent);
        this.notes = data.Notes;
        // }
    },
    components: {
        Notes,
        AddressBar,
    },
    data() {
        return {
            parent: {
                name: "Permutation",
                Lesson: {
                    name: "Discrete",
                    id: 5675467,
                },
                Grade: {
                    name: "twelve",
                    id: 15656769,
                },
                SubUnits: [
                    {
                        name: "Slots",
                        id: 11229091,
                    },
                ],
                Notes: [],
                Questions: [],
                id: 6161638,
            } as any,
            parent_level: (this.$route.query.level as string).substring(
                0,
                (this.$route.query.level as string).length - 1
            ),
            newNote: "",
            addField: { active: true, focus: false },
            focus: false,
            /*notes: [
        {
          text:
            "بازی ادامه می‌یابد تا زمانی که همهٔ مافیاها (برد شهروندان) یا تعداد مافیاها و شهروندان برابر شود (برد مافیا) یا یکی از شخصیت‌های مستقل که هر کدام شرایط برد متفاوتی دارد، برنده بازی شود. در یک بازی معمولاً نقش‌ها باید به گونه‌ای چیده شود که برای هر شخصیت، شخصیت‌های مقابل و مکمل قرار گیرد.بازی ادامه می‌یابد تا زمانی که همهٔ مافیاها (برد شهروندان) یا تعداد مافیاها و شهروندان برابر شود (برد مافیا) یا یکی از شخصیت‌های مستقل که هر کدام شرایط برد متفاوتی دارد، برنده بازی شود. در یک بازی معمولاً نقش‌ها باید به گونه‌ای چیده شود که برای هر شخصیت، شخصیت‌های مقابل و مکمل قرار گیرد.بازی ادامه می‌یابد تا زمانی که همهٔ مافیاها (برد شهروندان) یا تعداد مافیاها و شهروندان برابر شود (برد مافیا) یا یکی از شخصیت‌های مستقل که هر کدام شرایط برد متفاوتی دارد، برنده بازی شود. در یک بازی معمولاً نقش‌ها باید به گونه‌ای چیده شود که برای هر شخصیت، شخصیت‌های مقابل و مکمل قرار گیرد.بازی ادامه می‌یابد تا زمانی که همهٔ مافیاها (برد شهروندان) یا تعداد مافیاها و شهروندان برابر شود (برد مافیا) یا یکی از شخصیت‌های مستقل که هر کدام شرایط برد متفاوتی دارد، برنده بازی شود. در یک بازی معمولاً نقش‌ها باید به گونه‌ای چیده شود که برای هر شخصیت، شخصیت‌های مقابل و مکمل قرار گیرد.بازی ادامه می‌یابد تا زمانی که همهٔ مافیاها (برد شهروندان) یا تعداد مافیاها و شهروندان برابر شود (برد مافیا) یا یکی از شخصیت‌های مستقل که هر کدام شرایط برد متفاوتی دارد، برنده بازی شود. در یک بازی معمولاً نقش‌ها باید به گونه‌ای چیده شود که برای هر شخصیت، شخصیت‌های مقابل و مکمل قرار گیرد.بازی ادامه می‌یابد تا زمانی که همهٔ مافیاها (برد شهروندان) یا تعداد مافیاها و شهروندان برابر شود (برد مافیا) یا یکی از شخصیت‌های مستقل که هر کدام شرایط برد متفاوتی دارد، برنده بازی شود. در یک بازی معمولاً نقش‌ها باید به گونه‌ای چیده شود که برای هر شخصیت، شخصیت‌های مقابل و مکمل قرار گیرد.بازی ادامه می‌یابد تا زمانی که همهٔ مافیاها (برد شهروندان) یا تعداد مافیاها و شهروندان برابر شود (برد مافیا) یا یکی از شخصیت‌های مستقل که هر کدام شرایط برد متفاوتی دارد، برنده بازی شود. در یک بازی معمولاً نقش‌ها باید به گونه‌ای چیده شود که برای هر شخصیت، شخصیت‌های مقابل و مکمل قرار گیرد.",
          active: true,
          focus: false,
        },
        { text: "gtgygyhukjnjnnnnnnss", active: true, focus: false },
        { text: "gtgygyhukjnjnnnnnnss", active: true, focus: false },
        { text: "gtgygyhukjnjnnnnnnss", active: true, focus: false },
        { text: "gtgygyhukjnjnnnnnnss", active: true, focus: false },
        { text: "gtgygyhukjnjnnnnnnss", active: true, focus: false },
      ],*/
            notes: ["a", "a"],
        };
    },
    watch: {},
    methods: {
        async addNote(note: string) {
            const res = await fetch(
                `api/${this.parent_level}s/${this.parent.id}`,
                {
                    method: "PATCH",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ Notes: [...this.notes, note] }),
                }
            );
            // console.log(res.status, res.ok);
            if (res.ok) this.notes = [...this.notes, note];
        },
        async editNote(data:{note:string,index:number}) {
            const res = await fetch(
                `api/${this.parent_level}s/${this.parent.id}`,
                {
                    method: "PATCH",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ Notes: [...this.notes.slice(0,data.index), data.note,...this.notes.slice(data.index+1,this.notes.length)] }),
                }
            );
            // console.log(res.status, res.ok);
            if (res.ok) this.notes = [...this.notes.slice(0,data.index), data.note,...this.notes.slice(data.index+1,this.notes.length)];
        },
        async deleteNote(index: number) {
            const res = await fetch(
                `api/${this.parent_level}s/${this.parent.id}`,
                {
                    method: "PATCH",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        Notes: [
                            ...this.notes.slice(0, index),
                            ...this.notes.slice(index + 1),
                        ],
                    }),
                }
            );
            // console.log(res.status, res.ok);
            if (res.ok)
                this.notes = [
                    ...this.notes.slice(0, index),
                    ...this.notes.slice(index + 1),
                ];
        },
    },
    computed: {
        getDirectory(): any {
            if (this.parent_level == "Lesson") {
                return [{}];
            } else if (this.parent_level == "Grade") {
                return [
                    {
                        path: "Grade",
                        name: this.parent.name,
                        query: { grade_id: this.parent.id },
                    },
                    {   path:"Notes",
                        name:'Notes',
                        query:{level:`${this.parent_level}s`,id:this.parent.id}
                    }
                ];
            } else if (this.parent_level == "Unit") {
                return [
                    {
                        path: "Grade",
                        name: this.parent.Grade.name,
                        query: { grade_id: this.parent.Grade.id },
                    },
                    {
                        path: "Unit",
                        name: this.parent.name,
                        query: { unit_id: this.parent.id },
                    },
                    {   path:"Notes",
                        name:'Notes',
                        query:{level:`${this.parent_level}s`,id:this.parent.id}
                    }
                ];
            } else if (this.parent_level == "SubUnit") {
                return [
                    {
                        path: "Grade",
                        name: this.parent.Grade.name,
                        query: { grade_id: this.parent.Grade.id },
                    },
                    {
                        path: "Unit",
                        name: this.parent.Unit.name,
                        query: { unit_id: this.parent.Units.id },
                    },
                    {
                        path: "SubUnit",
                        name: this.parent.name,
                        query: { subunit_id: this.parent.id },
                    },
                    {   path:"Notes",
                        name:'Notes',
                        query:{level:`${this.parent_level}s`,id:this.parent.id}
                    }
                ];
            }
        },
        getTitle(): any {
            return {
                path: "Lesson",
                name: this.parent.Lesson
                    ? this.parent.Lesson.name
                    : this.parent.name,
                query: {
                    lesson_id: this.parent.Lesson
                        ? this.parent.Lesson.id
                        : this.parent.id,
                },
            };
        },
        getGrade(): any {
            return this.parent.Grade
                ? this.parent.Grade.name
                : this.parent.name;
        },
    },
});
</script>
<style scoped>
@media only screen and (max-width: 600px) {
    .notes {
        width: 100% !important;
    }
}
.container::-webkit-scrollbar {
    display: none;
}
.container {
    height: 100%;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 10px;
    margin: 0px;
    align-items: center;
}
.notes {
    transition: 0.2s;
    padding: 5px;
    max-height: 100%;
    width: 70%;
    background: rgb(224, 224, 224);
    border-radius: 4px;

    overflow-y: scroll;
}
.add-note-input.focus {
    height: 180px;
}
.add-note-input {
    width: 100%;
    outline: none;
    border: none;
    background: transparent;
    word-wrap: break-word;
    white-space: normal;
    font-size: 16px;
    color: #2c3e50;
    height: 30px;
    text-align: right;
    resize: none;
    direction: rtl;
}
.fa-plus-circle {
    transition-duration: 0.2s;
}
.fa-plus-circle:hover {
    cursor: pointer;
    color: rgb(45, 185, 87);
    transition-duration: 0.2s;
}
.notes::-webkit-scrollbar {
    display: none;
}
.notes.focus {
    height: 100%;
}
.note-container {
    padding: 5px;
    width: 100%;
}
.note-container.inactive {
    display: none;
}
.note-container.focus {
    height: 100%;
}
.note::-webkit-scrollbar {
    display: none;
}
.note {
    background: rgb(245, 245, 245);
    padding: 10px;
    border-radius: 4px;
    display: flex;
    justify-content: flex-start;
    flex-direction: row-reverse;
    align-items: center;
    width: 100%;
}
.note.focus {
    height: 100%;
    align-items: flex-start;
}
.note-text::-webkit-scrollbar {
    display: none;
}
.note-text {
    width: 100%;
    text-align: right;

    overflow: hidden;
    white-space: nowrap;
    height: 100%;
    direction: rtl;
    overflow: scroll;
}
.note-text.focus {
    white-space: normal;
    word-wrap: break-word;
}
.fas {
    margin: 4px 4px;
}
.fa-sticky-note {
    color: rgb(255, 81, 81);
}
.fa-arrow-circle-down {
    color: rgb(45, 185, 87);
    cursor: pointer;
}
.fa-arrow-circle-left {
    color: rgb(45, 185, 87);
    cursor: pointer;
}
</style>