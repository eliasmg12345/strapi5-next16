'use client'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { actions } from '@/actions'
import { useActionState } from 'react'
import { type FormState } from '@/validations/auth'
import { FormError } from './ui/form-error'

const styles = {
    container: "w-full max-w-md",
    header: "space-y-1",
    title: "text-3xl font-bold text-pink-500",
    content: "space-y-4",
    fieldGroup: "space-y-2",
    footer: "flex flex-col",
    button: "w-full",
    prompt: "mt-4 text-center text-sm",
    link: "ml-2 text-pink-500"
}

const INITIAL_STATE: FormState = {
    success: false,
    message: undefined,
    strapiErrors: null,
    zodErrors: null,
    data: {
        username: '',
        password: '',
        email: '',
    }
}

export function SignUpForm() {
    const [formState, formAction] = useActionState(actions.auth.registerUserAction, INITIAL_STATE)
    console.log(formState);

    return (
        <div className={styles.container}>
            <form action={formAction}>
                <Card>
                    <CardHeader className={styles.header}>
                        <CardTitle className={styles.title}>Sign Up</CardTitle>
                        <CardDescription>
                            Enter your details to create a new account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className={styles.content}>
                        <div className={styles.fieldGroup}>
                            <Label htmlFor="username">Username</Label>
                            <Input
                                type="text"
                                id="username"
                                name="username"
                                placeholder='username'
                                defaultValue={formState.data?.username ?? ''}
                            />
                            <FormError error={formState.zodErrors?.username} />
                        </div>
                        <div className={styles.fieldGroup}>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                placeholder='name@example.com'
                                defaultValue={formState.data?.email ?? ''}
                            />
                            <FormError error={formState.zodErrors?.email} />
                        </div>
                        <div className={styles.fieldGroup}>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder='password'
                                defaultValue={formState.data?.password ?? ''}
                            />
                            <FormError error={formState.zodErrors?.password} />
                        </div>
                    </CardContent>
                    <CardFooter className={styles.footer}>
                        <Button className='styles.button'>Sign Up</Button>
                        {formState.strapiErrors &&
                            <p className='text-pink-700 text-xs italic  mt-1 py-2'>{formState.strapiErrors.message}</p>
                        }
                    </CardFooter>
                </Card>
                <div className={styles.prompt}>
                    Have an account?
                    <Link className={styles.link} href="signin">
                        Sign In
                    </Link>
                </div>
            </form>
        </div>
    )
}