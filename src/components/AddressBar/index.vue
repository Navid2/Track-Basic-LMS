<template>
    <div class="title">

        <h1
            class="lesson-name"
            @click="$router.push({path: title.path,query:title.query,})"
        >
            {{ title.name }}
        </h1>
        <div class="path">
            <div class="path-item" v-for="node in directory" :key="node">

            <h3
                :class="['lesson-grade', `${grade}-title`]"
                @click="$router.push({path: node.path,query: node.query})"
            >
                {{ node.name }}
            </h3>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, Prop, PropType } from "vue";
interface Path{
    name:string,path:string,query:object
}
interface AddressBarProps{
    title:Path,
    grade:string,
    directory:Array<Path>
}
export default defineComponent({
    name: "AddressBar",
    data() {
        return {
            title: this.$props.title,
            // {
            //     name: "" /*the heading*/,
            //     path: "" /*Lesson, Grade, Unit,Subunit*/,
            //     query: {},/*e.g: {unit_id:'1111'} or {grade_id:'2121'}*/
            // },
            grade:this.$props.grade,
            directory:this.$props.directory
            // [{
            //     name: "" /*the heading*/,
            //     path: "" /*Lesson, Grade, Unit,Subunit*/,
            //     query: {},/*e.g: {unit_id:'1111'} or {grade_id:'2121'}*/
            // }]
        };
    },
    props:{
        title:{type:Object as PropType<Path>,required:true},
        grade:{type:String as PropType<string>,required:true},
        directory:{type:Array as PropType<Array<Path>>,required:true}
    },
    created(){
        // this.$data=this.$props;

    }
});
</script>
<style scoped>
.title {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
}

.lesson-grade {
    background: #525252;
    padding: 0px 8px;
    margin: 4px;
    border-radius: 4px;
    /* max-width: 80px; */
    height: 29px;
    cursor: pointer;
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
.path {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.path-item{
    
}
</style>