import {
    Create,
    SimpleForm,
    TextInput,
    BooleanInput,
    required
} from 'react-admin';

import { FormActionToolbar } from '../common/FormActionToolbar';

export const PropertyCreate = () => {
    return (
        <Create disableAuthentication>
            <SimpleForm toolbar={<FormActionToolbar />}>
                <TextInput source="title" validate={required()} />
                <BooleanInput source="actived" defaultValue={true} />
            </SimpleForm>
        </Create>
    )
};