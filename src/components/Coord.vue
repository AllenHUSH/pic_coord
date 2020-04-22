<template>
  <div class="pic-coord">
    <!-- 图片显示 -->
    <transition name="fade-transition">
      <img
        v-show="imageUrl"
        id="coord"
        ref="coord"
        @mousemove="mousemove"
        @click="recordPoint"
        :src="imageUrl"
        :width="relWidth"
      />
    </transition>
    <!-- 上传按钮 -->
    <el-upload
      action
      :multiple="false"
      :auto-upload="false"
      :show-file-list="false"
      :on-change="changeImg"
    >
      <v-btn color="primary" dark>选择本地图片</v-btn>
    </el-upload>
    <!-- 操作 -->
    <div v-show="imageUrl">
      <h2>{{`X:${x} Y:${y}`}}</h2>
      <v-slider v-model="relWidth" min="1" max="1000" label="图片宽度"></v-slider>
    </div>
    <!-- 点分组 -->
    <v-card class="mt-2" v-for="(pointList, index) in pointGroupList" :key="index">
      <v-card-title>第{{index+1}}组 共计{{pointList.length}}个点</v-card-title>
      <v-card-text>
        <v-chip
          v-for="(point, pointIndex) in pointGroupList[index]"
          :key="pointIndex"
          close
          @click:close="deletePoint(index, pointIndex)"
        >{{point.x}},{{point.y}}</v-chip>
        <div class="mt-2">
          <v-menu offset-y open-on-hover>
            <template v-slot:activator="{ on }">
              <v-btn color="primary" class="mr-1" outlined v-on="on">
                <v-icon>mdi-file</v-icon>复制代码
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-btn color="primary" class="mr-1" outlined @click="copyCode(index,'jsobject')">JS对象</v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn color="primary" class="mr-1" outlined @click="copyCode(index,'jsarray')">JS数组</v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn color="primary" class="mr-1" outlined @click="copyCode(index,'cpparray')">CPP数组</v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn
                  color="primary"
                  class="mr-1"
                  outlined
                  @click="copyCode(index,'opengl')"
                >OpenGL</v-btn>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-btn
            color="success"
            class="mr-1"
            :outlined="!(index==selectGroupIndex)"
            @click="selectGroup(index)"
          >
            <v-icon>mdi-check</v-icon>选中此组
          </v-btn>
          <v-btn color="success" class="mr-1" outlined @click="appendGroup(index)">
            <v-icon>mdi-plus</v-icon>追加组
          </v-btn>
          <v-btn
            color="error"
            outlined
            :disabled="pointGroupList.length==1"
            @click="deleteGroup(index)"
          >
            <v-icon>mdi-delete</v-icon>删除此组
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import pointGroup from "@/mixins/pointGroup";
export default {
  name: "app",
  mixins: [pointGroup],
  data() {
    return {
      mouseX: 0.0,
      mouseY: 0.0,
      relWidth: 300,
      absWidth: 0,
      absHeight: 0,
      imageUrl: ""
    };
  },
  computed: {
    // 坐标
    x() {
      return ((this.mouseX - this.relWidth / 2) / (this.relWidth / 2)).toFixed(
        3
      );
    },
    y() {
      return (
        (this.relHeight / 2 - this.mouseY) /
        (this.relHeight / 2)
      ).toFixed(3);
    },
    // 相对高度
    relHeight() {
      return (this.absHeight * this.relWidth) / this.absWidth;
    }
  },
  methods: {
    // 鼠标移动事件
    mousemove(event) {
      this.mouseX = event.offsetX;
      this.mouseY = event.offsetY;
    },
    // 点击时记录当前点位置
    recordPoint() {
      this.pointGroupList[this.selectGroupIndex].push({ x: this.x, y: this.y });
    },
    // 监听图片变化
    changeImg(res, files) {
      let file = files[files.length - 1];
      const isJPG = file.type === "image/jpeg" || "image/png";
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或PNG 格式!");
        return;
      }
      this.imageUrl = URL.createObjectURL(file.raw);
      this.getImgHeight();
    },
    // 获取图片的实际尺寸
    getImgHeight() {
      let img = new Image();
      img.src = this.imageUrl;
      img.onload = () => {
        this.absWidth = img.width;
        this.absHeight = img.height;
      };
    }
  }
};
</script>
