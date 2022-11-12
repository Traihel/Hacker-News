import axios from "axios";

const instance = axios.create({
    baseURL: 'https://hacker-news.firebaseio.com/v0/'
})

export const hackerNewsAPI = {
    getStories() {
        return instance.get('newstories.json')
    },
    getStory(storyId: string) {
        return instance.get(`item/${storyId}.json`)
    }
}