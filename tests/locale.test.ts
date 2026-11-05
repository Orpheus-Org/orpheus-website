import { describe, expect, it } from 'vitest'

import { validateLocale } from '../app/types/locale'
import esMessages from '../locales/es.json'

describe('locale files', () => {
  it('locales/es.json matches the locale schema', () => {
    expect(() => validateLocale(esMessages, 'es')).not.toThrow()
  })
})
