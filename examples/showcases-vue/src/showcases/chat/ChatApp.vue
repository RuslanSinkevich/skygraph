<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  SgAvatar,
  SgBadge,
  SgButton,
  SgInput,
  SgTag,
  SgEmpty,
  SgNotificationContainer,
} from '@skygraph/vue'
import { conversations as seedConversations, messages as seedMessages, users, me } from './data'
import type { Conversation, Message } from './data'
import { initials, colorFromString, useAppLocale } from '../_shared'

const l = useAppLocale('chat')

const conversationsState = ref<Conversation[]>([...seedConversations])
const messagesState = ref<Message[]>([...seedMessages])
const activeId = ref<string>('c1')
const search = ref('')
const draft = ref('')

const filtered = computed(() => {
  if (!search.value.trim()) return conversationsState.value
  const q = search.value.toLowerCase()
  return conversationsState.value.filter(
    (c) => c.name.toLowerCase().includes(q) || c.lastMessage.toLowerCase().includes(q),
  )
})

const active = computed(() => conversationsState.value.find((c) => c.id === activeId.value))
const activeMessages = computed(() =>
  messagesState.value.filter((m) => m.conversationId === activeId.value),
)
const totalUnread = computed(() => conversationsState.value.reduce((s, c) => s + c.unread, 0))

const userById = new Map(users.map((u) => [u.id, u]))

function openConversation(id: string) {
  activeId.value = id
  conversationsState.value = conversationsState.value.map((c) =>
    c.id === id ? { ...c, unread: 0 } : c,
  )
}

function send() {
  const text = draft.value.trim()
  if (!text || !active.value) return
  const newMsg: Message = {
    id: `m${Date.now()}`,
    conversationId: active.value.id,
    authorId: 'me',
    at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    text,
  }
  messagesState.value = [...messagesState.value, newMsg]
  conversationsState.value = conversationsState.value.map((c) =>
    c.id === active.value!.id ? { ...c, lastMessage: text, lastAt: 'now', unread: 0 } : c,
  )
  draft.value = ''
}

function peerForDm(c: Conversation) {
  if (c.type !== 'dm') return null
  return users.find((u) => c.members.includes(u.id) && u.id !== 'me')
}

function authorOf(m: Message) {
  return userById.get(m.authorId)
}

function statusForActive(c: Conversation): string {
  if (c.type === 'channel') return l.channelMembers(c.members.length)
  const peer = userById.get(c.members.find((m) => m !== 'me') ?? '')
  return peer?.online ? l.online : l.offline
}
</script>

