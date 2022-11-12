import axios from "axios";

const instance = axios.create({
    baseURL: 'https://hacker-news.firebaseio.com/v0/'
})

export const hackerNewsAPI = {
    getStories() {
        return instance.get<number[]>('newstories.json')
    },
    getStory(storyId: number) {
        return instance.get<RootStoryType>(`item/${storyId}.json`)
    }
}

// Types
export type RootStoryType = {
	by: string
	descendants: number
	id: number
	kids?: number[]
	score: number
	text?: string
	time: number
	title?: string
	type: string
	url?: string
	parent?: number
}