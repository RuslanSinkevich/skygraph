import React, { useState, useEffect, useRef, useCallback } from 'react'

export interface TransitionProps {
  visible: boolean
  name?: string
  duration?: number
  enterFrom?: string
  enterTo?: string
  leaveFrom?: string
  leaveTo?: string
  onAfterEnter?: () => void
  onAfterLeave?: () => void
  children: React.ReactElement
  unmountOnExit?: boolean
}

type Phase = 'idle' | 'enter' | 'enter-active' | 'leave' | 'leave-active'

export function Transition({
  visible,
  name = 'sg-fade',
  duration = 200,
  enterFrom,
  enterTo,
  leaveFrom,
  leaveTo,
  onAfterEnter,
  onAfterLeave,
  children,
  unmountOnExit = true,
}: TransitionProps) {
  const [mounted, setMounted] = useState(visible)
  const [phase, setPhase] = useState<Phase>(visible ? 'idle' : 'idle')
  const nodeRef = useRef<HTMLElement | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const prevVisible = useRef(visible)

  const getEnterClasses = useCallback(() => {
    if (enterFrom && enterTo) return { from: enterFrom, active: `${name}-enter-active`, to: enterTo }
    return { from: `${name}-enter-from`, active: `${name}-enter-active`, to: `${name}-enter-to` }
  }, [name, enterFrom, enterTo])

  const getLeaveClasses = useCallback(() => {
    if (leaveFrom && leaveTo) return { from: leaveFrom, active: `${name}-leave-active`, to: leaveTo }
    return { from: `${name}-leave-from`, active: `${name}-leave-active`, to: `${name}-leave-to` }
  }, [name, leaveFrom, leaveTo])

  useEffect(() => {
    if (visible === prevVisible.current) return
    prevVisible.current = visible
    clearTimeout(timerRef.current)

    if (visible) {
      setMounted(true)
      setPhase('enter')
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase('enter-active'))
      })
      timerRef.current = setTimeout(() => {
        setPhase('idle')
        onAfterEnter?.()
      }, duration)
    } else {
      setPhase('leave')
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase('leave-active'))
      })
      timerRef.current = setTimeout(() => {
        setPhase('idle')
        if (unmountOnExit) setMounted(false)
        onAfterLeave?.()
      }, duration)
    }
  }, [visible, duration, unmountOnExit, onAfterEnter, onAfterLeave])

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  if (!mounted && unmountOnExit) return null

  const enterC = getEnterClasses()
  const leaveC = getLeaveClasses()

  let transitionClass = ''
  switch (phase) {
    case 'enter':
      transitionClass = `${enterC.from} ${enterC.active}`
      break
    case 'enter-active':
      transitionClass = `${enterC.to} ${enterC.active}`
      break
    case 'leave':
      transitionClass = `${leaveC.from} ${leaveC.active}`
      break
    case 'leave-active':
      transitionClass = `${leaveC.to} ${leaveC.active}`
      break
  }

  return React.cloneElement(children, {
    ref: nodeRef,
    className: [children.props.className, transitionClass].filter(Boolean).join(' '),
  })
}
