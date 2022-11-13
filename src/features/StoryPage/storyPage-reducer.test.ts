import {CommentType, StoryType} from '../../api/api';
import {InitialStoryPageStateType, setCommentsData, setStoryData, storyPageReducer} from './storyPage-reducer';

let state: InitialStoryPageStateType
let newStory: StoryType
let newComments: CommentType[]

beforeEach(() => {
    state = {
        story: null,
        comments: null
    }
    newStory = {
        by: 'Vladimir',
        descendants: 0,
        id: 123,
        kids: [1, 2, 3],
        score: 15,
        time: 123,
        title: 'Title text',
        type: 'story',
        url: 'https://123..com'
    }
    newComments = [
        {
            by: 'Alex',
            id: 123,
            parent: 1,
            kids: [1, 2, 3],
            text: 'Text comment',
            time: 123,
            type: 'comment'
        }
    ]
})

test('set story data', () => {
    const storyPageReducerTest = storyPageReducer(state, setStoryData(newStory))
    expect(storyPageReducerTest.story).not.toBe(null)
    expect(storyPageReducerTest.story?.by).toBe('Vladimir')
})

test('set comments data', () => {
    const storyPageReducerTest = storyPageReducer(state, setCommentsData(newComments))
    expect(storyPageReducerTest.comments).not.toBe(null)
    expect(storyPageReducerTest.comments?.length).toBe(1)
})