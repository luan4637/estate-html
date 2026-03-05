import type { ComponentProps } from 'react';
import { styled } from '@mui/material';
import {
    Login,
    LoginForm,
    TextInput,
    PasswordInput
} from 'ra-ui-materialui';
import { required } from 'ra-core';

export const LoginPage = (props: LoginFormProps) => {
    return (
        <Login>
            <LoginForm {...props}>
                <TextInput
                    autoFocus
                    source="email"
                    type="email"
                    label="Email"
                    autoComplete="email"
                    validate={required()}
                    defaultValue="admin@demo.com"
                />
                <TextInput
                    source="password"
                    label="Password"
                    autoComplete="current-password"
                    validate={required()}
                    defaultValue="admin"
                />
            </LoginForm>
        </Login>
    )
};

export interface LoginFormProps
    extends Omit<ComponentProps<typeof Root>, 'onSubmit' | 'children'> {
    disableForgotPassword?: boolean;
}

const PREFIX = 'RaSupabaseLoginForm';

const Root = styled('div', {
    name: PREFIX,
    overridesResolver: (props, styles) => styles.root,
})(() => ({}));