/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useRef, useState } from 'react'

// ── Stripe links ──────────────────────────────────────────────────────────────
const STRIPE_LINKS: Record<string, string> = {
  upfront:   'https://buy.stripe.com/00wcN7a7Weko3NNbTT8N20f',
  quarterly: 'https://buy.stripe.com/00w9AVcg47W0bgf1ff8N20g',
  half:      'https://buy.stripe.com/fZubJ33Jy0ty6ZZ0bb8N20h',
}

const PLAN_LABELS: Record<string, string> = {
  upfront:   'Full Upfront — $3,000 USD',
  quarterly: 'Quarterly — $750 USD every 3 months',
  half:      'Half & Half — $1,500 USD now, $1,500 next month',
}

const AGREEMENT_TEXT = `YOU WILL NOT BE CHARGED RIGHT AWAY AFTER SIGNING AND SUBMITTING THIS AGREEMENT.
YOUR PAYMENT INFO WILL BE COLLECTED, AND YOU WILL ONLY BE CHARGED ONCE THE CREATION OF YOUR PERSONALIZED MEAL PLAN AND YOUR PERSONALIZED WORKOUT PLAN HAVE BOTH BEEN COMPLETED.
YOU WILL RECEIVE BOTH PERSONALIZED PLANS AFTER YOUR PAYMENT HAS BEEN FULFILLED

ONCE YOU'VE BEEN BILLED, IF YOU CHOSE THE HALF & HALF PAYMENT PLAN, OR QUARTERLY PAYMENT PLAN THIS WILL ALSO BE THE FIRST DAY OF YOUR BILLING CYCLE, IF YOU'VE DECIDED TO INVEST IN THIS COACHING PROGRAM BASED ON ONE OF THESE TWO INCREMENT PAYMENT PLANS.

By signing below, you agree to pay the full program fee of USD $3,000.00 + Applicable sales tax (either the full amount upfront, half upfront & the remaining half of the total coaching cost paid the next month, or payments made quarterly (USD $750.00 + applicable sales tax every 3 months from your original billing date), to fulfill and conclude 12 months worth of coaching payments.

ONCE THE FIRST PAYMENT HAS BEEN MADE, YOU ARE OBLIGATED TO PAY THE REMAINING BALANCE OF THE TOTAL COST FOR THIS COACHING PROGRAM, REGARDLESS OF USAGE OR PARTICIPATION.

YOU GIVE ME (Ashton), FULL PERMISSION TO HOLD YOU ACCOUNTABLE TO THE FULLEST AT ALL TIMES, THROUGHOUT OUR TRAINER AND TRAINEE EXPERIENCE TOGETHER.

I AM ENABLED TO RELEASE YOU AS A CLIENT IF YOU DO NOT FOLLOW MY INSTRUCTIONS AND FOLLOW THEM WHEN I GIVE THEM TO YOU. THIS INCLUDES...

NOT FOLLOWING THE MEAL PLAN THAT WAS PERSONALLY MADE, SET, AND WHEN NEEDED... ADJUSTED FOR YOU.
NOT FOLLOWING THE WORKOUT PLAN THAT I'VE SET FOR YOU, ALONG WITH IT'S CHANGES & UPDATES.
EATING OUTSIDE OF THE WINDOW I'VE GIVEN YOU.
REFUSING/CONSISTENTLY REFUSING TO LOG YOUR FOOD INTAKE FOR THE DAY.
CHOOSING NOT TO WORK OUT BECAUSE YOU "DON'T FEEL LIKE IT."
NOT LIFTING THE RECOMMENDED WEIGHT IN LBS, AS WELL AS LIFTING THE RECOMMENDED AMOUNT OF REPS.

THERE ARE CERTAIN EXCEPTIONS THAT APPLY TO WOMEN AND WOMEN ONLY, AS I UNDERSTAND THAT A WOMEN'S MENSTRUAL CYCLE WILL AFFECT PERFORMANCE THROUGHOUT DIFFERENT TIMES OF THE MONTH.

THERE ARE NO REFUNDS + NO CHARGEBACKS. This is a binding agreement.

This agreement outlines the terms between you (__________) and (SCULPT BY ASHTON) for a 12 month online personal training/coaching program. You understand that:

The total fee for the program is $3,000.00 USD + Applicable sales tax.

You may choose to pay in full upfront, half up front & half the next month from your original billing date (USD $1,500.00 + applicable sales tax), or make quarterly payments (Payments made every 3 months from signup date) of USD $750.00 + Applicable sales tax.

No refunds will be issued under any circumstances, including but not limited to dissatisfaction, lack of participation, schedule conflicts, or personal matters.

Chargebacks or payment reversals will be considered a breach of this agreement and may result in legal action/collection efforts.

This program is non-transferable.

By signing, you acknowledge that you have read, understood, and agree to these terms in full.`

