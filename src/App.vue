<template>
    <section>
        <header>
        <Header />
        </header>
        <router-view />
        <div class="footer" v-if="footerDisplay">
            <Footer />
        </div>
    </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
export default defineComponent({
    components: {
        Footer,
        Header,
    },
    data() {
        return {
            deferredPrompt: null as any,
            footerDisplay:true
        };
    },
    created() {
    },
    methods: {
    },
});
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");
@import url("assets/fonts/IRANYekan/css/fontiran.css");
* {
    font-family: Poppins,IRANYekan;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    user-select: none;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-tap-highlight-color: transparent;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav h1 {
    color: rgb(58, 56, 32);
    font-weight: 900;
}
#nav {
    padding: 5px;
    position: sticky;
    width: 100%;
    background: #ffc830;
    box-shadow: rgba(0, 0, 0, 0.383) 2px 0px 10px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

html {
    height: 100%;
}
body {
    height: 100%;
}
section {
    max-width: 100vw;
    height: 100%;
    background: rgb(251, 251, 251);
    display: flex;
    flex-direction: column;
}
router-view {
    height: 100%;
    width: 100%;
}
.footer {
    width: 100%;
    color: aliceblue;
    position: relative;
    height: fit-content;
}
input,textarea{
    text-decoration: none;
}
</style>
