<template>
    <div :class="['notes', focus ? 'focus' : '']">
        <div
            :class="[
                'note-container',
                'add-field-note-container',
                addField.focus ? 'focus' : '',
                addField.active ? '' : 'inactive',
            ]"
        >
            <div :class="['note', addField.focus ? 'focus' : '']">
                <i class="fas fa-sticky-note"></i>
                <i class="fas fa-plus-circle" @click="addNote()"></i>

                <textarea
                    :class="['add-note-input', addField.focus ? 'focus' : '']"
                    placeholder="نکته جدید"
                    v-model="newNote"
                    autocomplete="off"
                />
            </div>
            <div class="editor-buttons">
                <div v-if="addField.focus" class="btn save-button" @click="addNote()">save</div>
                <div v-if="addField.focus" class="btn discard-button" @click="deleteText()">discard</div>
            </div>
        </div>
        <div
            v-for="(question, index) in questions"
            :key="question"
            :class="[
                'note-container',
                question.focus ? 'focus' : '',
                question.active ? '' : 'inactive',
            ]"
        >
            <div :class="['note', question.focus ? 'focus' : '']">
                <i class="fas fa-sticky-note"></i>
                <i
                    v-if="!question.focus"
                    class="fas fa-arrow-circle-down"
                    @click="focusOn(index)"
                ></i>
                <i
                    v-if="question.focus"
                    class="fas fa-arrow-circle-left"
                    @click="unfocus()"
                ></i>
                <div class="QA-text">
                <p :class="['note-text', question.focus ? 'focus' : '']">
                    {{ question.QA.A }}
                </p>

                </div>
                <i
                    class="fas fa-times-circle"
                    @click="deleteNote(index)"
                ></i>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
    created() {
        // this.questions=[]
        // let Questions=this.$props.Questions;
        // Questions?.map((question)=>{
        //     this.questions.push({active:true,focus:false,QA:question});

        // })
    },
    data() {
        return {
            newNote: "",
            addField: { active: true, focus: false },
            focus: false,
            questions: [
                { QA: {Q:'a',A:'b'}, active: true, focus: false },
            ],
        };
    },
    watch: {
        newNote: function (newNote) {
            if (newNote.length > 4) {
                this.addField.active = true;
                this.addField.focus = true;
                this.questions.map((question: { active: boolean }) => {
                    question.active = false;
                });
            } else {
                this.addField.active = true;
                this.addField.focus = false;
                this.questions.map((question: { active: boolean }) => {
                    question.active = true;
                });
            }
        },
    },
    props: {
        Questions: {type:Array as PropType<Array<{Q:string,A:string}>>},
    },
    
    methods: {
        addNote() {
            this.$emit("new-note", this.newNote);
            this.newNote = "";
        },
        deleteText(){
            this.newNote = "";

        },
        deleteNote(index:number){
            confirm('You are about to delete your note, are you sure?')?this.$emit("delete-note",index):()=>{}
            // console.log(index)

        },

        changeNote(id: number, newText: string) {
            this.$emit("edit-note", id, newText);
        },
        focusOn(fIndex: number) {
            this.addField.active = false;
            this.addField.focus = false;

            this.focus = true;
            this.questions.map((question, index) => {
                if (fIndex == index) {
                    question.active = true;
                    question.focus = true;
                } else {
                    question.active = false;
                    question.focus = false;
                }
            });
        },
        unfocus() {
            this.addField.active = true;
            this.addField.focus = false;

            this.focus = false;
            this.questions.map((question) => {
                question.active = true;
                question.focus = false;
            });
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
    height: fit-content;
    margin-top: 10px;

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
.editor-buttons {
    display:flex;
    justify-content: flex-start;
    flex-direction: row-reverse;
    height: fit-content;
}
.btn{
    background: gray;
    color: white;
    margin: 5px;
    padding: 5px;
    border-radius: 4px;
    cursor: pointer;
    height: fit-content;
}
.save-button{
    background: rgb(58, 201, 58);
}
.discard-button{
    background: rgb(235, 62, 62);
}
.fa-plus-circle {
    transition-duration: 0.2s;
    cursor: pointer;
}
.fa-plus-circle:active {
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
.add-field-note-container.focus{
    padding-bottom: 0;
    height: fit-content!important;

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
.QA-text{
    width: 100%;

}
.fas {
    margin: 4px 4px;
}
.fa-sticky-note {
    color: rgb(59, 161, 230);
}
.fa-arrow-circle-down {
    color: rgb(45, 185, 87);
    cursor: pointer;
}
.fa-times-circle {
    color: rgb(236, 73, 73);
    cursor: pointer;

}
.fa-arrow-circle-left {
    color: rgb(45, 185, 87);
    cursor: pointer;
}
</style>