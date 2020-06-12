import React from 'react';
import renderer from 'react-test-renderer';
import toc from 'rehype-toc';

import { htmlContent } from './fixtures';
import Doc from '../lib/component';

describe('plugins', () => {
  it('applies custom plugins', () => {
    const plugins = [[toc, { cssClasses: { list: 'custom-list' } }]];
    const sanitizeSchema = { attributes: { '*': ['className'] } };
    const tree = renderer
      .create(
        <Doc
          content={htmlContent}
          filename="doc.html"
          plugins={plugins}
          sanitizeSchema={sanitizeSchema}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
