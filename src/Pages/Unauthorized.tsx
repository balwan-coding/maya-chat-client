interface UnauthorizedPropes {}

const Unauthorized: React.FC<UnauthorizedPropes> = () => {
  return (
    <div className="h-[calc(100vh-60px)] bg-orange-400 flex items-center justify-center">
      <div className="text-center text-4xl font-bold text-white">
        <p>505 Internal Server Error</p>
        <p>Unauthorized</p>
      </div>
    </div>
  );
};

export default Unauthorized;
