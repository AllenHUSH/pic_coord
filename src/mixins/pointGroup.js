export default {
    data() {
        return {
            pointGroupList: [
                []
            ],
            selectGroupIndex: 0
        }
    },
    watch: {
        pointGroupList(val) {
            if (this.selectGroupIndex >= val.length) {
                this.selectGroup(val.length - 1)
            }
        }
    },
    methods: {
        copyCode(index, type) {
            if (!this.pointGroupList[index].length) {
                return
            }
            let copyContent = "";
            if (type == "jsobject") {
                copyContent += "[";
                this.pointGroupList[index].forEach(element => {
                    copyContent += `{x:${element.x},y:${element.y}},`
                });
                copyContent = copyContent.substr(0, copyContent.length - 1);
                copyContent += "]"
            } else if (type == "jsarray") {
                copyContent += "[";
                this.pointGroupList[index].forEach(element => {
                    copyContent += `[${element.x},${element.y}],`
                });
                copyContent = copyContent.substr(0, copyContent.length - 1);
                copyContent += "]"
            } else if (type == "cpparray") {
                copyContent += `double cppArray${index+1}[${this.pointGroupList[index].length}][2] = {`;
                this.pointGroupList[index].forEach(element => {
                    copyContent += `{${element.x},${element.y}},`
                });
                copyContent = copyContent.substr(0, copyContent.length - 1);
                copyContent += "};"
            } else if (type == "opengl") {
                copyContent += `double cppArray${index+1}[${this.pointGroupList[index].length}][2] = {`;
                this.pointGroupList[index].forEach(element => {
                    copyContent += `{${element.x},${element.y}},`
                });
                copyContent = copyContent.substr(0, copyContent.length - 1);
                copyContent += `};glColor3f(0.0f,0.0f,0.0f);glBegin(GL_LINE_LOOP);for(int i = 0;i<${this.pointGroupList[index].length};i++){glVertex2f(cppArray${index+1}[i][0],cppArray${index+1}[i][1]);}glEnd();`
            }
            this.copy(copyContent)
            console.log(copyContent);
        },
        copy(content) {
            let input = document.createElement("input"); // 直接构建input
            input.value = content; // 设置内容
            document.body.appendChild(input); // 添加临时实例
            input.select();
            document.execCommand("copy");
            document.body.removeChild(input); // 删除临时实例
        },
        deletePoint(index, pointIndex) {
            this.pointGroupList[index].splice(pointIndex, 1)
        },
        selectGroup(index) {
            this.selectGroupIndex = index;
        },
        appendGroup(index) {
            this.pointGroupList.splice(index + 1, 0, []);
        },
        deleteGroup(index) {
            this.pointGroupList.splice(index, 1)
        }
    }
}