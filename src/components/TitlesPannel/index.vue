<template>
    <div class="items">
        <div class="add-item">
            <input
                type="text"
                class="new-item-name"
                v-model="new_item_name"
                ref="input"
                v-on:keyup.enter="add(new_item_name)"
            />
            <div
                class="add"
                @click="add(new_item_name)"
                ref="add"
            >
                <i class="fas fa-plus" />
            </div>
        </div>

        <div
            v-if="new_item_name != ''"
            :class="['item', grade, 'add-item-preview']"
        >
            {{ new_item_name == "" ? "New Unit" : new_item_name }}
            <div class="icons">
                <i class="fas fa-angle-double-right" />
            </div>
        </div>
        <div class="submitted_items">
            <div
                v-for="(item) in items"
                :key="item"
                :class="['item', grade]"
            >
                <p
                    class="item-title"
                    @click="click(item.id)"
                >
                    {{ item.name }}
                </p>
                <div class="icons">
                    <i
                        @click="del(item.name, item.id)"
                        class="fas fa-times"
                    />
                    <i class="fas fa-angle-double-right" />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
interface item {
    id: number;
    name: string;
}

export default defineComponent({
    name: "TitlesPannel",
    data() {
        return {
            items: this.$props.items,
            grade: this.$props.grade,
            new_item_name: "",
        };
    },
    props: {
        items: Array,
        grade: String,
    },
    created() {
        var input:any = this.$refs.input;
        console.log(input)
        input?.addEventListener("keyup",  (event:any)=> {
            if (event.keyCode === 13) {
                event.preventDefault();
                (this.$refs.add as any).click();
                
            }
        });
    },
    methods: {
        log(text: string) {
            console.log(text);
        },
        del(subunit_title: string, id: number) {
            this.$emit("delete-item", subunit_title, id);
        },
        add(name: string) {
            this.$emit("add-item", name);
            this.new_item_name = "";
        },
        click(id: number) {
            this.$emit("item-clicked", id);
        },
    },
});
</script>
<style scoped>
@media only screen and (max-width: 600px) {
    .items {
        width: 100% !important;
    }
}
.container {
    max-height: 100%;
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
.submitted_items::-webkit-scrollbar {
    display: none;
}
.submitted_items {
    height: calc(100%);
    overflow: scroll;
}
.items {
    margin: 10px !important;
    padding: 0px;
    width: 70%;
    background: rgb(235, 235, 235);
    max-height: 100%;
    height: calc(fit-content);
    overflow: hidden;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
}
.item:active {
    transition: 0.1s;
    background: rgb(148, 148, 148) !important;
}
.item {
    padding: 10px;
    background: grey;
    margin: 10px;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.5s;
    display: flex;
    justify-content: space-between;
}
.item.ten {
    color: rgb(133, 216, 51);
    background: whitesmoke;
}
.item.eleven {
    color: rgb(135, 187, 255);
    background: whitesmoke;
}
.item.twelve {
    color: rgb(255, 205, 69);
    background: whitesmoke;
}
.item-title {
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: space-between;
    word-wrap: wrap;
    text-align: left;
    font-weight: 700;
    width: 100%;
}
.add-item {
    width: 100%;
    display: flex;
    align-items: center;
}
.new-item-name:focus {
    outline: none;
}
.new-item-name {
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
.add-item-preview {
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
    color: rgb(255, 109, 109);
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
</style>