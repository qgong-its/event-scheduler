type Props = {
	messages: string[];
};

const PopUpWindow = ({ messages }: Props) => {
	if (!messages.length) return null;

	return (
		<div className="popup">
			{messages.map((msg, index) => (
				<p key={index}>{msg}</p>
			))}
		</div>
	);
};

export default PopUpWindow;
