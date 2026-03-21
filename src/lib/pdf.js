import { jsPDF } from 'jspdf'

/**
 * Genera y descarga la guía de denuncia en PDF.
 * Se ejecuta completamente en el browser — sin servidor.
 */
export async function generateDenunciaPDF(diagnosis) {
  const doc  = new jsPDF({ unit: 'mm', format: 'a4' })
  const W    = doc.internal.pageSize.getWidth()
  const pad  = 20
  let y      = 0

  // ── Helpers ──────────────────────────────────────────────────
  const hex2rgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return [r, g, b]
  }

  const setColor   = (hex)       => doc.setTextColor(...hex2rgb(hex))
  const setFill    = (hex)       => doc.setFillColor(...hex2rgb(hex))
  const setDraw    = (hex)       => doc.setDrawColor(...hex2rgb(hex))
  const addText    = (txt, x, size = 11, color = '#2A2050') => {
    doc.setFontSize(size)
    setColor(color)
    doc.text(txt, x, y)
  }
  const lineBreak  = (n = 6)    => { y += n }
  const hr         = (color = '#E8E4FA') => {
    setDraw(color)
    doc.setLineWidth(0.3)
    doc.line(pad, y, W - pad, y)
    lineBreak(5)
  }

  // ── ENCABEZADO ───────────────────────────────────────────────
  setFill('#1E1640')
  doc.rect(0, 0, W, 38, 'F')

  y = 16
  doc.setFont('helvetica', 'bold')
  addText('Susurra', pad, 22, '#F4F2FF')
  doc.setFont('helvetica', 'normal')
  y = 26
  addText('Guía de denuncia — documento confidencial', pad, 10, '#B8AEED')

  const fecha = new Date().toLocaleDateString('es-BO', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
  addText(fecha, W - pad - 50, 9, '#7B6FCC')

  y = 48

  // ── AVISO IMPORTANTE ─────────────────────────────────────────
  setFill('#E8E4FA')
  doc.roundedRect(pad, y, W - pad * 2, 20, 3, 3, 'F')
  y += 7
  doc.setFont('helvetica', 'bold')
  addText('Documento anónimo — generado por Susurra', pad + 4, 10, '#4A3F8C')
  y += 6
  doc.setFont('helvetica', 'normal')
  addText('Lleva este documento ante la FELCV, División de Cibercrimen o un abogado.', pad + 4, 9, '#7B6FCC')
  y += 14

  // ── TIPO DE SITUACIÓN ─────────────────────────────────────────
  const tipoLabels = {
    grooming:   'Grooming / Manipulación en línea',
    sextorsion: 'Sextorsión (chantaje con imágenes íntimas)',
    acoso:      'Acoso digital',
    salud:      'Consulta de salud sexual y reproductiva',
  }

  doc.setFont('helvetica', 'bold')
  addText('Tipo de situación identificada', pad, 11, '#4A3F8C')
  lineBreak(7)
  setFill('#7B6FCC')
  doc.roundedRect(pad, y, W - pad * 2, 12, 2, 2, 'F')
  y += 8
  doc.setFont('helvetica', 'bold')
  addText(tipoLabels[diagnosis.tipo] || 'Situación de violencia digital', pad + 4, 11, '#F4F2FF')
  y += 10
  hr()

  // ── FECHA Y NIVEL ─────────────────────────────────────────────
  doc.setFont('helvetica', 'bold')
  addText('Fecha del reporte:', pad, 10, '#4A3F8C')
  doc.setFont('helvetica', 'normal')
  addText(fecha, pad + 40, 10, '#2A2050')
  lineBreak(7)

  doc.setFont('helvetica', 'bold')
  addText('Nivel de urgencia:', pad, 10, '#4A3F8C')
  doc.setFont('helvetica', 'normal')
  const nivelMap = { alto: 'ALTO — requiere acción inmediata', medio: 'MEDIO', informativo: 'INFORMATIVO' }
  addText(nivelMap[diagnosis.nivel] || diagnosis.nivel, pad + 40, 10, '#993556')
  lineBreak(10)
  hr()

  // ── QUÉ NO DEBES HACER ───────────────────────────────────────
  if (diagnosis.no_debes?.length) {
    doc.setFont('helvetica', 'bold')
    addText('Acciones a evitar (importante)', pad, 11, '#993556')
    lineBreak(7)

    for (const item of diagnosis.no_debes) {
      doc.setFont('helvetica', 'normal')
      setFill('#F2E4F2')
      doc.circle(pad + 2, y - 1.5, 1.2, 'F')
      const lines = doc.splitTextToSize(item, W - pad * 2 - 10)
      addText(lines[0], pad + 6, 10, '#2A2050')
      if (lines.length > 1) {
        lineBreak(5)
        addText(lines[1], pad + 6, 10, '#2A2050')
      }
      lineBreak(6)
    }
    lineBreak(2)
    hr()
  }

  // ── QUÉ PUEDES HACER ─────────────────────────────────────────
  if (diagnosis.puedes_hacer?.length) {
    doc.setFont('helvetica', 'bold')
    addText('Pasos recomendados a seguir', pad, 11, '#085041')
    lineBreak(7)

    for (let i = 0; i < diagnosis.puedes_hacer.length; i++) {
      const item = diagnosis.puedes_hacer[i]
      doc.setFont('helvetica', 'bold')
      setFill('#A8DDD0')
      doc.roundedRect(pad, y - 3.5, 6, 6, 1, 1, 'F')
      addText(String(i + 1), pad + 1.5, 9, '#085041')
      doc.setFont('helvetica', 'normal')
      const lines = doc.splitTextToSize(item, W - pad * 2 - 10)
      addText(lines[0], pad + 9, 10, '#2A2050')
      if (lines.length > 1) {
        lineBreak(5)
        addText(lines[1], pad + 9, 10, '#2A2050')
      }
      lineBreak(7)
    }
    hr()
  }

  // ── CONTACTOS DE EMERGENCIA ──────────────────────────────────
  doc.setFont('helvetica', 'bold')
  addText('Contactos de emergencia en Bolivia', pad, 11, '#4A3F8C')
  lineBreak(8)

  const contactos = [
    ['FELCV (Fuerza Especial contra la Violencia)', '800-10-0822', '24 horas'],
    ['División de Cibercrimen',                     '800-10-0822', 'depende de FELCV'],
    ['Centro SOS Digital',                          '+591 62342430', 'WhatsApp'],
    ['Línea de apoyo psicológico',                  '800-10-4770', '24 horas'],
  ]

  for (const [nombre, tel, horario] of contactos) {
    doc.setFont('helvetica', 'bold')
    addText(nombre, pad, 9, '#2A2050')
    doc.setFont('helvetica', 'normal')
    addText(tel, W - pad - 50, 9, '#7B6FCC')
    lineBreak(5)
    addText(horario, W - pad - 50, 8, '#B8AEED')
    lineBreak(5)
  }

  // ── PIE DE PÁGINA ────────────────────────────────────────────
  const pageH = doc.internal.pageSize.getHeight()
  setFill('#1E1640')
  doc.rect(0, pageH - 18, W, 18, 'F')
  doc.setFont('helvetica', 'normal')
  addText('Susurra · susurra.app · Hackathon Ipas Bolivia 2025', pad, 8, '#B8AEED')
  addText('Documento generado de forma anónima', W - pad - 60, 8, '#7B6FCC')

  // ── DESCARGAR ────────────────────────────────────────────────
  doc.save(`susurra-guia-denuncia-${Date.now()}.pdf`)
}
