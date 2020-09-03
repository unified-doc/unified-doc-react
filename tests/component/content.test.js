import React from 'react';
import renderer from 'react-test-renderer';

import DocComponent from '../../lib/component';
import {
  markdownContent,
  htmlContent,
  jsContent,
  jsonContent,
} from '../fixtures';

const sanitizeSchema = {
  attributes: {
    '*': ['className', 'style'],
    mark: ['dataMarkId', 'id'],
  },
  clobberPrefix: '',
};

describe('content', () => {
  describe('html content', () => {
    it('renders html content (.html extension)', () => {
      const options = {
        content: htmlContent,
        filename: 'doc.html',
      };
      const tree = renderer.create(<DocComponent options={options} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders code block (.any extension)', () => {
      const options = {
        content: htmlContent,
        filename: 'doc.any',
      };
      const tree = renderer.create(<DocComponent options={options} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders html content (.md extension)', () => {
      const options = {
        content: htmlContent,
        filename: 'doc.md',
      };
      const tree = renderer.create(<DocComponent options={options} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('markdown content', () => {
    it('renders markdown content (.html extension)', () => {
      const options = {
        content: markdownContent,
        filename: 'doc.html',
      };
      const tree = renderer.create(<DocComponent options={options} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders code block (.any extension)', () => {
      const options = {
        content: markdownContent,
        filename: 'doc.any',
      };
      const tree = renderer.create(<DocComponent options={options} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders markdown content (.md extension)', () => {
      const options = {
        content: markdownContent,
        filename: 'doc.md',
      };
      const tree = renderer.create(<DocComponent options={options} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('code block content (sanitized)', () => {
    it('renders JS content to code block (.js extension)', () => {
      const options = {
        content: jsContent,
        filename: 'doc.js',
        sanitizeSchema,
      };
      const tree = renderer.create(<DocComponent options={options} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders JSON content to code block (.js extension)', () => {
      const options = {
        content: jsonContent,
        filename: 'doc.json',
        sanitizeSchema,
      };
      const tree = renderer.create(<DocComponent options={options} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
