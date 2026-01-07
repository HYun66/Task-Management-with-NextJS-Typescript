import '@testing-library/jest-dom';

// Mock framer-motion to avoid dynamic import issues in tests
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  domAnimation: () => Promise.resolve(),
  domMax: () => Promise.resolve(),
  motion: {
    div: 'div',
    span: 'span',
    button: 'button',
    form: 'form',
    input: 'input',
    textarea: 'textarea',
  },
  AnimatePresence: ({ children }) => children,
  LazyMotion: ({ children }) => children,
}));

// Mock HTMLFormElement.requestSubmit for tests
Object.defineProperty(HTMLFormElement.prototype, 'requestSubmit', {
  value: function () {
    this.dispatchEvent(new Event('submit', { bubbles: true }));
  },
  writable: true,
});

// Suppress animation warnings in tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
