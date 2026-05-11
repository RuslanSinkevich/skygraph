# T-Vue-Demo-Header-Parity — decisions (Wave 3.4)

Записи решений вне явной карты `docs/_streams/wave-3/T-Vue-Demo-Header-Parity.md`.

---

## D1. FrameworkSwitcher: Vue активен, React/Angular задизейблены

**Контекст:** карта говорит «Кнопки React и Angular ведут на соседние демо
(URL — те же, что в React-аналоге). Использовать `<a href="…">`».

В React-эталоне `examples/demo/src/components/FrameworkSwitcher.tsx` все
три framework'а задаются массивом `FRAMEWORKS`, причём **только React —
`ready: true`**, Vue и Angular имеют `ready: false` (рендерятся как
disabled `<span>` с `aria-disabled="true"`).

**Решение:** в Vue-копии поменяли `ready` ровно по одной строке:
- `react` → `ready: false` (disabled span)
- `vue`   → `ready: true`  (активная вкладка)
- `angular` → `ready: false` (disabled span)

URL'ы (`/`, `/vue/`, `/angular/`) сохраняются 1:1 с React, так что когда
`demo-angular` будет готов и какой-нибудь будущий стрим поменяет
`ready: true` для него — обе копии раскроются параллельно.

**Альтернатива:** держать у React `ready: true`, чтобы клик в Vue вёл
на React-демо. Не выбрано: при `ready: true` рендерится `<a href="/">`,
который из dev-server'а Vue (порт 5174) ведёт на тот же сервер, не на
React. Это создаёт битый клик. Disabled-вариант честнее.

**Откат:** один файл — `examples/demo-vue/src/components/FrameworkSwitcher.vue`.

---

## D2. EventTimeline: рендер заголовка/тела через слот `event`

**Контекст:** React-`<EventTimeline>` принимает `title` и `description`
типа `React.ReactNode`, поэтому в `Roadmap.tsx` они напрямую — JSX
(`<RoadmapTitle/>`, `<RoadmapBody/>`).

Vue-`<SgEventTimeline>` (`packages/vue/src/components/complex/Timeline/
EventTimeline.vue`) интерполирует `title`/`description` через `{{ }}`,
т.е. строки. Сложный DOM (пилюли статуса, секционный заголовок) так не
получится.

**Решение:** использовать **слот `event`** компонента:

```vue
<SgEventTimeline :events="events">
  <template #event="{ event }">
    <div class="roadmap-event-title">…</div>
    <div class="roadmap-event-section">…</div>
    <div class="roadmap-event-body">…</div>
  </template>
</SgEventTimeline>
```

Каждое `event` содержит дополнительное поле `decorated` (типизировано
через локальный `RoadmapEvent extends TimelineEvent`) — это весь
исходный `{ item, section }`, по которому слот строит DOM.

Маркер тоже идёт через слот `marker`, как в React `renderMarker`.

**Альтернатива:** добавить в `packages/vue` пропсы `renderTitle/
renderDescription` 1:1 с React. Не выбрано: меняет публичный API Vue-
адаптера (зона packages/**, для нас read-only).

**Откат:** `examples/demo-vue/src/pages/Roadmap.vue`, `RoadmapEvent`
тип убирается, шаблон `#event` снимается.

---

## D3. 3 guide-страницы — stub'ы, 3 — полный порт

**Контекст:** карта (раздел «### 4. Guide-страницы»):
> getting-started / theming / styling-showcase — главные, перенести
> содержимое.
> design-tokens / core-api / config-provider — если в React есть
> страница, портировать; если нет, stub с заголовком и заглушкой
> «See React docs» (finding).

В реальности `core-api` оказался компактным (≈70 строк, 5 секций кода
без интерактивных компонентов) — проще портировать целиком.
`styling-showcase` — наоборот, ~900 строк с 15 интерактивными рецептами
(palette swatches, conditional rows, dark scope, headless modal,
per-feature brand с двумя `<input>` слайдерами и `<Table>`/`<List>`/
`<Modal>` поверх). И `design-tokens` зависит от `tokens-data`,
который не экспортирован из `_shared`.

**Решение:**

| Guide page          | Стратегия                  | Причина                                                                                                |
| ------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------ |
| getting-started     | **полный порт**            | компактно, идиоматичные Vue-сниппеты                                                                   |
| theming             | **полный порт**            | пара таблиц + код-сниппеты, framework-агностично                                                       |
| core-api            | **полный порт** (а не stub)| код-сниппеты `@skygraph/core` одинаковы для React/Vue                                                  |
| styling-showcase    | **stub**                   | 900 строк интерактива; компоненты `<Table>`/`<List>`/`<Modal>` Vue в наличии, но порт ≥1 дня — finding |
| design-tokens       | **stub**                   | завязка на `tokens-data` из `examples/demo/src/tokens/`, не экспортирован — finding                    |
| config-provider     | **stub** + ссылка на `/components/configprovider` | в React эта guide-секция = `ConfigProviderDemo`. Vue уже имеет `ConfigProviderDemo.vue` под `/components/`, дублировать смысла нет |

Все три stub'а используют общий i18n-блок `t.guideStub.*` и контракт
`.doc-page` (стилизация уже есть в `style.css`), поэтому навигация
работает 1:1.

Findings со списком отложенных работ — `findings/T-Vue-Demo-Header-
Parity.md#guide-stubs`.

**Откат:** заменить три stub-файла полным портом — изменения только в
`examples/demo-vue/src/guide/{StylingShowcase,DesignTokens,
ConfigProviderGuide}.vue` и связанных i18n-ключах.

---

## D4. CoreApi guide импортирует `@skygraph/vue`-пример нет

**Контекст:** React-эталон `CoreApiPage.tsx` выводит код
`createCore(), createForm(core), …` — все вызовы идут через
`@skygraph/core`, фреймворк-независимо.

**Решение:** Vue-копия использует **точно те же сниппеты**, потому что
`@skygraph/core` — единое API для всех адаптеров. Никаких Vue-
специфичных переписей. Это упрощает поддержку: текст меняется в одном
месте (i18n), оба порта расходятся максимум по форматированию.

---

## D5. menuItems.overview не портируем

**Контекст:** React `DemoDict.menuItems` содержит ключ `overview` —
ссылка на `/landing` из guide-сайдбара. У Vue-сайдбара такой записи
нет (Wave 3.4 строит `buildGuideSidebar` ровно по 6 пунктам, без
overview), и в App.vue нет «landing» в guide-секции.

**Решение:** в `DemoDict.menuItems` Vue **не** добавлять `overview`.
Оставляем 6 ключей: `gettingStarted`, `stylingShowcase`, `theming`,
`designTokens`, `coreApi`, `configProvider`. Если будущий стрим
захочет overview-пункт — это будет point-fix.
