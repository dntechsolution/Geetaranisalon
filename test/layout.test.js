import test from 'node:test'
import assert from 'node:assert/strict'
import {renderHeader} from '../src/components/layout.js'

test('renderHeader includes an accessible monthly Sankranti closure notice', () => {
  const header = renderHeader('/')

  assert.match(header, /role="status"/)
  assert.match(header, /Monthly Holiday Notice: Geetarani Unisex Salon remains closed on Sankranti every month\./)
})
