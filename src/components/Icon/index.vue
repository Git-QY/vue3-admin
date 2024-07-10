<script lang="ts">
import { ElIcon } from 'element-plus'
export default defineComponent({
  name: 'Icon',
  props: {
    name: { type: String, required: true },
    size: { type: [String, Number], default: 16 },
    color: { type: String, default: 'inherit' },
  },
  setup(props) {
    return () => h(ElIcon, { size: props.size || '16px', color: props.color }, () => h(resolveComponent(props.name)))
  },
})
</script>
<style lang="scss" scoped></style>
