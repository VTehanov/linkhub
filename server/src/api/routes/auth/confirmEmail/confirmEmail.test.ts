import fetch from 'node-fetch'

test('sends invalid back if bad id sent', async () => {
  const response = await fetch(
    `${process.env.TEST_HOST}/api/auth/confirm-email/somethingwrong`
  )
  const text = await response.text()

  expect(text).toBe('invalid')
})
