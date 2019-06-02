'use strict'

export default {
  install(Vue) {
    Vue.prototype.$bus = new Vue();

    Vue.prototype.$getParent = function(name) {
      let parent = this.$parent;

      if (typeof(name) === 'undefined')
        return parent;

      while (typeof(parent) !== 'undefined') {
        if (parent.$options.name === name)
          return parent;
        parent = parent.$parent;
      }

      return parent;
    }

    Vue.prototype.$reconnect = function(title) {
      const loading = this.$loading({
        text: title
      });

      const vm = this;

      function check() {
        vm.axios.get('/favicon.ico').then(() => {
          loading.close();
          vm.$router.push('/login');
        }).catch(() => {
          window.setTimeout(check, 5000);
        });
      }

      window.setTimeout(check, 5000);
    }
  }
}
