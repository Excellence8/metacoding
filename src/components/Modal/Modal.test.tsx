import React from 'react';
import { render, screen } from '@testing-library/react';
import Modal from './index';

describe('Modal', () => {
  it('renders without crashing', () => {
    render(<Modal />);
    expect(screen.getByText('Modal 组件')).toBeInTheDocument();
  });
  
  it('accepts custom children', () => {
    render(
      <Modal>
        <div>自定义内容</div>
      </Modal>
    );
    expect(screen.getByText('自定义内容')).toBeInTheDocument();
  });
});
