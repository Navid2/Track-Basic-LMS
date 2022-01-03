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
            v-for="(note, index) in notes"
            :key="note"
            :class="[
                'note-container',
                note.focus ? 'focus' : '',
                note.active ? '' : 'inactive',
            ]"
            id="scrollview"
        >
            <div :class="['note', note.focus ? 'focus' : '']" @dblclick="startEdit(note,index)">
                <i class="fas fa-sticky-note"></i>
                <i
                    v-if="!note.focus"
                    class="fas fa-arrow-down"
                    @click="focusOn(index)"
                ></i>
                <i
                    v-if="note.focus"
                    class="fas fa-arrow-left"
                    @click="unfocus()"
                ></i>
                <p :class="['note-text', note.focus ? 'focus' : '']">
                    {{ note.text }}
                </p>
                <i
                    class="fas fa-times"
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
        this.notes=[]
        let Notes=this.$props.Notes;
        Notes?.map((note)=>{
            this.notes.push({active:true,focus:false,text:note});

        })
    },
    data() {
        return {
            newNote: "",
            scrollTop:0,
            addField: { active: true, focus: false },
            focus: false,
            notes: [] as Array<{text:string,active:boolean,focus:boolean}>,
            editing:false,
            editingNoteIndex:null as number|null
        };
    },
    watch: {
        //maximize and minimize the editor
        newNote: function (newNote) {
            if (newNote.length > 4) {
                this.addField.active = true;
                this.addField.focus = true;
                this.notes.map((note: { active: boolean }) => {
                    note.active = false;
                });
            } else {
                if(!this.editing){

                    this.addField.active = true;
                    this.addField.focus = false;
                    this.notes.map((note: { active: boolean }) => {
                        note.active = true;
                    });
                }
            }
        },
    },
    props: {
        Notes: {type:Array as PropType<Array<string>>},
    },
    methods: {
        addNote() {
            if(this.editing){
                this.$emit("edit-note", {note:this.newNote,index:this.editingNoteIndex});
                this.editingNoteIndex=null;
                this.addField.focus=false;
                this.editing=false;
            }else{
                this.$emit("new-note", this.newNote);
            }
            this.newNote = "";
        },
        startEdit(note:{text:string,active:boolean,focus:boolean},index:number){
            this.addField.active=true;
            this.addField.focus=true;
            this.editing=true;
            this.newNote=note.text;
            this.editingNoteIndex=index;
            this.focus=false;
            this.hideNotes();
        },
        deleteText(){
            this.newNote = "";
            this.addField.active=true;
            this.addField.focus=false;
            this.editing=false;
            this.displayNotes()
        },
        deleteNote(index:number){
            confirm('You are about to delete your note, are you sure?')?this.$emit("delete-note",index):()=>{}
            // console.log(index)

        },

            hideNotes(){
                this.notes.map((note)=>{
                    note.active=false;
                    note.focus=false;
                })
            },
            displayNotes(){
                this.notes.map((note)=>{
                    note.active=true;
                    note.focus=false;
                })
            },
        focusOn(fIndex: number) {

            this.scrollTop=(this.$el.querySelector('#scrollview') as HTMLElement).scrollTop;

            this.addField.active = false;
            this.addField.focus = false;

            this.focus = true;
            this.notes.map((note, index) => {
                if (fIndex == index) {
                    note.active = true;
                    note.focus = true;
                } else {
                    note.active = false;
                    note.focus = false;
                }
            });
        },
        unfocus() {

            (this.$el.querySelector('#scrollview') as HTMLElement).scrollTop=this.scrollTop;

            this.addField.active = true;
            this.addField.focus = false;

            this.focus = false;
            this.notes.map((note) => {
                note.active = true;
                note.focus = false;
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
    transition-duration: 0.2s;
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
    height: 100px;
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
    transition: .2s;
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
    transition: .2s;
}
.inactive {
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
    transition-duration:.2s;
    height: 45px;
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
    display: flex;
    align-items: baseline;

    overflow: hidden;
    height: 25px;
    direction: rtl;
    overflow: hidden;
    white-space: pre-wrap;
}
.note-text.focus {
    height: 100%;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow: scroll;
}
.fas {
    margin: 4px 4px;
}
.fa-sticky-note {
    color: rgb(59, 161, 230);
}
.fa-arrow-down {
    color: rgb(45, 185, 87);
    cursor: pointer;
}
.fa-times {
    color: rgb(236, 73, 73);
    cursor: pointer;

}
.fa-arrow-left {
    color: rgb(45, 185, 87);
    cursor: pointer;
}
</style>