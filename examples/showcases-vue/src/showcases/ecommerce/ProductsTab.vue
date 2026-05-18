<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  SgTag,
  SgButton,
  SgInput,
  SgSelect,
  SgSegmented,
  SgDrawer,
  SgModal,
  SgForm,
  SgField,
  SgInputNumber,
  SgCascader,
  SgSwitch,
  SgCarousel,
  SgDescriptions,
  SgProgress,
  SgRate,
  notification,
} from '@skygraph/vue'
import { products as initial, categories, type Product } from './data'
import { useFilteredList, money, percent, statusColor, useAppLocale } from '../_shared'
import { emojiForProduct } from './common'

const lc = useAppLocale('ecommerce')
const p = lc.products
const search = ref('')
const category = ref<string>('all')
const statusFilter = ref<string>('all')
const sort = ref<string>('featured')
const view = ref<'grid' | 'list'>('grid')
const detail = ref<Product | null>(null)
const createOpen = ref(false)

const productsRef = ref<Product[]>(initial)
const filtered = useFilteredList(productsRef, search, ['name', 'sku', 'brand'])

const visible = computed<Product[]>(() => {
  let r = filtered.value as Product[]
  if (category.value !== 'all') r = r.filter((x) => x.category === category.value)
  if (statusFilter.value !== 'all') r = r.filter((x) => x.status === statusFilter.value)
  return [...r].sort((a, b) => {
    if (sort.value === 'featured') {
      if (a.featured !== b.featured) return a.featured ? -1 : 1
      return b.sold - a.sold
    }
    if (sort.value === 'price-asc') return a.price - b.price
    if (sort.value === 'price-desc') return b.price - a.price
    if (sort.value === 'rating') return b.rating - a.rating
    return b.sold - a.sold
  })
})

function statusLabel(status: string): string {
  const opts = lc.products.statusOptions as Record<string, string>
  return opts[status] ?? status
}

function onCreated(values: Record<string, unknown>) {
  notification.success(p.createdToast, JSON.stringify(values, null, 2))
  createOpen.value = false
}
</script>

