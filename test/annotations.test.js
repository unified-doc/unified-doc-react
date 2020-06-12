import React from 'react';
import renderer from 'react-test-renderer';

import { htmlContent } from './fixtures';
import { Doc } from '..';

describe('annotations', () => {
  it('does not annotate with empty annotations', () => {
    const annotations = [];
    const tree = renderer
      .create(
        <Doc
          annotations={annotations}
          content={htmlContent}
          filename="doc.html"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('does not annotate with annotations out of range', () => {
    const annotations = [{ id: 'a', start: 200, end: 400 }];
    const tree = renderer
      .create(
        <Doc
          annotations={annotations}
          content={htmlContent}
          filename="doc.html"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('annotates text nodes (no-overlap)', () => {
    const annotations = [
      { id: 'a', start: 0, end: 4 },
      { id: 'b', start: 5, end: 12 },
    ];
    const tree = renderer
      .create(
        <Doc
          annotations={annotations}
          content={htmlContent}
          filename="doc.html"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('applies custom classe names', () => {
    const annotations = [
      { id: 'a', className: ['class-a'], start: 0, end: 4 },
      { id: 'b', className: ['class-b1', 'class-b2'], start: 5, end: 12 },
    ];
    const tree = renderer
      .create(
        <Doc
          annotations={annotations}
          content={htmlContent}
          filename="doc.html"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('annotates text nodes (overlapping)', () => {
    const annotations = [
      { id: 'a', className: ['class-a'], start: 0, end: 7 },
      { id: 'b', className: ['class-b'], start: 5, end: 10 },
      { id: 'c', className: ['class-c'], start: 6, end: 15 },
    ];
    const tree = renderer
      .create(
        <Doc
          annotations={annotations}
          content={htmlContent}
          filename="doc.html"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TODO: will be implemented. supports annotation callbacks', () => {});
});
