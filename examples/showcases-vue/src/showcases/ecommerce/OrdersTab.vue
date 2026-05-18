<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  SgTable,
  SgTag,
  SgButton,
  SgModal,
  SgSteps,
  SgForm,
  SgField,
  SgSelect,
  SgInputNumber,
  SgDescriptions,
  SgBadge,
  notification,
  type TableColumn,
} from '@skygraph/vue'
import { orders, orderToRow, orderStatusStep, type Order } from './data'
import { Toolbar, useFilteredList, money, statusColor, useAppLocale } from '../_shared'

const o = useAppLocale('ecommerce').orders

const search = ref('')
const orderDetail = ref<Order | null>(null)
const refundModal = ref<Order | null>(null)

const ordersRef = ref<Order[]>(orders)
const filtered = useFilteredList(ordersRef, search, ['id', 'customer', 'email'])
const tableData = computed(() => (filtered.value as Order[]).map(orderToRow))

function statusText(s: string): string {
  const lbl = o.statusLabel as Record<string, string>
  return lbl[s] ?? s
}

const columns: TableColumn[] = [
  { key: 'id', title: o.columns.order, width: 120, fixed: 'left' },
  { key: 'customer', title: o.columns.customer, width: 140, sortable: true },
  { key: 'total', title: o.columns.total, width: 110, sortable: true, align: 'right' },
  {
    key: 'status',
    title: o.columns.status,
    width: 110,
    filters: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'].map((v) => ({
      text: statusText(v),
      value: v,
    })),
    onFilter: (value, row) => row.status === value,
  },
  { key: 'date', title: o.columns.date, width: 110, sortable: true },
  { key: 'itemCount', title: o.columns.items, width: 70, align: 'center' },
  { key: 'actions', title: '', width: 130 },
]

function refundFor(id: string): Order | undefined {
  return orders.find((x) => x.id === id)
}

function onRefundFinish(values: Record<string, unknown>) {
  if (!refundModal.value) return
  notification.success(o.refundToast(`$${values.amount}`, refundModal.value.id))
  refundModal.value = null
}

function markPaid() {
  if (!orderDetail.value) return
  notification.success(o.markPaidToast(orderDetail.value.id))
  orderDetail.value = null
}

function reasonOptions() {
  return [
    { label: o.refundFields.reasonOptions.defective, value: 'defective' },
    { label: o.refundFields.reasonOptions.wrongItem, value: 'wrong_item' },
    { label: o.refundFields.reasonOptions.request, value: 'customer_request' },
    { label: o.refundFields.reasonOptions.damage, value: 'shipping_damage' },
    { label: o.refundFields.reasonOptions.other, value: 'other' },
  ]
}
</script>

