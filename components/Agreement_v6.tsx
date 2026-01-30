'use client'

import { useEffect, useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'

const STRIPE_LINK = 'https://buy.stripe.com/cNi4gBcg4gswfwv0bb8N202'
const TYPEFORM_LINK = 'https://form.typeform.com/to/t6JbY3W4'

export default function Agreement() {
  const sigRef = useRef<SignatureCanvas | null>(null)
  const [form, setForm] = useState({ clientName: '', date: '' })
  const [loading, setLoading] = useState(false)

  const clearSignature = () => sigRef.current?.clear()

  const drawTextWrapped = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) => {
    const words = text.split(' ')
    let line = ''
    for (const word of words) {
      const testLine = line + word + ' '
      if (ctx.measureText(testLine).width > maxWidth) {
        ctx.fillText(line, x, y)
        line = word + ' '
        y += lineHeight
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, x, y)
    return y
  }

  // 3-month agreement exact content (based on provided TOS)
  const AGREEMENT_TEXT = `
By signing below, you agree to pay the full program fee of USD $450.00 + Applicable sales tax (either upfront, or in monthly payments of USD $150.00 + Applicable sales tax for the next two months remaining to pay off the total program cost of USD $450.00).

IF YOU CHOOSE TO PAY IN MONTHLY INCREMENTS.. ONCE THE FIRST PAYMENT HAS BEEN MADE YOU ARE OBLIGATED TO PAY THE REMAINING BALANCE OF THE TOTAL COST FOR THIS COACHING PROGRAM, REGARDLESS OF USAGE OR PARTICIPATION.

YOU GIVE ME (Ashton), FULL PERMISSION TO HOLD YOU ACCOUNTABLE TO THE FULLEST AT ALL TIMES, THROUGHOUT OUR TRAINER AND TRAINEE EXPERIENCE TOGETHER.

I AM ENABLED TO RELEASE YOU AS A CLIENT IF YOU DO NOT FOLLOW MY INSTRUCTIONS AND FOLLOW THEM WHEN I GIVE THEM TO YOU. THIS INCLUDES...

NOT FOLLOWING THE MEAL PLAN AS WELL AS WORKOUT PLAN THAT I’VE SET OUT FOR YOU.

EATING OUTSIDE OF THE WINDOW I’VE GIVEN YOU.

REFUSING/CONSISTENTLY REFUSING TO LOG YOUR FOOD INTAKE FOR THE DAY.

CHOOSING NOT TO WORK OUT BECAUSE YOU DON’T FEEL LIKE IT.

NOT LIFTING THE RECOMMENDED WEIGHT IN LBS, AS WELL AS LIFTING THE RECOMMENDED AMOUNT OF REPS.

THERE ARE NO REFUNDS + NO CHARGEBACKS. This is a binding agreement.

This agreement outlines the terms between you (__________) and (SCULPT BY ASHTON) for a 3 month online personal training/coaching program. You understand that:

The total fee for the program is $450 USD + Applicable sales tax.

You may choose to pay in full upfront or in 3 equal monthly payments of USD $150.00 + Applicable sales tax.

If you’re paying in monthly increments, You may choose to pay off the total coaching cost early at anytime.

No refunds will be issued under any circumstances, including but not limited to dissatisfaction, lack of participation, schedule conflicts, or personal matters.

Chargebacks or payment reversals will be considered a breach of this agreement and may result in legal action/collection efforts.

This program is non-transferable.

By signing, you acknowledge that you have read, understood, and agree to these terms in full.
`

  const handleSubmit = async () => {
    if (!form.clientName || !form.date || sigRef.current?.isEmpty()) {
      alert('Please complete the form and sign the agreement.')
      return
    }

    try {
      setLoading(true)

      const sigCanvas = sigRef.current!.getCanvas()
      const signatureData = sigCanvas.toDataURL('image/png')

      const canvas = document.createElement('canvas')
      canvas.width = 1200
      canvas.height = 1800
      const ctx = canvas.getContext('2d')!

      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#000'
      ctx.font = '22px Arial'

      let y = 40
      ctx.fillText('SCULPT 3-Month Coaching Agreement', 40, y)
      y += 30

      ctx.font = '16px Arial'
      y = drawTextWrapped(ctx, AGREEMENT_TEXT, 40, y, 1120, 24) + 40

      ctx.fillText(`Client Name: ${form.clientName}`, 40, y)
      y += 30
      ctx.fillText(`Date: ${form.date}`, 40, y)
      y += 40

      const img = new Image()
      img.src = signatureData
      await img.decode()

      ctx.drawImage(img, 40, y, 500, 160)
      ctx.fillText('Signature', 40, y - 10)

      const imageData = canvas.toDataURL('image/png')
      const filename = `agreement_3month_${form.clientName.replace(/\s/g,'_')}_${form.date}.png`

      // send to server to save (you need an /api/save-agreement endpoint)
      await fetch('/api/save-agreement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData, filename })
      })

      // redirect to stripe (success_url kept as TYPEFORM_LINK for parity with prior flow)
      window.location.href = `${STRIPE_LINK}?success_url=${encodeURIComponent(TYPEFORM_LINK)}`
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: 14,
    borderRadius: 12,
    border: '1px solid #ccc',
    margin: '8px 0 18px'
  }

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #0f0f0f, #1c1c1c)',
      padding: 40
    }}>

      <div style={{
        width: '100%',
        maxWidth: '100%',
        background: '#fff',
        borderRadius: 24,
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        boxShadow: '0 30px 80px rgba(0,0,0,.5)',
        overflow: 'hidden'
      }}>

        {/* Left: Agreement */}
        <div style={{ padding: 40, overflowY: 'auto', maxHeight: '85vh' }}>
          <img src="/logo.png" style={{ width: 160, marginBottom: 20 }} />
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 16 }}>
            SCULPT 3-Month Coaching Agreement
          </h2>
          <pre style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7, fontSize: 14, color: '#333' }}>
            {AGREEMENT_TEXT}
          </pre>
        </div>

        {/* Right: Form */}
        <div style={{
          padding: 40,
          background: '#f5f5f5',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <label style={{ fontWeight: 600 }}>Full Name</label>
            <input
              value={form.clientName}
              onChange={e => setForm({ ...form, clientName: e.target.value })}
              placeholder="Enter your full name"
              style={inputStyle}
            />

            <label style={{ fontWeight: 600 }}>Date</label>
            <input
              type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              style={inputStyle}
            />

            <label style={{ fontWeight: 600 }}>Signature</label>
            <div style={{
              border: '2px solid #ccc',
              borderRadius: 12,
              background: '#fff',
              padding: 6
            }}>
              <SignatureCanvas
                ref={sigRef}
                canvasProps={{ width: 420, height: 160, style: { background: '#fff' } }}
              />
            </div>

            <button
              onClick={clearSignature}
              style={{
                marginTop: 8,
                background: 'none',
                border: 'none',
                color: '#555',
                cursor: 'pointer'
              }}
            >
              Clear Signature
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              marginTop: 30,
              padding: 16,
              borderRadius: 14,
              border: 'none',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #000, #444)',
              color: '#fff',
              fontSize: 18,
              fontWeight: 600,
              boxShadow: '0 10px 30px rgba(0,0,0,.4)'
            }}
          >
            {loading ? 'Processing…' : 'Download Agreement & Checkout'}
          </button>
        </div>
      </div>
    </div>
  )
}