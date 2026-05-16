export const pipelineStages = [
  'qualification',
  'proposal',
  'negotiation',
  'closed-won',
  'closed-lost',
] as const

export type PipelineStage = (typeof pipelineStages)[number]
