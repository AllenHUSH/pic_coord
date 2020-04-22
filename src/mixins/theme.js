export default {
    data() {
        return {
            // 系统暗色主题媒体查询
            theme: window.matchMedia("(prefers-color-scheme: dark)")
        }
    },
    created() {
        this.listenTheme();
        // 为媒体查询创建监听器
        this.theme.addListener(this.listenTheme)
    },
    methods: {
        // 当主题变量变化或系统主题变化时的监听函数
        listenTheme() {
            this.$vuetify.theme.dark = this.theme.matches;
        }
    }
}