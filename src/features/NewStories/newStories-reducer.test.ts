import {InitialNewStoriesStateType, newStoriesReducer, setStoriesData} from './newStories-reducer';
import {StoryType} from '../../api/api';

let state: InitialNewStoriesStateType
let newStories: StoryType[]

beforeEach(() => {
    state = {
        stories: null
    }
    newStories = [
        {
            by: 'Vladimir',
            descendants: 0,
            id: 123,
            kids: [1, 2, 3],
            score: 15,
            time: 123,
            title: 'Title text',
            type: 'story',
            url: 'https://123..com'
        },
        {
            by: 'Alex',
            descendants: 2,
            id: 456,
            kids: [1, 2],
            score: 15,
            time: 123,
            title: 'Title text',
            type: 'story',
            url: 'https://123..com'
        }
    ]
})

test('set stories data', () => {
    const newStoriesReducerTest = newStoriesReducer(state, setStoriesData(newStories))
    expect(newStoriesReducerTest.stories).not.toBe(null)
    expect(newStoriesReducerTest.stories?.length).toBe(2)
})