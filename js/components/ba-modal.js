// ba-modal.js
Vue.component('ba-modal', {
  template: '#tpl-modal',
  props: ['title'],
  methods: {
    close() { this.$emit('close'); }
  }
});