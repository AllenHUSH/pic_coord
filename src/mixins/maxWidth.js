export default {
    data() {
        return {
            maxWidth: 1000,
        }
    },
    mounted() {
        window.onresize = () => {
            return (() => {
                this.maxWidth = document.getElementsByClassName('pic-coord')[0].offsetWidth
            })();
        };
    },
}