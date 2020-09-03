import React from 'react';
import renderer from 'react-test-renderer';
import highlight from 'rehype-highlight';

import DocComponent from '../../lib/component';
import { jsContent } from '../fixtures';

const sanitizeSchema = {
  attributes: {
    '*': ['className', 'style'],
    mark: ['dataMarkId', 'id'],
  },
  clobberPrefix: '',
};

const marks = [{ id: 'a', start: 9, end: 14, classNames: ['a', 'b'] }];

describe('plugins', () => {
  it('applies prePlugins', () => {
    const prePlugins = [[highlight]];
    const options = {
      content: jsContent,
      filename: 'doc.js',
      marks,
      prePlugins,
      sanitizeSchema,
    };
    const tree = renderer.create(<DocComponent options={options} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('applies postPlugins', () => {
    const postPlugins = [[highlight]];
    const options = {
      content: jsContent,
      filename: 'doc.js',
      marks,
      postPlugins,
      sanitizeSchema,
    };
    const tree = renderer.create(<DocComponent options={options} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
