// @vitest-environment jsdom
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { LandingPage } from '../src/pages/LandingPage';
import { LoginPage } from '../src/pages/LoginPage';

describe('ProofScholar UI Component Tests', () => {
  it('should render Landing Page hero heading', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeDefined();
    expect(heading.textContent).toContain('Privacy-first Research Credential');
  });

  it('should render Login Page form elements', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/researcher@university.edu/i)).toBeDefined();
    expect(screen.getByText(/Connect with Lace Wallet/i)).toBeDefined();
  });
});
