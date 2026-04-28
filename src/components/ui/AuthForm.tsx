type AuthFormProps = {
  submitLabel: string;
  onSubmit: (email: string, password: string) => Promise<void>;
};

const AuthForm = ({ submitLabel, onSubmit }: AuthFormProps) => {
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');

    await onSubmit(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
    >
      <fieldset className="fieldset">
        <label className="label">Email</label>
        <input
          name="email"
          type="email"
          className="input validator"
          placeholder="Email"
          required
        />
        <p className="validator-hint hidden">Required</p>
      </fieldset>

      <label className="fieldset">
        <span className="label">Password</span>
        <input
          name="password"
          type="password"
          className="input validator"
          placeholder="Password"
          required
        />
        <span className="validator-hint hidden">Required</span>
      </label>

      <button type="submit" className="btn btn-neutral mt-4">
        {submitLabel}
      </button>
    </form>
  );
};

export default AuthForm;
