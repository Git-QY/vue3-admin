<template>
  <template v-if="!item.type || item.type === 'input'">
    <el-input v-model="form[item.prop]" :placeholder="`请输入${item.label}`" v-bind="item.props"></el-input>
  </template>
  <template v-if="item.type === 'textarea'">
    <el-input type="textarea" v-model="form[item.prop]" :placeholder="`请输入${item.label}`"></el-input>
  </template>
  <template v-if="item.type === 'select'">
    <el-select v-model="form[item.prop]" :placeholder="`请选择${item.label}`" v-bind="item.props" style="width: 100%">
      <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value"> </el-option>
    </el-select>
  </template>
  <template v-if="item.type === 'tree-select'">
    <el-tree-select v-model="form[item.prop]" :placeholder="`请选择${item.label}`" :data="item.options" check-strictly :render-after-expand="false" v-bind="item.props" style="width: 100%">
    </el-tree-select>
  </template>
  <template v-if="item.type === 'switch'">
    <el-switch v-model="form[item.prop]" v-bind="item.props"></el-switch>
  </template>
  <template v-if="item.type === 'input-number'">
    <el-input-number v-model="form[item.prop]" v-bind="item.props"></el-input-number>
  </template>
  <template v-if="item.type === 'radio-group'">
    <el-radio-group v-model="form[item.prop]" v-bind="item.props">
      <el-radio v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value"> </el-radio>
    </el-radio-group>
  </template>
  <template v-if="item.type === 'radio-group-button'">
    <el-radio-group v-model="form[item.prop]" v-bind="item.props">
      <el-radio-button v-for="option in item.options" :key="option.value" :label="option.value">
        {{ option.label }}
      </el-radio-button>
    </el-radio-group>
  </template>
  <template v-if="item.type === 'icon-selector'">
    <IconSelector v-model="form[item.prop]" style="width: 100%">
      <template #default="{ value }">
        <el-input :value="value" v-bind="item.props" readonly>
          <template #prefix>
            <svg-icon :iconName="value" />
          </template>
        </el-input>
      </template>
    </IconSelector>
  </template>
  <template v-if="item.type === 'upload'">
    <Upload v-model="form[item.prop]" v-bind="item.props"></Upload>
  </template>
  <template v-if="item.type === 'region'">
    <Region v-model="form[item.prop]" v-bind="item.props"></Region>
  </template>
  <!-- 日期选择 -->
  <template v-if="item.type === 'date'">
    <el-date-picker v-model="form[item.prop]" type="date" v-bind="item.props"></el-date-picker>
  </template>
  <!-- 日期范围选择 -->
  <template v-if="item.type === 'daterange'">
    <el-date-picker v-model="form[item.prop]" type="daterange" unlink-panels range-separator="To" start-placeholder="Start date" end-placeholder="End date" />
  </template>
</template>

<script setup lang="ts">
defineProps<{ item: any; form: any }>()
</script>
<style lang="scss" scoped></style>
