import React from 'react';
import {
    List,
    SimpleList,
    SimpleShowLayout,
    RichTextField,
    NumberField,
    DateField,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    ShowButton,
    SimpleForm,
    TextInput,
    ReferenceInput,
    SelectInput,
    Edit,
    Create,
    Filter,
    Show
} from 'react-admin';
import {useMediaQuery} from '@material-ui/core';

///--- Display List ---///
export const PostList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List filters={<PostFilter/>} {...props}>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.title}
                    secondaryText={record => `${record.views} views`}
                    tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
                />
            ) : (
                <Datagrid>
                    <TextField source="id"/>
                    <ReferenceField label="User" source="userId" reference="users">
                        <TextField source="name"/>
                    </ReferenceField>
                    <TextField source="title"/>
                    <TextField source="body"/>
                    <EditButton/><ShowButton/>
                </Datagrid>
            )}
        </List>
    );
}

///--- Title in edit page ---///
const PostTitle = ({record}) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};
///--- Edit List ---///
export const PostEdit = props => (
    <Edit title={<PostTitle/>} {...props}>
        <SimpleForm>
            <TextInput disabled source="id"/>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <TextInput source="title"/>
            <TextInput multiline source="body"/>
        </SimpleForm>
    </Edit>
);

///--- Create or Adding to List ---///
export const PostCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <TextInput source="title"/>
            <TextInput multiline source="body"/>
        </SimpleForm>
    </Create>
);

///--- Search the list of posts ---///
const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn/>
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name"/>
        </ReferenceInput>
    </Filter>
);

///--- View Post ---///
export const PostShow = (props) => (
    <Show title={<PostTitle/>} {...props}>
        <SimpleShowLayout>
            <TextField source="title"/>
            <RichTextField source="body"/>
            <NumberField source="nb_views"/>
            <DateField label="Publication date" source="created_at"/>
        </SimpleShowLayout>
    </Show>
);