<template>
  <div class="chat-shell-wrapper">
    <SgNotificationContainer />
    <div class="chat-shell">
      <div class="sc-twopane-side chat-side">
        <div class="chat-side-header">
          <strong>{{ l.inbox }}</strong>
          <SgBadge v-if="totalUnread > 0" :count="totalUnread" />
        </div>
        <div style="padding: 8px 12px">
          <SgInput
            :value="search"
            :placeholder="l.searchConversations"
            size="small"
            @update:value="search = $event"
          />
        </div>
        <div style="flex: 1; overflow-y: auto">
          <div v-if="filtered.length === 0" style="padding: 24px">
            <SgEmpty :description="l.noMatches" />
          </div>
          <template v-else>
            <div
              v-for="c of filtered"
              :key="c.id"
              :class="[
                'sc-thread-item',
                c.id === activeId ? 'sc-thread-item--active' : '',
                c.unread > 0 ? 'sc-thread-item--unread' : '',
              ]"
              @click="openConversation(c.id)"
            >
              <div style="display: flex; gap: 10px; align-items: center">
                <SgAvatar size="small" :style="{ background: colorFromString(c.name) }">
                  {{ c.type === 'channel' ? '#' : initials(peerForDm(c)?.name ?? c.name) }}
                </SgAvatar>
                <div style="flex: 1; min-width: 0">
                  <div style="display: flex; justify-content: space-between; gap: 6px">
                    <span class="thread-name">{{ c.name }}</span>
                    <span class="thread-time">{{ c.lastAt }}</span>
                  </div>
                  <div class="thread-last">{{ c.lastMessage }}</div>
                </div>
                <SgBadge v-if="c.unread > 0" :count="c.unread" />
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="sc-twopane-main">
        <div
          v-if="!active"
          style="flex: 1; display: flex; align-items: center; justify-content: center"
        >
          <SgEmpty :description="l.selectConversation" />
        </div>
        <template v-else>
          <div class="chat-header">
            <div>
              <div style="font-weight: 600">
                <template v-if="active.type === 'channel'"># </template>{{ active.name }}
              </div>
              <div style="font-size: 12px; color: var(--sg-color-text-secondary)">
                {{ statusForActive(active) }}
              </div>
            </div>
          </div>

          <div class="chat-body">
            <div v-if="activeMessages.length === 0">
              <SgEmpty :description="l.noMessages" />
            </div>
            <template v-else>
              <div
                v-for="m of activeMessages"
                :key="m.id"
                :class="['sc-msg', m.authorId === 'me' ? 'sc-msg--mine' : '']"
              >
                <SgAvatar
                  size="small"
                  :style="{ background: colorFromString(authorOf(m)?.name ?? m.authorId) }"
                >
                  {{ initials(authorOf(m)?.name ?? m.authorId) }}
                </SgAvatar>
                <div>
                  <div class="sc-msg-bubble">
                    <div
                      v-if="m.authorId !== 'me'"
                      style="
                        font-size: 11px;
                        font-weight: 600;
                        margin-bottom: 2px;
                        color: var(--sg-color-primary);
                      "
                    >
                      {{ authorOf(m)?.name }}
                    </div>
                    <span>{{ m.text }}</span>
                    <div v-for="(a, i) of m.attachments ?? []" :key="i" class="msg-attachment">
                      📎 <strong>{{ a.name }}</strong> · {{ a.size }}
                    </div>
                  </div>
                  <div class="sc-msg-meta">
                    {{ m.at }}<template v-if="m.pinned"> · 📌 {{ l.pinnedSuffix }}</template>
                  </div>
                  <div v-if="m.reactions?.length" class="reactions">
                    <SgTag v-for="(r, i) of m.reactions" :key="i" color="default">
                      {{ r.emoji }} {{ r.count }}
                    </SgTag>
                  </div>
                </div>
              </div>
            </template>
          </div>

          <div class="chat-composer">
            <textarea
              v-model="draft"
              :placeholder="l.composerPlaceholder"
              rows="2"
              class="composer-input"
              @keydown.enter.prevent="send"
            />
            <div style="display: flex; justify-content: flex-end; margin-top: 8px">
              <SgButton type="primary" size="small" :disabled="!draft.trim()" @click="send">
                {{ l.sendButton }}
              </SgButton>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-shell-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.chat-shell {
  flex: 1;
  display: flex;
  min-height: 0;
}
.chat-side {
  border-right: 1px solid var(--sg-color-border-secondary);
  display: flex;
  flex-direction: column;
}
.chat-side-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-bottom: 1px solid var(--sg-color-border-secondary);
  font-size: 14px;
}
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--sg-color-border-secondary);
  flex-shrink: 0;
}
.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.chat-composer {
  border-top: 1px solid var(--sg-color-border-secondary);
  padding: 12px 16px;
  flex-shrink: 0;
  background: var(--sg-color-bg);
}
.composer-input {
  width: 100%;
  resize: vertical;
  padding: 8px 10px;
  border: 1px solid var(--sg-color-border);
  border-radius: 6px;
  background: var(--sg-color-bg);
  color: var(--sg-color-text);
  font-family: inherit;
  font-size: 13px;
}
.thread-name {
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.thread-time {
  font-size: 11px;
  color: var(--sg-color-text-secondary);
  flex-shrink: 0;
}
.thread-last {
  font-size: 12px;
  color: var(--sg-color-text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 2px;
}
.msg-attachment {
  margin-top: 6px;
  padding: 6px 10px;
  background: var(--sg-color-bg);
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: 6px;
  font-size: 12px;
  display: flex;
  gap: 6px;
  align-items: center;
}
.reactions {
  display: flex;
  gap: 4px;
  margin-top: 4px;
}
.sc-msg--mine .reactions {
  justify-content: flex-end;
}
</style>
