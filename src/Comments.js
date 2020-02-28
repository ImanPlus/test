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
    Show,
} from 'react-admin';
import {useMediaQuery} from '@material-ui/core';

///--- Display List of Comments ---///
export const CommentList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List filters={<CommentFilter/>} {...props}>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.title}
                    secondaryText={record => `${record.views} views`}
                    tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
                />
            ) : (
                <Datagrid>
                    <TextField source="id"/>
                    <ReferenceField label="Name" source="postId" reference="comments">
                        <TextField source="name"/>
                    </ReferenceField>
                    <TextField source="email"/>
                    <TextField source="body"/>
                    <EditButton/><ShowButton/>
                </Datagrid>
            )}
        </List>
    );
}


///--- Title in Comment page ---///
const CommentTitle = ({record}) => {
    return <span>Comment {record ? `"${record.title}"` : ''}</span>;
};
///--- Edit List ---///
export const CommentEdit = props => (
    <Edit title={<CommentTitle/>} {...props}>
        <SimpleForm>
            <TextInput disabled source="postId"/>
            <ReferenceInput source="postId" reference="comments">
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <TextInput source="email"/>
            <TextInput multiline source="body"/>
        </SimpleForm>
    </Edit>
);

///--- Create or Adding to List ---///
export const CommentCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="postId" reference="posts">
                <SelectInput optionText="title"/>
            </ReferenceInput>
            <TextInput source="id"/>
            <TextInput source="name"/>
            <TextInput source="email"/>
            <TextInput multiline source="body"/>
        </SimpleForm>
    </Create>
);

///--- Search the list of posts ---///
const CommentFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn/>
        <ReferenceInput label="Name" source="body" reference="comments" allowEmpty>
            <SelectInput optionText="name"/>
        </ReferenceInput>
    </Filter>
);