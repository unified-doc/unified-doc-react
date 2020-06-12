import React from 'react';
import renderer from 'react-test-renderer';

import { markdownContent, htmlContent } from './fixtures';
import { Doc } from '..';

describe('content', () => {
  describe('html content', () => {
    it('renders html content (.html extension)', () => {
      const tree = renderer
        .create(<Doc content={htmlContent} filename="doc.html" />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('renders html content (.txt extension)', () => {
      const tree = renderer
        .create(<Doc content={htmlContent} filename="doc.txt" />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('renders html content (.md extension)', () => {
      const tree = renderer
        .create(<Doc content={htmlContent} filename="doc.md" />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('markdown content', () => {
    it('renders markdown content (.html extension)', () => {
      const tree = renderer
        .create(<Doc content={markdownContent} filename="doc.html" />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('renders markdown content (.txt extension)', () => {
      const tree = renderer
        .create(<Doc content={markdownContent} filename="doc.txt" />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('renders markdown content (.md extension)', () => {
      const tree = renderer
        .create(<Doc content={markdownContent} filename="doc.md" />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('buffer content', () => {
    it('renders buffer content (.html extension)', () => {
      const tree = renderer
        .create(<Doc content={Buffer.from(htmlContent)} filename="doc.html" />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('renders buffer content (.txt extension)', () => {
      const tree = renderer
        .create(<Doc content={Buffer.from(htmlContent)} filename="doc.txt" />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('renders buffer content (.md extension)', () => {
      const tree = renderer
        .create(<Doc content={Buffer.from(htmlContent)} filename="doc.md" />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
