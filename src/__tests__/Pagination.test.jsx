import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from './../components/Pagination';

describe('Pagination', () => {
  const mockChangePage = jest.fn();

  const props = {
    pagination: {
      pages: 5,
      prev: null,
      next: 2,
    },
    page: 1,
    changePage: mockChangePage,
  };

  it('renders correctly', () => {
    const { getByText } = render(<Pagination {...props} />);
    ['1', '2', '3', '...', '5'].forEach(text => expect(getByText(text)).toBeTruthy());
  });

  it('calls changePage when a page number is clicked', () => {
    const { getByText } = render(<Pagination {...props} />);
    fireEvent.click(getByText('2'));
    expect(mockChangePage).toHaveBeenCalledWith(2);
  });

  it('does not call changePage when a disabled page number is clicked', () => {
    const { getByText } = render(<Pagination {...props} />);
    fireEvent.click(getByText('...'));
    expect(mockChangePage).toHaveBeenCalled();
  });

  it('calls changePage with correct argument when next page is clicked', () => {
    const { getByText } = render(<Pagination {...props} />);
    fireEvent.click(getByText('»'));
    expect(mockChangePage).toHaveBeenCalledWith(props.page + 1);
  });

  it('calls changePage with correct argument when previous page is clicked', () => {
    const newProps = { ...props, page: 2, pagination: { ...props.pagination, prev: 1 } };
    const { getByText } = render(<Pagination {...newProps} />);
    fireEvent.click(getByText('«'));
    expect(mockChangePage).toHaveBeenCalledWith(newProps.page - 1);
  });
});