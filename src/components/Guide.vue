<template>
  <div class="guide">
    <v-card class="mb-2">
      <v-card-title>第一步：选择本地图片</v-card-title>
      <v-card-text>仅支持jpg与png格式的图片。</v-card-text>
    </v-card>
    <v-card class="mb-2">
      <v-card-title>第二步：调整图片至合适的大小</v-card-title>
      <v-card-text>使用过程中也可以调节，不妨碍坐标生成。</v-card-text>
    </v-card>
    <v-card class="mb-2">
      <v-card-title>第三步：在图片上打点，并复制代码</v-card-title>
      <v-card-text>
        <p>点击图片，将添加相应的坐标位置至当前组。</p>
        <p>复制代码时，您可以选择复制为Js对象格式、Js数组格式、Cpp数组格式或直接生成OpenGl代码。</p>
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-left">格式</th>
              <th class="text-left">复制示例</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in form" :key="index">
              <td>{{item.name}}</td>
              <td>{{item.code}}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>
    <v-card >
      <v-card-title>第N步：管理组</v-card-title>
      <v-card-text>
        <p>删除、增加、选择分组。</p>
        <p>特别注意的是，新点击的点坐标将添加至当前被选择的分组中。</p>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: [
        {
          name: "Js对象",
          code: "[{x:0.1,y:0.1},{x:0.2,y:0.2}]"
        },
        {
          name: "Js数组",
          code: "[[0.1,0.1],[0.2,0.2]]"
        },
        {
          name: "Cpp数组",
          code: "double cppArray1[2][2] = {{0.1,0.1},{0.2,0.2}};"
        },
        {
          name: "OpenGL代码",
          code:
            "double cppArray1[2][2] = {{0.1,0.1},{0.2,0.2}};glColor3f(0.0f,0.0f,0.0f);glBegin(GL_LINE_LOOP);for(int i = 0;i<2;i++){glVertex2f(cppArray1[i][0],cppArray1[i][1]);}glEnd();"
        }
      ]
    };
  }
};
</script>
<style lang="stylus" scoped>
.guide {
  overflow-y: scroll;
}
</style>