import axios from "axios";

const instance = axios.create({
    baseURL: 'https://hacker-news.firebaseio.com/v0/'
})

export const hackerNewsAPI = {
    getStories() {
        return instance.get<number[]>('newstories.json')
    },
    getStory(storyId: number) {
        return instance.get<StoryType & CommentType>(`item/${storyId}.json`)
    }
}

// Types
export type StoryType = {
	by: string
	descendants: number
	id: number
	kids?: number[]
	score: number
	time: number
	title: string
	type: string
	url?: string
}

export type CommentType = {
	by: string
	id: number
	parent: number
	kids?: number[]
	text: string
	time: number
	type: string
}