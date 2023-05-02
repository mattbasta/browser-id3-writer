import { describe, it } from 'node:test';
import { deepStrictEqual } from 'assert';
import { getEmptyBuffer, id3Header } from '../utils.mjs';
import { encodeWindows1252 } from '../../src/encoder.mjs';
import {
  uint28ToUint7Array,
  uint32ToUint8Array,
} from '../../src/transform.mjs';
import ID3Writer from '../../dist/browser-id3-writer.js';

describe('WPAY', () => {
  it('WPAY', () => {
    const writer = new ID3Writer(getEmptyBuffer());
    writer.padding = 0;
    writer.setFrame('WPAY', 'https://google.com');
    writer.addTag();
    const actual = new Uint8Array(writer.arrayBuffer);
    const expected = new Uint8Array([
      ...id3Header,
      ...uint28ToUint7Array(28), // tag size without header
      ...encodeWindows1252('WPAY'),
      ...uint32ToUint8Array(18), // frame size without header
      0,
      0, // flags
      ...encodeWindows1252('https://google.com'),
    ]);
    deepStrictEqual(actual, expected);
  });
});
