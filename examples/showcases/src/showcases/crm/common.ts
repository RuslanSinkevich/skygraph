export const stageLabels: Record<string, string> = {
  qualification: 'Qualification',
  proposal: 'Proposal',
  negotiation: 'Negotiation',
  'closed-won': 'Closed Won',
  'closed-lost': 'Closed Lost',
}

export const pipelineStages: Array<keyof typeof stageLabels> = [
  'qualification',
  'proposal',
  'negotiation',
  'closed-won',
  'closed-lost',
]
