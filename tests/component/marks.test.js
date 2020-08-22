import React from 'react';
import renderer from 'react-test-renderer';

import Doc from '../../lib/component';
import { htmlContent } from '../fixtures';

describe('marks', () => {
  it('does nothing with empty marks', () => {
    const marks = [];
    const options = {
      content: htmlContent,
      filename: 'doc.html',
      marks,
    };
    const tree = renderer.create(<Doc options={options} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('does nothing when marks are out of range', () => {
    const marks = [{ id: 'a', start: 200, end: 400 }];
    const options = {
      content: htmlContent,
      filename: 'doc.html',
      marks,
    };
    const tree = renderer.create(<Doc options={options} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('marks non-overlapping text nodes', () => {
    const marks = [
      { id: 'a', start: 0, end: 4 },
      { id: 'b', start: 5, end: 12 },
    ];
    const options = {
      content: htmlContent,
      filename: 'doc.html',
      marks,
    };
    const tree = renderer.create(<Doc options={options} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('marks overlapping text nodes', () => {
    const marks = [
      { id: 'a', classNames: ['class-a'], start: 0, end: 7 },
      { id: 'b', classNames: ['class-b'], start: 5, end: 10 },
      { id: 'c', classNames: ['class-c'], start: 6, end: 15 },
    ];
    const options = {
      content: htmlContent,
      filename: 'doc.html',
      marks,
    };
    const tree = renderer.create(<Doc options={options} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('applies custom class names and styles', () => {
    const marks = [
      {
        id: 'a',
        classNames: ['class-a'],
        style: { background: 'red', color: 'yellow' },
        start: 0,
        end: 4,
      },
      { id: 'b', classNames: ['class-b1', 'class-b2'], start: 5, end: 12 },
    ];
    const options = {
      content: htmlContent,
      filename: 'doc.html',
      marks,
    };
    const tree = renderer.create(<Doc options={options} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
