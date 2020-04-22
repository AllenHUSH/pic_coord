<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>图片相对坐标打点</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Github</span>
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <Coord />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Coord from "./components/Coord";

export default {
  name: "App",

  components: {
    Coord
  }
};
</script>
