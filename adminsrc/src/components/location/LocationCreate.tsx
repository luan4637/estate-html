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
        <Create disableAuthentication>
            <SimpleForm toolbar={<FormActionToolbar />}>
                <TextInput source="name" validate={required()} />
                <BooleanInput source="actived" defaultValue={true} />
            </SimpleForm>
        </Create>
    )
};