import React from 'react';
import renderer from 'react-test-renderer';
import toc from 'rehype-toc';

import { htmlContent } from '../fixtures';
import { Doc } from '../..';

describe('plugins', () => {
  it('applies custom plugins', () => {
    const plugins = [[toc, { cssClasses: { list: 'custom-list' } }]];
    const sanitizeSchema = { attributes: { '*': ['className'] } };
    const tree = renderer
      .create(
        <Doc
          options={{
            content: htmlContent,
            filename: 'doc.html',
            plugins,
            sanitizeSchema,
          }}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});