<template>
  <div class="sc-toolbar" style="flex-wrap: wrap; gap: 12px">
    <SgInput
      :placeholder="p.searchPlaceholder"
      :value="search"
      :style="{ width: '220px' }"
      @update:model-value="(v: string) => (search = v)"
    />
    <SgSelect
      :value="category"
      :options="[
        { label: p.categoryAll, value: 'all' },
        { label: p.categoryOptions.electronics, value: 'Electronics' },
        { label: p.categoryOptions.clothing, value: 'Clothing' },
        { label: p.categoryOptions.homeGarden, value: 'Home & Garden' },
      ]"
      :style="{ width: '180px' }"
      @update:model-value="(v) => (category = String(v))"
    />
    <SgSelect
      :value="statusFilter"
      :options="[
        { label: p.statusAll, value: 'all' },
        { label: p.statusOptions.active, value: 'active' },
        { label: p.statusOptions.draft, value: 'draft' },
        { label: p.statusOptions.archived, value: 'archived' },
      ]"
      :style="{ width: '140px' }"
      @update:model-value="(v) => (statusFilter = String(v))"
    />
    <SgSelect
      :value="sort"
      :options="[
        { label: p.sortOptions.featured, value: 'featured' },
        { label: p.sortOptions.sold, value: 'sold' },
        { label: p.sortOptions.priceAsc, value: 'price-asc' },
        { label: p.sortOptions.priceDesc, value: 'price-desc' },
        { label: p.sortOptions.rating, value: 'rating' },
      ]"
      :style="{ width: '150px' }"
      @update:model-value="(v) => (sort = String(v))"
    />
    <div class="sc-toolbar-spacer" />
    <SgSegmented
      :value="view"
      :options="[
        { label: p.views.grid, value: 'grid' },
        { label: p.views.list, value: 'list' },
      ]"
      @change="(v: string | number) => (view = String(v) as 'grid' | 'list')"
    />
    <SgButton type="primary" @click="createOpen = true">{{ p.addBtn }}</SgButton>
  </div>

  <div class="prod-counts">{{ p.showing(visible.length, productsRef.length) }}</div>

  <div v-if="view === 'grid'" class="prod-grid">
    <div v-for="prod of visible" :key="prod.id" class="prod-card" @click="detail = prod">
      <div class="prod-card-img">
        {{ emojiForProduct(prod.name, prod.category) }}
        <span v-if="prod.featured" class="prod-badge">★ {{ p.featured }}</span>
        <span v-if="prod.tags.includes('sale')" class="prod-badge prod-badge--sale">{{
          p.sale
        }}</span>
      </div>
      <div class="prod-card-body">
        <div class="prod-card-name">{{ prod.name }}</div>
        <div class="prod-card-brand">{{ prod.brand }}</div>
        <div class="prod-card-price">
          <strong>{{ money(prod.price) }}</strong>
          <SgTag :color="statusColor(prod.status)" :style="{ fontSize: '10px' }">
            {{ statusLabel(prod.status) }}
          </SgTag>
        </div>
        <div class="prod-card-meta">
          <span>⭐ {{ prod.rating }}</span>
          <span>·</span>
          <span>{{ prod.sold.toLocaleString() }} {{ p.soldSuffix }}</span>
          <span>·</span>
          <span :style="prod.stock < 10 ? { color: 'var(--sg-color-error)' } : undefined">
            {{ prod.stock < 10 ? p.lowStockBadge(prod.stock) : p.inStock(prod.stock) }}
          </span>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="prod-list">
    <div v-for="prod of visible" :key="prod.id" class="prod-list-row" @click="detail = prod">
      <div class="prod-list-img">{{ emojiForProduct(prod.name, prod.category) }}</div>
      <div style="flex: 1; min-width: 0">
        <div class="prod-card-name">{{ prod.name }}</div>
        <div class="prod-card-meta">
          {{ prod.brand }} · ⭐ {{ prod.rating }} · {{ prod.sold.toLocaleString() }}
          {{ p.soldSuffix }} · {{ prod.tags.join(', ') }}
        </div>
      </div>
      <div style="width: 100px; text-align: right">
        <div style="font-weight: 600">{{ money(prod.price) }}</div>
        <div class="prod-margin">{{ percent(prod.margin) }} {{ p.marginSuffix }}</div>
      </div>
      <SgTag :color="statusColor(prod.status)">{{ statusLabel(prod.status) }}</SgTag>
    </div>
  </div>

  <SgDrawer :open="!!detail" :title="detail?.name ?? ''" :width="520" @close="detail = null">
    <template v-if="detail">
      <div style="display: flex; flex-direction: column; gap: 16px">
        <SgCarousel
          :autoplay="false"
          dots
          :style="{ background: 'var(--sg-color-bg-secondary)', borderRadius: '8px' }"
        >
          <div class="prod-carousel-slide">{{ emojiForProduct(detail.name, detail.category) }}</div>
          <div class="prod-carousel-slide">📦</div>
          <div class="prod-carousel-slide" style="font-size: 36px">
            {{ detail.featured ? '★' : '🆕' }}
          </div>
        </SgCarousel>

        <SgDescriptions
          :items="[
            { label: p.drawer.sku, value: detail.sku },
            { label: p.drawer.brand, value: detail.brand },
            { label: p.drawer.category, value: `${detail.category} → ${detail.subcategory}` },
            { label: p.drawer.price, value: money(detail.price) },
            { label: p.drawer.cost, value: money(detail.cost) },
            { label: p.drawer.margin, value: percent(detail.margin) },
            { label: p.drawer.stockReserved, value: `${detail.stock} / ${detail.reserved}` },
            { label: p.drawer.available, value: String(detail.available) },
            { label: p.drawer.status, value: statusLabel(detail.status) },
            { label: p.drawer.rating, value: String(detail.rating) },
            { label: p.drawer.sold, value: detail.sold.toLocaleString() },
            { label: p.drawer.revenue, value: money(detail.revenue) },
          ]"
          :column="2"
          size="small"
        />

        <div style="display: flex; align-items: center; gap: 12px">
          <span style="font-weight: 500">{{ p.drawer.rating }}:</span>
          <SgRate :value="detail.rating" disabled allow-half />
        </div>

        <h4>{{ p.drawer.tagsHeading }}</h4>
        <div style="display: flex; gap: 4px; flex-wrap: wrap">
          <SgTag v-for="t of detail.tags" :key="t">{{ t }}</SgTag>
        </div>

        <h4>{{ p.drawer.stockHealth }}</h4>
        <SgProgress
          :percent="Math.min(100, Math.round((detail.stock / 200) * 100))"
          :status="detail.stock < 10 ? 'error' : detail.stock < 30 ? 'active' : 'success'"
        />

        <h4>{{ p.drawer.descriptionHeading }}</h4>
        <p class="prod-desc">{{ detail.description }}</p>
      </div>
    </template>
  </SgDrawer>

  <SgModal
    :open="createOpen"
    :title="p.createTitle"
    footer="none"
    :width="560"
    @close="createOpen = false"
  >
    <SgForm @finish="onCreated">
      <SgField name="name" :label="p.fields.name" :rules="[{ required: true }]">
        <template #default="{ value, onChange }">
          <SgInput
            :value="(value as string) ?? ''"
            :placeholder="p.fields.namePh"
            @update:model-value="onChange"
          />
        </template>
      </SgField>
      <SgField name="category" :label="p.fields.category" :rules="[{ required: true }]">
        <template #default="{ value, onChange }">
          <SgCascader
            :options="categories"
            :value="(value as (string | number)[]) ?? []"
            :placeholder="p.fields.categoryPh"
            :style="{ width: '100%' }"
            @change="(v: (string | number)[]) => onChange(v)"
          />
        </template>
      </SgField>
      <SgField name="brand" :label="p.fields.brand">
        <template #default="{ value, onChange }">
          <SgSelect
            :value="value as string"
            :options="
              ['SkyTech', 'NeoBrand', 'CoreWave', 'PrimeGear', 'AlphaLine', 'ZenCraft'].map(
                (b) => ({
                  label: b,
                  value: b,
                }),
              )
            "
            :placeholder="p.fields.brandPh"
            @update:model-value="onChange"
          />
        </template>
      </SgField>
      <SgField name="price" :label="p.fields.price" :rules="[{ required: true }]">
        <template #default="{ value, onChange }">
          <SgInputNumber
            :value="value as number"
            :placeholder="p.fields.pricePh"
            :min="0"
            :step="0.01"
            :style="{ width: '100%' }"
            @update:model-value="onChange"
          />
        </template>
      </SgField>
      <SgField name="stock" :label="p.fields.stock" :rules="[{ required: true }]">
        <template #default="{ value, onChange }">
          <SgInputNumber
            :value="value as number"
            :placeholder="p.fields.stockPh"
            :min="0"
            :style="{ width: '100%' }"
            @update:model-value="onChange"
          />
        </template>
      </SgField>
      <SgField name="featured" :label="p.fields.featured">
        <template #default="{ value, onChange }">
          <SgSwitch :model-value="!!value" @update:model-value="onChange" />
        </template>
      </SgField>
      <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 12px">
        <SgButton @click="createOpen = false">{{ p.cancel }}</SgButton>
        <SgButton type="primary" html-type="submit">{{ p.create }}</SgButton>
      </div>
    </SgForm>
  </SgModal>
