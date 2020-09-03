import React from 'react';
import renderer from 'react-test-renderer';

import DocComponent from '../../lib/component';

const htmlContent = '<div classname="red" style="background: red;">text</div>';

describe('sanitize', () => {
  it('sanitizes html by default', () => {
    const options = {
      content: htmlContent,
      filename: 'doc.html',
    };
    const tree = renderer.create(<DocComponent options={options} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('applies custom sanitize schema', () => {
    const sanitizeSchema = { attributes: { '*': ['style'] } };
    const options = {
      content: htmlContent,
      filename: 'doc.html',
      sanitizeSchema,
    };
    const tree = renderer.create(<DocComponent options={options} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('does not apply sanitize schema', () => {
    const options = {
      content: htmlContent,
      filename: 'doc.html',
      sanitizeSchema: null,
    };
    const tree = renderer.create(<DocComponent options={options} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
