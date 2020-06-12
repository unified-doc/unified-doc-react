import React from 'react';
import renderer from 'react-test-renderer';

import { htmlContent } from './fixtures';
import { Doc } from '..';

describe('classname', () => {
  it('applies custom CSS class name', () => {
    const tree = renderer
      .create(
        <Doc
          className="custom-doc"
          content={htmlContent}
          filename="doc.html"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
