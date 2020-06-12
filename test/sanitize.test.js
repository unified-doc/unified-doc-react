import React from 'react';
import renderer from 'react-test-renderer';

import Doc from '../lib/component';

const htmlContent = '<div classname="red" style="background: red;">text</div>';

describe('sanitize', () => {
  it('sanitizes html by default', () => {
    const tree = renderer
      .create(<Doc content={htmlContent} filename="doc.html" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('applies custom sanitize schema', () => {
    const sanitizeSchema = { attributes: { '*': ['style'] } };
    const tree = renderer
      .create(
        <Doc
          content={htmlContent}
          filename="doc.html"
          sanitizeSchema={sanitizeSchema}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
