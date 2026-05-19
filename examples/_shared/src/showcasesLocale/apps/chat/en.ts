import type { ChatLocale } from '../../types/chat'

export const chatLocaleEn: ChatLocale = {
  inbox: 'Inbox',
  searchConversations: 'Search conversations...',
  noMatches: 'No matches',
  selectConversation: 'Select a conversation',
  noMessages: 'No messages yet',
  channelMembers: (n) => `${n} members`,
  online: 'Online',
  offline: 'Offline',
  pinTooltip: 'Pin conversation',
  muteNotifications: 'Mute notifications',
  leaveConversation: 'Leave conversation',
  mutedToast: 'Muted',
  leftToast: 'Left conversation',
  detailsButton: 'Details',
  membersHeading: (n) => `Members (${n})`,
  activityHeading: 'Activity',
  pinnedSuffix: 'pinned',
  composerPlaceholder: 'Write a message — type @ to mention…',
  sendButton: 'Send',
}