<template>
  <Toolbar v-model:searchValue="search" :search-placeholder="o.searchPlaceholder">
    <template #actions>
      <SgButton size="small" @click="notification.info(o.exportToast)">{{ o.exportBtn }}</SgButton>
    </template>
  </Toolbar>

  <SgTable
    :columns="columns"
    :data="tableData"
    :page-size="10"
    size="small"
    bordered
    striped
    sticky
  >
    <template #cell="{ column, row, id, value }">
      <span v-if="column.key === 'id'" :style="{ fontWeight: 500, fontFamily: 'monospace' }">{{
        value
      }}</span>
      <template v-else-if="column.key === 'total'">{{ money(Number(value)) }}</template>
      <SgTag v-else-if="column.key === 'status'" :color="statusColor(String(value))">{{
        statusText(String(value))
      }}</SgTag>
      <SgBadge v-else-if="column.key === 'itemCount'" :count="Number(value)" />
      <div v-else-if="column.key === 'actions'" style="display: flex; gap: 4px">
        <SgButton
          size="small"
          @click="
            () => {
              const ord = refundFor(String(id))
              if (ord) orderDetail = ord
            }
          "
          >{{ o.actions.details }}</SgButton
        >
        <SgButton
          v-if="row.status === 'paid' || row.status === 'delivered'"
          size="small"
          @click="
            () => {
              const ord = refundFor(String(id))
              if (ord) refundModal = ord
            }
          "
          >{{ o.actions.refund }}</SgButton
        >
      </div>
      <template v-else>{{ value }}</template>
    </template>
  </SgTable>

  <SgModal
    :open="!!orderDetail"
    :title="o.detailTitle(orderDetail?.id ?? '')"
    :width="600"
    @close="orderDetail = null"
  >
    <template #footer>
      <div style="display: flex; gap: 8px; justify-content: flex-end">
        <SgButton @click="orderDetail = null">{{ o.close }}</SgButton>
        <SgButton
          v-if="orderDetail && orderDetail.status === 'pending'"
          type="primary"
          @click="markPaid"
          >{{ o.markPaid }}</SgButton
        >
      </div>
    </template>
    <template v-if="orderDetail">
      <div style="display: flex; flex-direction: column; gap: 16px">
        <SgSteps
          v-if="orderDetail.status !== 'cancelled'"
          :current="orderStatusStep[orderDetail.status]"
          :items="[
            { title: o.steps.pending },
            { title: o.steps.paid },
            { title: o.steps.shipped },
            { title: o.steps.delivered },
          ]"
          size="small"
        />
        <SgTag v-else color="error">{{ o.steps.cancelled }}</SgTag>

        <SgDescriptions
          :items="[
            { label: o.descriptions.customer, value: orderDetail.customer },
            { label: o.descriptions.email, value: orderDetail.email },
            { label: o.descriptions.address, value: orderDetail.address },
            { label: o.descriptions.date, value: orderDetail.date },
            { label: o.descriptions.total, value: money(orderDetail.total) },
            { label: o.descriptions.items, value: String(orderDetail.items.length) },
          ]"
          :column="2"
          size="small"
        />

        <h4>{{ o.itemsHeading }}</h4>
        <div class="ord-items">
          <div class="ord-items-head">
            <span style="flex: 1">{{ o.itemsTable.product }}</span>
            <span style="width: 60px; text-align: center">{{ o.itemsTable.qty }}</span>
            <span style="width: 80px; text-align: right">{{ o.itemsTable.price }}</span>
            <span style="width: 80px; text-align: right">{{ o.itemsTable.subtotal }}</span>
          </div>
          <div v-for="(it, i) of orderDetail.items" :key="i" class="ord-items-row">
            <span style="flex: 1">{{ it.name }}</span>
            <span style="width: 60px; text-align: center">{{ it.qty }}</span>
            <span style="width: 80px; text-align: right">{{ money(it.price) }}</span>
            <span style="width: 80px; text-align: right; font-weight: 500">{{
              money(it.price * it.qty)
            }}</span>
          </div>
        </div>
      </div>
    </template>
  </SgModal>

  <SgModal
    :open="!!refundModal"
    :title="o.refundTitle(refundModal?.id ?? '')"
    footer="none"
    :width="440"
    @close="refundModal = null"
  >
    <template v-if="refundModal">
      <SgForm @finish="onRefundFinish">
        <SgDescriptions
          :items="[
            { label: o.refundFields.order, value: refundModal.id },
            { label: o.refundFields.customer, value: refundModal.customer },
            { label: o.refundFields.orderTotal, value: money(refundModal.total) },
          ]"
          :column="1"
          size="small"
          :style="{ marginBottom: '16px' }"
        />
        <SgField name="amount" :label="o.refundFields.amount" :rules="[{ required: true }]">
          <template #default="{ value, onChange }">
            <SgInputNumber
              :value="value as number"
              :min="0"
              :max="refundModal.total"
              :step="0.01"
              :style="{ width: '100%' }"
              @update:model-value="onChange"
            />
          </template>
        </SgField>
        <SgField name="reason" :label="o.refundFields.reason" :rules="[{ required: true }]">
          <template #default="{ value, onChange }">
            <SgSelect
              :value="value as string"
              :options="reasonOptions()"
              :placeholder="o.refundFields.reasonPh"
              @update:model-value="onChange"
            />
          </template>
        </SgField>
        <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 12px">
          <SgButton @click="refundModal = null">{{ o.cancel }}</SgButton>
          <SgButton type="primary" html-type="submit">{{ o.issueRefund }}</SgButton>
        </div>
      </SgForm>
    </template>
  </SgModal>
</template>

<style scoped>
.ord-items {
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: 6px;
  overflow: hidden;
}
.ord-items-head {
  display: flex;
  padding: 8px 12px;
  background: var(--sg-color-bg-secondary);
  font-size: 12px;
  font-weight: 600;
}
.ord-items-row {
  display: flex;
  padding: 8px 12px;
  border-top: 1px solid var(--sg-color-border-secondary);
  font-size: 13px;
}
</style>
