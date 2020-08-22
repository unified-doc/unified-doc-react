import React from 'react';
import renderer from 'react-test-renderer';
import toc from 'rehype-toc';

import Doc from '../../lib/component';
import { htmlContent } from '../fixtures';

describe('plugins', () => {
  it('applies post plugins', () => {
    const postPlugins = [[toc, { cssClasses: { list: 'custom-list' } }]];
    const sanitizeSchema = { attributes: { '*': ['className'] } };
    const tree = renderer
      .create(
        <Doc
          options={{
            content: htmlContent,
            filename: 'doc.html',
            postPlugins,
            sanitizeSchema,
          }}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
