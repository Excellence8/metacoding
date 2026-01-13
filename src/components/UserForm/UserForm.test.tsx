import React from 'react';
import { render, screen } from '@testing-library/react';
import UserForm from './index';

describe('UserForm', () => {
  it('renders without crashing', () => {
    render(<UserForm />);
    expect(screen.getByText('UserForm 组件')).toBeInTheDocument();
  });
  
  it('accepts custom children', () => {
    render(
      <UserForm>
        <div>自定义内容</div>
      </UserForm>
    );
    expect(screen.getByText('自定义内容')).toBeInTheDocument();
  });
});
