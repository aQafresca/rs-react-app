import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import React from 'react';

global.React = React;

afterEach(() => {
  cleanup();
});
