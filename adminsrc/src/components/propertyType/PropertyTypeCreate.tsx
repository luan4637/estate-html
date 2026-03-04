import {
    Create,
    SimpleForm,
    TextInput,
    BooleanInput,
    required
} from 'react-admin';

import { FormActionToolbar } from '../common/FormActionToolbar';

export const PropertyTypeCreate = () => {
    return (
        <Create disableAuthentication>
            <SimpleForm toolbar={<FormActionToolbar />}>
                <TextInput source="name" validate={required()} />
                <TextInput source="icon" />
                <BooleanInput source="actived" defaultValue={true} />
            </SimpleForm>
        </Create>
    )
};