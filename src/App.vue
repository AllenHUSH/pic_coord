<template>
  <v-app>
    <v-app-bar app dense>
      <v-toolbar-title>图片相对坐标打点</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn text @click="showGuide = !showGuide">
        <span class="mr-2">指南</span>
        <v-icon>mdi-book</v-icon>
      </v-btn>
      <v-btn href="https://github.com/AllenHUSH/pic_coord" target="_blank" text>
        <span class="mr-2">Github</span>
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-dialog v-model="showGuide">
          <Guide />
        </v-dialog>
        <Coord />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Coord from "@/components/Coord";
import Guide from "@/components/Guide";
import theme from '@/mixins/theme'

export default {
  name: "App",

  mixins:[theme],

  components: {
    Coord,
    Guide
  },
  data() {
    return {
      showGuide: false
    };
  }
};
</script>
