// jest.setup.ts

import "@testing-library/jest-dom"

// For handling fetch in tests
import 'whatwg-fetch';

import React from "react"


jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => React.createElement("img", props),
}))

// Mock next/router
jest.mock('next/router', () => require('next-router-mock'));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: jest.fn().mockReturnValue('/'),
  useParams: jest.fn().mockReturnValue({}),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
}));