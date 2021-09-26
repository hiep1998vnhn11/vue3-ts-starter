<template>
  <div style="height: 200vh">
    <button @click="toggleValue"> Toggle 1 {{ value }} </button>
    <FadeTransition>
      <div v-if="value" class="testttt"> 123 </div>
    </FadeTransition>

    <button @click="setToggle"> Toggle 1 {{ toggle }} </button>
    <CollapseTransition>
      <div v-if="toggle" class="testttt"> 123 </div>
    </CollapseTransition>
    <AppLink to="/"> Google </AppLink>
  </div>
</template>
<script lang="ts">
  import { ref, onMounted } from 'vue'
  import usePrevious from '../hooks/usePrevious'
  import { useLocalStorage } from '../hooks/useStorage'
  import useToggle from '/@/hooks/useToggle'
  import { ZoomCenterTransition } from '/@/components/Transition'
  import { FadeTransition, CollapseTransition } from '/@/components/TransitionC'
  import AppLink from '/@/components/AppLink.vue'
  import { useRouter } from 'vue-router'
  const data = {
    data: 123,
  }
  export default {
    components: { ZoomCenterTransition, FadeTransition, CollapseTransition, AppLink },
    setup() {
      const count = ref(0)
      const router = useRouter()
      const [value, toggleValue] = useToggle(false)
      const [toggle, setToggle] = useToggle(false)
      const previous = usePrevious(count)
      const clickOutside = () => console.log(123)
      const [storage, setStorage] = useLocalStorage('name', 'hiep')
      const increate = () => setStorage('HiepTran')
      onMounted(async () => {
        await router.addRoute({
          name: 'user',
          path: '/user/:url',
          component: () => import('./user/_url.vue'),
        })
      })
      return {
        increate,
        count,
        storage,
        previous,
        data,
        clickOutside,
        value,
        toggleValue,
        toggle,
        setToggle,
      }
    },
  }
</script>
<style lang="scss" scoped>
  .testttt {
    width: 100%;
    height: 100px;
    background: red;
  }
</style>