// ── Native canvas signature pad (no third-party library) ─────────────────────
function SignaturePad({
  canvasRef,
  hasError,
  onBegin,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>
  hasError: boolean
  onBegin: () => void
}) {
  const drawing = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      if ('touches' in e) {
        return {
          x: (e.touches[0].clientX - rect.left) * scaleX,
          y: (e.touches[0].clientY - rect.top) * scaleY,
        }
      }
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      }
    }

    const start = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      drawing.current = true
      onBegin()
      const pos = getPos(e)
      ctx.beginPath()
      ctx.moveTo(pos.x, pos.y)
    }
    const move = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      if (!drawing.current) return
      const pos = getPos(e)
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
    }
    const end = () => { drawing.current = false }

    canvas.addEventListener('mousedown', start)
    canvas.addEventListener('mousemove', move)
    canvas.addEventListener('mouseup', end)
    canvas.addEventListener('mouseleave', end)
    canvas.addEventListener('touchstart', start, { passive: false })
    canvas.addEventListener('touchmove', move, { passive: false })
    canvas.addEventListener('touchend', end)

    return () => {
      canvas.removeEventListener('mousedown', start)
      canvas.removeEventListener('mousemove', move)
      canvas.removeEventListener('mouseup', end)
      canvas.removeEventListener('mouseleave', end)
      canvas.removeEventListener('touchstart', start)
      canvas.removeEventListener('touchmove', move)
      canvas.removeEventListener('touchend', end)
    }
  }, [canvasRef, onBegin])

  return (
    <canvas
      ref={canvasRef}
      width={390}
      height={155}
      style={{
        display: 'block',
        background: '#fff',
        borderRadius: 8,
        border: `2px solid ${hasError ? '#c00' : '#ccc'}`,
        cursor: 'crosshair',
        touchAction: 'none',
        width: '100%',
      }}
    />
  )
}

function isCanvasEmpty(canvas: HTMLCanvasElement): boolean {
  const ctx = canvas.getContext('2d')
  if (!ctx) return true
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] > 0) return false
  }
  return true
}

function clearCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Agreement() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [form, setForm] = useState({ clientName: '', date: '' })
  const [plan, setPlan] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const clearSignature = () => {
    if (canvasRef.current) clearCanvas(canvasRef.current)
  }

  const drawTextWrapped = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ): number => {
    const paragraphs = text.split('\n')
    for (const para of paragraphs) {
      if (para.trim() === '') { y += lineHeight * 0.5; continue }
      const words = para.split(' ')
      let line = ''
      for (const word of words) {
        const testLine = line + word + ' '
        if (ctx.measureText(testLine).width > maxWidth && line !== '') {
          ctx.fillText(line.trim(), x, y)
          line = word + ' '
          y += lineHeight
        } else {
          line = testLine
        }
      }
      if (line.trim()) { ctx.fillText(line.trim(), x, y); y += lineHeight }
    }
    return y
  }

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {}
    if (!form.clientName.trim()) newErrors.clientName = 'Full name is required'
    if (!form.date) newErrors.date = 'Date is required'
    if (!plan) newErrors.plan = 'Please select a payment plan'
    if (!canvasRef.current || isCanvasEmpty(canvasRef.current)) newErrors.signature = 'Signature is required'
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
    setErrors({})

    try {
      setLoading(true)

      const sigData = canvasRef.current ? canvasRef.current.toDataURL('image/png') : ''

      // Build agreement image
      const canvas = document.createElement('canvas')
      canvas.width = 1240
      canvas.height = 2400
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#000'

      let y = 60
      ctx.font = 'bold 28px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('SCULPT BY ASHTON', canvas.width / 2, y); y += 36
      ctx.font = 'bold 22px Arial'
      ctx.fillText('TERMS OF SERVICE — 12-MONTH COACHING AGREEMENT', canvas.width / 2, y); y += 50
      ctx.textAlign = 'left'
      ctx.font = '15px Arial'
      y = drawTextWrapped(ctx, AGREEMENT_TEXT, 60, y, 1120, 22) + 30
      ctx.font = 'bold 16px Arial'
      ctx.fillText(`Selected Payment Plan: ${PLAN_LABELS[plan] ?? plan}`, 60, y); y += 36
      ctx.font = '16px Arial'
      ctx.fillText(`Client Name: ${form.clientName}`, 60, y); y += 28
      ctx.fillText(`Date: ${form.date}`, 60, y); y += 44
      ctx.fillText('Signature:', 60, y - 6); y += 6

      if (sigData) {
        const img = new Image()
        img.src = sigData
        await img.decode()
        ctx.drawImage(img, 60, y, 500, 160)
      }

      const imageData = canvas.toDataURL('image/png')
      const filename = `sculpt_agreement_${form.clientName.replace(/\s/g, '_')}_${form.date}.png`

      try {
        await fetch('/api/save-agreement', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: imageData, filename, plan }),
        })
      } catch (_) { /* non-fatal */ }

      window.location.href = STRIPE_LINKS[plan] ?? '/'
    } finally {
      setLoading(false)
    }
  }

  const errSpan = (key: string) =>
    errors[key]
      ? <span style={{ color: '#c00', fontSize: 12, display: 'block', marginTop: 3, marginBottom: 8 }}>{errors[key]}</span>
      : null

  const planCard = (value: string, label: string, sub: string) => {
    const selected = plan === value
    return (
      <button
        key={value}
        type="button"
        onClick={() => { setPlan(value); setErrors((e) => { const n = { ...e }; delete n.plan; return n }) }}
        style={{
          width: '100%', padding: '14px 18px', borderRadius: 12, marginBottom: 10,
          border: selected ? '2px solid #111' : '2px solid #ddd',
          background: selected ? '#111' : '#fff',
          color: selected ? '#fff' : '#222',
          cursor: 'pointer', textAlign: 'left',
          display: 'flex', alignItems: 'center', gap: 14,
          transition: 'all .15s',
        }}
      >
        <span style={{
          width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
          border: selected ? '6px solid #fff' : '2px solid #aaa',
          background: 'transparent', transition: 'all .15s',
        }} />
        <span>
          <span style={{ fontWeight: 700, fontSize: 14.5, display: 'block' }}>{label}</span>
          <span style={{ fontSize: 12, opacity: 0.7 }}>{sub}</span>
        </span>
      </button>
    )
  }

  return (
    <div style={{
      minHeight: '100vh', width: '100vw',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1c1c1c 100%)',
      padding: '40px 20px', boxSizing: 'border-box',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
    }}>
      <div style={{
        width: '100%', maxWidth: 1160,
        background: '#fff', borderRadius: 24,
        display: 'grid', gridTemplateColumns: '1.3fr 1fr',
        boxShadow: '0 30px 80px rgba(0,0,0,.55)',
        overflow: 'hidden',
      }}>

        {/* Left: TOS */}
        <div style={{ padding: '44px 48px', overflowY: 'auto', maxHeight: '88vh', borderRight: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 30 }}>
            <svg width="48" height="48" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polyline points="5,90 35,10 60,65 85,10 115,90" fill="none" stroke="#000" strokeWidth="14" strokeLinecap="square" strokeLinejoin="miter"/>
            </svg>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 4, color: '#999', fontWeight: 700, textTransform: 'uppercase' }}>Sculpt By</div>
              <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 0.5, lineHeight: 1.1 }}>ASHTON</div>
            </div>
          </div>
          <h2 style={{ fontSize: 21, fontWeight: 800, marginBottom: 4 }}>12-Month Coaching Agreement</h2>
          <div style={{ fontSize: 11.5, color: '#999', letterSpacing: 2, fontWeight: 600, marginBottom: 28, textTransform: 'uppercase' }}>
            Terms of Service
          </div>
          <div style={{ fontSize: 13.5, lineHeight: 1.9, color: '#222', whiteSpace: 'pre-wrap' }}>
            {AGREEMENT_TEXT}
          </div>
        </div>

        {/* Right: Form */}
        <div style={{
          padding: '44px 38px', background: '#f6f6f6',
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto', maxHeight: '88vh',
        }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 22, marginTop: 0 }}>Complete &amp; Sign</h3>

          {/* Payment plan */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>Payment Plan</div>
            {planCard('upfront',   'Full Upfront',  '$3,000 USD — single payment')}
            {planCard('quarterly', 'Quarterly',      '$750 USD × 4 (every 3 months)')}
            {planCard('half',      'Half & Half',   '$1,500 now + $1,500 next month')}
            {errSpan('plan')}
          </div>

          {/* Name */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 700, fontSize: 14, display: 'block', marginBottom: 6 }}>Full Name</label>
            <input
              value={form.clientName}
              onChange={(e) => { setForm({ ...form, clientName: e.target.value }); setErrors((err) => { const n = { ...err }; delete n.clientName; return n }) }}
              placeholder="Enter your full name"
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 10,
                border: `1.5px solid ${errors.clientName ? '#c00' : '#ccc'}`,
                fontSize: 14, background: '#fff', boxSizing: 'border-box',
              }}
            />
            {errSpan('clientName')}
          </div>

          {/* Date */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 700, fontSize: 14, display: 'block', marginBottom: 6 }}>Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => { setForm({ ...form, date: e.target.value }); setErrors((err) => { const n = { ...err }; delete n.date; return n }) }}
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 10,
                border: `1.5px solid ${errors.date ? '#c00' : '#ccc'}`,
                fontSize: 14, background: '#fff', boxSizing: 'border-box',
              }}
            />
            {errSpan('date')}
          </div>

          {/* Signature */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 700, fontSize: 14, display: 'block', marginBottom: 6 }}>Signature</label>
            <SignaturePad
              canvasRef={canvasRef}
              hasError={!!errors.signature}
              onBegin={() => setErrors((err) => { const n = { ...err }; delete n.signature; return n })}
            />
            {errSpan('signature')}
            <button
              type="button"
              onClick={clearSignature}
              style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: 12.5, padding: '4px 0', marginTop: 4 }}
            >
              ↺ Clear Signature
            </button>
          </div>

          {/* Plan pill */}
          {plan && (
            <div style={{
              padding: '12px 16px', borderRadius: 10,
              background: '#111', color: '#fff',
              fontSize: 13, fontWeight: 600, marginBottom: 16,
            }}>
              ✓ {PLAN_LABELS[plan]}
            </div>
          )}

          {/* Notice */}
          <div style={{ fontSize: 11.5, color: '#777', lineHeight: 1.65, marginBottom: 20 }}>
            You will <strong style={{ color: '#444' }}>not</strong> be charged right away. Your payment info is collected now and you will only be billed once your personalized meal plan and workout plan are complete.
          </div>

          {/* CTA */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              padding: '16px 0', borderRadius: 13, border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              background: loading ? '#777' : 'linear-gradient(135deg, #000 0%, #383838 100%)',
              color: '#fff', fontSize: 16, fontWeight: 700,
              boxShadow: '0 8px 28px rgba(0,0,0,.3)',
              letterSpacing: 0.4,
            }}
          >
            {loading ? 'Processing…' : 'Sign & Proceed to Payment →'}
          </button>
        </div>
      </div>
    </div>
  )
}
