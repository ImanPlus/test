import React from 'react';
import {Admin, Resource, ShowGuesser} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import {UserList} from './users'
import {PostList, PostEdit, PostCreate, PostShow} from './post';
import {CommentList, CommentEdit, CommentCreate} from './Comments';

import NotFound from './NotFound';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import Menu from './Menu';
import theme from './theme';

import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');

const App = () => (
    <Admin title="My Custom Admin" dashboard={Dashboard} authProvider={authProvider}
           dataProvider={dataProvider} catchAll={NotFound} theme={theme}>
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} show={PostShow}/>
        <Resource name="users" list={UserList} icon={UserIcon}/>
        <Resource name="comments" list={CommentList} edit={CommentEdit} create={CommentCreate} icon={ChatBubbleIcon}/>
    </Admin>
);

export default App;