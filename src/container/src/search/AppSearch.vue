<script lang="tsx">
  import { defineComponent, ref, unref } from 'vue'
  import AppSearchModal from './AppSearchModal.vue'

  export default defineComponent({
    name: 'AppSearch',
    setup() {
      const showModal = ref(false)
      function changeModal(show: boolean) {
        showModal.value = show
      }

      return () => {
        return (
          <div class="p-1" onClick={changeModal.bind(null, true)}>
            <div>
              {{
                title: () => 'common.searchText',
                default: () => <button />,
              }}
            </div>
            <AppSearchModal onClose={changeModal.bind(null, false)} visible={unref(showModal)} />
          </div>
        )
      }
    },
  })
</script>
