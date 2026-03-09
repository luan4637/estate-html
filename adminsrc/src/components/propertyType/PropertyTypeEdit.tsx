import { Edit,
    SimpleForm,
    TextInput,
    BooleanInput,
    DateInput,
    required
} from 'react-admin';

import { FormActionToolbar } from '../common/FormActionToolbar';

export const PropertyTypeEdit = () => {
    return (
        <div>
            <h2>Edit Property Type</h2>
            <Edit>
                <SimpleForm toolbar={<FormActionToolbar />}>
                    <TextInput disabled label="Id" source="id" />
                    <TextInput source="name" validate={required()} />
                    <TextInput source="icon" />
                    <BooleanInput source="actived" />
                    <DateInput label="Created date" source="created_at" disabled />
                </SimpleForm>
            </Edit>
        </div>
    )
};