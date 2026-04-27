import { useFormStatus } from 'react-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import PopUpWindow from '@/components/PopUpWindow';
import { z } from 'zod';

const SignUpSchema = z.object({
	email: z.string().email('Enter correct email'),
	password: z.string().min(8, 'Password at least 8 chars long'),
});

const SignUpForm = () => {
	const { pending } = useFormStatus();
	const [popUpMsgs, setPopUpMsgs] = useState<string[]>([]);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const navigation = useNavigate();

	async function handleSubmit(formData: FormData) {
		try {
			const rawData = {
				email: formData.get('email'),
				password: formData.get('password'),
			};

			const result = SignUpSchema.safeParse(rawData);

			if (!result.success) {
				const fieldErrors: Record<string, string> = {};

				result.error.issues.map((err) => {
					const field = err.path[0] as string;
					fieldErrors[field] = err.message;
					return `${field}: ${err.message}`;
				});

				setErrors(fieldErrors);

				return;
			}

			setErrors({});

			const { email, password } = result.data;

			const response = await fetch('http://localhost:3001/api/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email: email, password: password }),
			});

			if (!response.ok) {
				if (response.status === 409) {
					setPopUpMsgs(['We got such a user already']);
					return;
				}
				setPopUpMsgs(["Couldn't create user. Try later again."]);
				return;
			}

			setPopUpMsgs([`User ${email} has been created`]);

			setTimeout(() => {
				navigation('/api/auth/login');
			}, 3000);
		} catch (error) {
			setPopUpMsgs([error as string]);
		}
	}

	return (
		<>
			<form action={handleSubmit} className="align-start flex flex-col">
				<label htmlFor="email">E-Mail</label>
				<input type="text" name="email" id="email" />
				{errors.email && <p className="error">{errors.email}</p>}

				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />
				{errors.password && <p className="error">{errors.password}</p>}

				<button
					type="submit"
					className="btn btn-dash"
					disabled={pending}
				>
					{pending ? 'Adding User...' : 'Add User'}
				</button>
			</form>
			<PopUpWindow messages={popUpMsgs} />
		</>
	);
};

export default SignUpForm;
