import React from 'react';
import renderer from 'react-test-renderer';

import { htmlContent } from '../fixtures';
import DocComponent from '../../lib/component';

describe('classname', () => {
  it('applies custom CSS class name', () => {
    const options = {
      content: htmlContent,
      filename: 'doc.html',
    };
    const tree = renderer
      .create(<DocComponent className="custom-doc" options={options} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
