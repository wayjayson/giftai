import { describe, expect, test } from 'vitest';
import { cn } from '../utils';

describe('cn utility function', () => {
  test('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
    expect(cn('px-2 py-1', 'bg-red-500')).toBe('px-2 py-1 bg-red-500');
  });

  test('handles conditional classes', () => {
    const isActive = true;
    const isDisabled = false;
    expect(cn('base', { 'active': isActive, 'disabled': isDisabled })).toBe('base active');
  });

  test('handles tailwind merge conflicts', () => {
    // tailwind-merge should resolve conflicts
    expect(cn('px-2', 'px-4')).toBe('px-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });
});