<template>
    
  <div id="nav">
    <h1>{{$route.name}}</h1>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name:'Header'
})
</script>
<style scoped>

#nav h1{
  color: rgba(0, 0, 0, 0.521);
  font-weight: 900;
}
#nav {
  padding: 2px;
  position: sticky;
  width: 100%;
    background: #e2e2e2;
  box-shadow: rgba(0, 0, 0, 0.383) 2px 0px 10px;
  z-index: 1;
  font-size: 15px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

</style>