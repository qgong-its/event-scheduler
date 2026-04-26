import { useFormStatus } from 'react-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import PopUpWindow from '@/components/PopUpWindow';

const SignUpForm = () => {
	const { pending } = useFormStatus();
	const [popUpMsg, setPopUpMsg] = useState<string>('');
	const navigation = useNavigate();

	async function handleSubmit(formData: FormData) {
		try {
			const email = formData.get('email') as string;
			const password = formData.get('pass') as string;

			if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
				throw 'Enter correct E-Mail';
			if (!password || password.trim().length < 8)
				throw 'Password at least 8 chars long';

			const response = await fetch('http://localhost:3001/api/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			});

			if (!response.ok) {
				if (response.status === 409) throw 'We got such a user already';
				throw "Couldn't create user. Try later again.";
			} else {
				setPopUpMsg(`user: ${email} has been created`);
				setTimeout(() => {
					navigation('/api/auth/login');
				}, 3000);
			}

			const data = await response.json();
			console.log('data: ', data);
		} catch (error) {
			setPopUpMsg(error as string);
		}
	}

	return (
		<>
			<PopUpWindow message={popUpMsg} />
			<form action={handleSubmit}>
				<label htmlFor="email">E-Mail</label>
				<input type="text" name="email" id="email" />
				<label htmlFor="pass">Pass</label>
				<input type="password" name="pass" id="pass" />
				<button
					type="submit"
					className="btn btn-dash"
					disabled={pending}
				>
					{pending ? 'Adding User...' : 'Add User'}
				</button>
			</form>
		</>
	);
};

export default SignUpForm;
