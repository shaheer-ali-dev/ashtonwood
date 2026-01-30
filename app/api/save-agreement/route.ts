import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(req: Request) {
  const { image, filename } = await req.json()

  const buffer = Buffer.from(image.replace(/^data:image\/png;base64,/, ''), 'base64')

  const dir = path.join(process.cwd(), 'agreements')
  await writeFile(`${dir}/${filename}`, buffer)

  return Response.json({ success: true })
}
