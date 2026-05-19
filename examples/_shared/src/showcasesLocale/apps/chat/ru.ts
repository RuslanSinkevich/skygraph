import type { ChatLocale } from '../../types/chat'

export const chatLocaleRu: ChatLocale = {
  inbox: 'Входящие',
  searchConversations: 'Поиск диалогов...',
  noMatches: 'Ничего не найдено',
  selectConversation: 'Выберите диалог',
  noMessages: 'Сообщений пока нет',
  channelMembers: (n) => `${n} участников`,
  online: 'В сети',
  offline: 'Не в сети',
  pinTooltip: 'Закрепить диалог',
  muteNotifications: 'Отключить уведомления',
  leaveConversation: 'Выйти из диалога',
  mutedToast: 'Отключено',
  leftToast: 'Вы покинули диалог',
  detailsButton: 'Детали',
  membersHeading: (n) => `Участники (${n})`,
  activityHeading: 'Активность',
  pinnedSuffix: 'закреплено',
  composerPlaceholder: 'Введите сообщение — @ для упоминания…',
  sendButton: 'Отправить',
}
