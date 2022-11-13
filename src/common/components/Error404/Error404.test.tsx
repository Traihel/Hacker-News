import {render, screen} from '@testing-library/react';
import {Error404} from './Error404';

test('Story render', () => {
    render(<Error404/>)
    expect(screen.getByText('Page not found')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
})