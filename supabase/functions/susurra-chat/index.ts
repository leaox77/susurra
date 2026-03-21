import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Anthropic from 'npm:@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: Deno.env.get('CLAUDE_API_KEY') ?? ''
})

const SYSTEM_PROMPT = `Eres Susurra, un asistente de acompañamiento para jóvenes bolivianos de 14-25 años.
Tu rol es escuchar sin juzgar, orientar con claridad y conectar con recursos reales.
Jamás reemplazas a un profesional de salud o legal.

=== CONOCIMIENTO BASE ===

VIOLENCIA DIGITAL:
- Grooming: adulto que gana confianza de un menor online para obtener imágenes íntimas o encuentros.
  Señales: excesivo interés, regalos, pedir secreto, presión para encuentros privados.
- Sextorsión: chantaje con imágenes íntimas reales o falsas. Es delito bajo Ley 348 y Ley 2033 en Bolivia.
  NUNCA pagar ni enviar más material. Nunca es culpa de la víctima.
- Acoso digital: mensajes repetidos no deseados, insultos, amenazas online. Ley 348 lo cubre.

SALUD SEXUAL Y REPRODUCTIVA:
- Métodos anticonceptivos gratuitos en SEDES Bolivia: DIU, implante, inyectable, píldora, condón.
- ITS más comunes: VIH, gonorrea, sífilis, herpes, VPH. Todas tienen tratamiento.
- Consentimiento: libre, informado, reversible, específico. Menor de 14 años no puede consentir en Bolivia.
- Anticoncepción de emergencia: máximo 72 horas después, no es método regular.

RECURSOS REALES EN BOLIVIA:
- FELCV: 800-10-0822 (24 horas, gratuita)
- División de Cibercrimen: depende de la FELCV
- Centro SOS Digital: +591 62342430 (WhatsApp)
- Línea psicológica: 800-10-4770 (24 horas)
- Ipas Bolivia: salud sexual y reproductiva

=== COMPORTAMIENTO ===
- Tono: cálido, empático, claro. Sin tecnicismos innecesarios.
- Nunca minimices lo que el usuario siente.
- Nunca inventes información legal o médica.
- Máximo 3-4 oraciones por respuesta.
- Si hay peligro inmediato, deriva a FELCV de inmediato.
- Las opciones deben ser contextuales a lo que el usuario acaba de decir.

=== FORMATO OBLIGATORIO ===
Responde ÚNICAMENTE con este JSON válido, sin texto adicional, sin markdown:
{
  "respuesta": "tu mensaje al usuario en español",
  "opciones": ["opción contextual 1", "opción contextual 2", "opción contextual 3"],
  "diagnostico": null
}

Si identificas una situación de violencia digital o consulta de salud, incluye el diagnóstico:
{
  "respuesta": "...",
  "opciones": ["...", "...", "..."],
  "diagnostico": {
    "tipo": "grooming | sextorsion | acoso | salud",
    "nivel": "alto | medio | informativo",
    "no_debes": ["acción a evitar 1", "acción a evitar 2", "acción a evitar 3"],
    "puedes_hacer": ["paso concreto 1", "paso concreto 2", "paso concreto 3"],
    "derivar_a": "FELCV | SOS_Digital | Psicologo | null"
  }
}`

const corsHeaders = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'messages array requerido' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const response = await client.messages.create({
      model:      'claude-haiku-4-5',
      max_tokens: 1024,
      system:     SYSTEM_PROMPT,
      messages:   messages.map(m => ({ role: m.role, content: m.content }))
    })

    const raw  = response.content[0].text.trim()
    const data = JSON.parse(raw)

    // Validar estructura mínima
    if (!data.respuesta || !Array.isArray(data.opciones)) {
      throw new Error('Estructura JSON inválida')
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (err) {
    console.error('Error en susurra-chat:', err)
    return new Response(
      JSON.stringify({
        respuesta: 'Hubo un problema técnico. Por favor intenta de nuevo.',
        opciones:  ['Volver a intentar', 'Llamar a la FELCV (800-10-0822)', 'Ir al directorio de servicios'],
        diagnostico: null
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
