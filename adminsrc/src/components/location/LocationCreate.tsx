import {
    Create,
    SimpleForm,
    TextInput,
    BooleanInput,
    required
} from 'react-admin';

import { FormActionToolbar } from '../common/FormActionToolbar';

export const LocationCreate = () => {
    return (
        <div>
            <h2>Create New Location</h2>
            <Create disableAuthentication>
                <SimpleForm toolbar={<FormActionToolbar />}>
                    <TextInput source="name" validate={required()} />
                    <BooleanInput source="actived" defaultValue={true} />
                </SimpleForm>
            </Create>
        </div>
    )
};