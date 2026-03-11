const ButtonSubmit = ({
  loading,
  text,
}: {
  loading?: boolean;
  text: string;
}) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="px-4 py-2 bg-gradient-to-r hover:cursor-pointer from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-md text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Process..." : text}
    </button>
  );
};

export default ButtonSubmit;
