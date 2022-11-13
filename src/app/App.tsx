import React from 'react';
import styles from './App.module.scss'
import {NewStories} from '../features/NewStories/NewStories';
import {StoryPage} from '../features/StoryPage/StoryPage';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Error404} from '../common/components/Error404/Error404';
import {LinearProgress} from '../common/components/LinearProgress/LinearProgress';
import {useAppSelector} from '../common/hooks/useAppSelector';

export const App = () => {

    const status = useAppSelector(state => state.app.status)

    return (
        <div className={styles.app}>
            {status === 'loading' && <LinearProgress/>}
            <Switch>
                <Route exact path='/' render={() => <Redirect to={'/newStories'}/>}/>
                <Route path='/newStories' render={() => <NewStories/>}/>
                <Route path='/story/:storyID' render={() => <StoryPage/>}/>
                <Route path='/error404' render={() => <Error404/>}/>
                <Route render={() => <Redirect to={'/error404'}/>}/>
            </Switch>

        </div>
    );
}