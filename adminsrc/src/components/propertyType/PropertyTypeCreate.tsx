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
        <div>
            <h2>Create New Property Type</h2>
            <Create disableAuthentication>
                <SimpleForm toolbar={<FormActionToolbar />}>
                    <TextInput source="name" validate={required()} />
                    <TextInput source="icon" />
                    <BooleanInput source="actived" defaultValue={true} />
                </SimpleForm>
            </Create>
        </div>
    )
};