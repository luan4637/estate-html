import {
    Edit,
    SimpleForm,
    TextInput,
    BooleanInput,
    DateInput,
    required
} from 'react-admin';

import { FormActionToolbar } from '../common/FormActionToolbar';

export const PropertyEdit = () => {
    return (
        <Edit>
            <SimpleForm toolbar={<FormActionToolbar />}>
                <TextInput disabled label="Id" source="id" />
                <TextInput source="title" validate={required()} />
                <BooleanInput source="actived" />
                <DateInput label="Created date" source="created_at" disabled />
            </SimpleForm>
        </Edit>
    )
};