# T-Showcases-I18n — decisions

## Решение 1. Передача locale в апп

В апп ничего не приходит через пропсы (`<LazyComp />` рендерится без аргументов).
Ввести проп `locale` всем 12 апп = инвазивно: меняется сигнатура каждого
default-экспорта и всех вложенных табов.

**Принятый вариант:** React Context.

- Файл `examples/showcases/src/showcases/_shared/showcaseLocaleContext.tsx`
  объявляет `ShowcaseLocaleContext`, провайдер `ShowcaseLocaleProvider`
  и два хука: `useShowcaseLocale()` (весь объект) и `useAppLocale<K>(key)`
  (поддерево для конкретного апп).
- `ShowcasesViews.tsx` оборачивает `<LazyComp />` в провайдер, передавая
  `strings` из `App.tsx` (там уже выбирается `en | ru`).
- Default value контекста — `showcasesLocaleEn`, чтобы апп можно было
  отрендерить вне провайдера (тесты, песочница) без падения.
- Тип `useAppLocale` дженериковый, ключ — буквальный union `keyof apps`.
  Это даёт автодополнение: `useAppLocale('admin').tabs.users`.

**Минимальная инвазивность достигнута:**

- Сигнатуры default-экспортов апп не меняются.
- Никаких `customClass`/`locale` пропов.
- Только хук в верху каждого апп/таб-компонента.

## Решение 2. Структура `apps.<name>` в `ShowcasesLocale`

`ShowcasesLocale.apps` — отдельная карта по апп. Внутри каждого
`<App>Locale` ключи **зеркалят таб-структуру**, например:

```ts
interface AdminLocale {
  stats: { totalUsers: string; admins: string; ... }
  tabs: { users: string; sessions: string; ... }
  users: { columns: { name: string; ... }; toolbar: {...}; actions: {...} }
  audit: { ... }
  ...
}
```

Преимущество — переводчик видит контекст (какой таб → какая секция → какой
ключ). Файл лежит в `examples/_shared/src/showcasesLocale.ts` и вырастает,
но остаётся читаемым.

## Решение 3. Что не локализуем

Согласно CHARTER §10 в коде остаётся хардкод для:

- **Unicode-пиктограмм** (`✓ ✕ → × ⌕ ◉ ✎ 📌 📎 😀 📷 ⋯ 📥 ⭐ 📤 📝 📦 🚫 🗑 ▲ ▼ ⌘ ↑ ↓ 🍳 📈 👥 🎫 💬 📬 🛒 🏢 📁 🔐 🔀 ⎘`).
- **Технических идентификаторов**: `sg-*` классы, тэги в `data` (например
  `'admin' | 'editor' | 'viewer'` как enum), id роутов, ключи табов,
  `aria-role` без человеческого текста.
- **Mock-данных** (имена сотрудников, email-адреса, url'ы примеров и т.п.) —
  это часть seed-данных, не UI-копирайт.
- **Имени бренда «SkyGraph»**.

Локализуем:

- Заголовки страниц, секций, табов.
- Labels колонок таблиц (`title`).
- Лейблы и плейсхолдеры формы.
- Кнопки, пункты меню, dropdown items.
- Toast/notification сообщения.
- Tooltip'ы со словами.
- Сообщения пустых состояний (`<Empty description=…>`).
- Текст подсказок и хинтов под полями.

## Решение 4. Маппинг enum-значений на лейблы

Многие апп используют enum-значения (`'open' | 'pending' | 'resolved'`)
прямо как видимый текст в `<Tag>`. Чтобы не плодить switch'и в каждом
месте, в локали для каждого таб-набора заводится словарь:
`statusLabel: { open: 'Open', pending: 'Pending', ... }`. Внутри JSX:
`{l.statusLabel[row.status]}`. Это сохраняет короткий код и переводимо.

## Решение 5. Стиль ключей

camelCase, секции вложены — НЕ плоский namespace. Это упрощает поиск и
позволяет копировать целые секции между en/ru словарями.
