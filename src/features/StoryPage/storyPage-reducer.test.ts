import {CommentType, StoryType} from '../../api/api';
import {InitialStoryPageStateType, storyPageReducer} from './storyPage-reducer';
import {getComments, getStory} from './storyPage-actions';

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

test('get story data', () => {
    const action = getStory.fulfilled(newStory, 'requestId', {storyId: 123})
    const storyPageReducerTest = storyPageReducer(state, action)
    expect(storyPageReducerTest.story).not.toBe(null)
    expect(storyPageReducerTest.story?.by).toBe('Vladimir')
})

test('get comments data', () => {
    const action = getComments.fulfilled(newComments, 'requestId', {kidsId: [123]})
    const storyPageReducerTest = storyPageReducer(state, action)
    expect(storyPageReducerTest.comments).not.toBe(null)
    expect(storyPageReducerTest.comments?.length).toBe(1)
})