# T-Docs-Locales — findings (вне scope)

## `.gitignore` не содержит `docs/api/`

`docs/api/` в `.gitignore` отсутствует. После того как `typedoc`
установится и сгенерирует контент, артефакты автогена попадут в git
если `.gitignore` не обновить.

`.gitignore` — корневой конфиг (зона CI / репо-владельца), CHARTER §5
запрещает мне его трогать. Фиксирую как finding.

**Рекомендация:** в одной из следующих волн добавить в `.gitignore`:

```
# typedoc autogen
docs/api/
```

## Корневой npm-script `docs` отсутствует

Согласно task-карте «не добавлять npm-script в корневой `package.json`
(зона T-CI)». При установке `typedoc` нужно также добавить:

```json
{
  "scripts": {
    "docs": "typedoc"
  }
}
```

— и это work T-CI или владельца репо.

## SgLocale finalised до 4 новых локалей

К моменту работы T-Docs-Locales поток T-React-I18n-Styles уже
завершился, поэтому `SgLocale` финализирован: 4 новые React-локали
(`zh_CN`, `de_DE`, `fr_FR`, `es_ES`) полностью покрывают итоговую
структуру, без английских заглушек.

В Vue структура `SgLocale` ограничена пакетной декларацией
(`packages/vue/src/types.ts` — отдельная зона T-Vue-* потоков). 4 новые
Vue-локали повторяют её полностью.

## Charts/Dashboard/Gantt/… ещё не имеют Vue-эквивалентов

Не finding в строгом смысле — просто констатация: Vue `SgLocale`
сейчас короче React-овского, потому что Vue не имеет аналогов
Charts/Dashboard/Gantt/ResourceCalendar/Timeline/SchemaFormEditor (это
двигают T-Vue-* потоки). Когда они появятся, Vue-локали потребуется
дополнить — финальный sweep запросит обновлений в этих 4 файлах.
