import { setup, $fetch } from '@nuxt/test-utils/e2e'
import { describe, it, expect } from 'vitest'

/**
 * API Response Format Tests
 *
 * Verifies API endpoints return the standardized response format:
 * - Success: { success: true, timestamp, data }
 * - Error: { success: false, timestamp, error: { status, code, message } }
 */

describe('API Response Format', async () => {
  await setup({
    server: true,
  })

  const expectSuccessResponse = (response: unknown) => {
    expect(response).toMatchObject({
      success: true,
      timestamp: expect.any(String),
      data: expect.anything(),
    })
    const { timestamp } = response as { timestamp: string }
    expect(new Date(timestamp).toISOString()).toBe(timestamp)
  }

  describe('GET /api/health', () => {
    it('returns success response with health data', async () => {
      const response = await $fetch('/api/health')

      expectSuccessResponse(response)
      expect((response as { data: unknown }).data).toMatchObject({
        status: 'ok',
        timestamp: expect.any(String),
        version: expect.any(String),
      })
    })
  })

  describe('Response Structure Invariants', () => {
    it('all success responses have success=true and timestamp', async () => {
      const response = await $fetch('/api/health')
      expect(response).toHaveProperty('success', true)
      expect(response).toHaveProperty('timestamp')
      expect(response).toHaveProperty('data')
    })
  })
})
