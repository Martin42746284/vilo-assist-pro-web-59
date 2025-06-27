
const WelcomeBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-vilo-purple-400/20 to-vilo-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-vilo-pink-400/20 to-vilo-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>
  );
};

export default WelcomeBackground;