</template>

<style scoped>
.prod-counts {
  margin-top: 8px;
  margin-bottom: 12px;
  font-size: 12px;
  color: var(--sg-color-text-secondary);
}
.prod-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 14px;
}
.prod-card {
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: 10px;
  background: var(--sg-color-bg);
  cursor: pointer;
  transition: all 0.15s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.prod-card:hover {
  border-color: var(--sg-color-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.prod-card-img {
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 56px;
  background: linear-gradient(
    135deg,
    var(--sg-color-bg-secondary),
    color-mix(in srgb, var(--sg-color-primary) 6%, transparent)
  );
  position: relative;
}
.prod-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--sg-color-warning, gold);
  color: #fff;
}
.prod-badge--sale {
  left: auto;
  right: 8px;
  background: var(--sg-color-error, red);
}
.prod-card-body {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.prod-card-name {
  font-weight: 500;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.prod-card-brand {
  font-size: 11px;
  color: var(--sg-color-text-tertiary, var(--sg-color-text-secondary));
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.prod-card-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
  font-size: 14px;
}
.prod-card-meta {
  display: flex;
  gap: 6px;
  font-size: 11px;
  color: var(--sg-color-text-secondary);
  flex-wrap: wrap;
}
.prod-margin {
  font-size: 11px;
  color: var(--sg-color-text-secondary);
}
.prod-list {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: 8px;
  overflow: hidden;
}
.prod-list-row {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 10px 14px;
  border-bottom: 1px solid var(--sg-color-border-secondary);
  cursor: pointer;
  transition: background 0.12s;
}
.prod-list-row:last-child {
  border-bottom: none;
}
.prod-list-row:hover {
  background: var(--sg-color-bg-hover);
}
.prod-list-img {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--sg-color-bg-secondary);
  font-size: 28px;
  flex-shrink: 0;
}
.prod-carousel-slide {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
}
.prod-desc {
  font-size: 13px;
  color: var(--sg-color-text-secondary);
}
</style>
