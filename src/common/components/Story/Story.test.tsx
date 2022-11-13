import {render, screen} from '@testing-library/react';
import {Story} from './Story';

test('Story render', () => {
    render(<Story
        title={'Title text'}
        nameUser={'Vladimir'}
        time={123}
        score={150}
        comments={50}
        url={'https://github.com/Traihel/Hacker-News'}
    />)
    expect(screen.getByText('Title text')).toBeInTheDocument()
    expect(screen.queryByRole('link')).toBeInTheDocument()
    expect(screen.queryByText('Rating: 150')).toBeInTheDocument()
    expect(screen.queryByText('Comments: 50')).toBeInTheDocument()
})