'use client'

import { useState } from 'react'
import { FileKey2, ShieldCheck } from 'lucide-react'

export function LocalFileFingerprint() {
  const [name, setName] = useState('')
  const [size, setSize] = useState<number | null>(null)
  const [hash, setHash] = useState('')
  const [busy, setBusy] = useState(false)

  async function fingerprint(file?: File) {
    if (!file) return
    setBusy(true)
    setName(file.name)
    setSize(file.size)
    try {
      const bytes = await file.arrayBuffer()
      const digest = await crypto.subtle.digest('SHA-256', bytes)
      const hex = Array.from(new Uint8Array(digest))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('')
      setHash(hex)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="mt-7 border border-border p-5">
      <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-primary">
            <ShieldCheck className="size-4" /> Local integrity check
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Select any local file to calculate its SHA-256 fingerprint. The file stays in your browser and is not uploaded by this prototype.
          </p>
          {name && (
            <div className="mt-4 border-l border-primary pl-4">
              <div className="text-sm">{name}{size !== null ? ` · ${size.toLocaleString()} bytes` : ''}</div>
              <div className="mt-2 break-all font-mono text-[11px] leading-5 text-muted-foreground">
                {busy ? 'Calculating…' : hash ? `SHA-256 · ${hash}` : ''}
              </div>
            </div>
          )}
        </div>
        <label className="inline-flex cursor-pointer items-center justify-center gap-2 border border-foreground px-5 py-3 text-xs uppercase tracking-[0.14em] transition-colors hover:bg-foreground hover:text-background">
          <FileKey2 className="size-4" /> Fingerprint a file
          <input type="file" className="sr-only" onChange={(event) => fingerprint(event.target.files?.[0])} />
        </label>
      </div>
    </section>
  )
}
