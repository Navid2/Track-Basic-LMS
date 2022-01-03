<template>
    <div class="container">
        <h1 class="title">Settings</h1>
        <div class="settings">

            <ul class="settings-list">
                <li class="item">
                    <i :class="['fas','settings-item-icon','fa-user-edit']" />
                    <h3 class="setting-title">My Account</h3>
                </li>
                <li class="item">
                    <i :class="['fas','settings-item-icon','fa-tag']" />
                    <h3 class="setting-title">Roles & Groups</h3>
                </li>
                <li class="item">
                    <i :class="['fas','settings-item-icon','fa-boxes']" />
                    <h3 class="setting-title">Integrations</h3>
                </li>
                <li class="item">
                    <i :class="['fas','settings-item-icon','fa-question']" />
                    <h3 class="setting-title">About</h3>
                </li>
            </ul>
            <div class="inner-settings-container">
              <div class="settings-placeholder" v-if="!tabActive">
                <p>Settings</p>
                    <i :class="['fas','fa-cog']" />
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "Settings",
    data() {
        return {
            settings: [],
            tabActive:false,
        };
    },
});
</script>

<style scoped>

@media only screen and (max-width: 600px) {
  .inner-settings-container{
    display: none!important;
    
  }
  .item:hover{
    background: transparent;
  }
  .item:active{
  background: rgba(0, 0, 0, 0.1)!important;

}
}
.container {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    overflow-x:hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}
.container::-webkit-scrollbar {
    display: none;
}
.title {
    text-align: left;
    margin: 0 20px;
    margin-bottom:20px;
    width: 100%;
    font-weight: 600;
    font-size: 40px;
}
.settings {
    width: 100%;
    height: 100%;
    border-radius:4px;
    display: flex;
    background: rgba(0, 0, 0, 0.05);
}
.settings-list {
    margin-bottom:0;
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    flex: 1;
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.05);
}
.inner-settings-container {
    flex: 2;
    display: flex;
}
.item:hover{
  background: rgba(0, 0, 0, 0.1);

}
.item {
    display: flex;
    align-items: center;
    padding: 4px;
    border-radius: 4px;
    background: transparent;
    transition-duration: .2s;
    cursor: pointer;
    margin:3px 0;
}
.fas {
    margin: 5px;
}
.settings-item-icon{

  width:40px;
  padding:auto;
  color:grey;

}
.setting-title {
    font-weight: 400;
}
.settings-placeholder{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size:70px;
  color:rgba(0, 0, 0, 0.253);
  font-weight:900;
}
.fa-cog{

  animation-name:cog;
  animation-duration:6s;
  animation-delay:0s;
  animation-iteration-count: infinite;
}

@keyframes cog{
  100%{
    transform:rotate(360deg)
  }
}
</style>
