import { Edit,
    SimpleForm,
    TextInput,
    BooleanInput,
    DateInput,
    required
} from 'react-admin';

import { FormActionToolbar } from '../common/FormActionToolbar';

export const LocationEdit = () => {
    return (
        <Edit>
            <SimpleForm toolbar={<FormActionToolbar />}>
                <TextInput disabled label="Id" source="id" />
                <TextInput source="name" validate={required()} />
                <BooleanInput source="actived" />
                <DateInput label="Created date" source="created_at" disabled />
            </SimpleForm>
        </Edit>
    )
};