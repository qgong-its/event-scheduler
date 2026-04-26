import '@/styles/main.css';
import { Routes, Route, Outlet } from 'react-router';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';

const MainLayout = () => {
	return (
		<>
			<header></header>
			<h1>Main Layout</h1>
			<footer></footer>
		</>
	);
};

const Events = () => {
	return (
		<>
			<header></header>
			<h1>Events</h1>
			<footer></footer>
		</>
	);
};

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />} />
			<Route path="/api/events" element={<Events />} />
			<Route path="/api/events/:id" element={<Events />} />
			<Route path="/api/users" element={<SignUpPage />} />
			<Route path="/api/auth/login" element={<SignInPage />} />
		</Routes>
	);
}
