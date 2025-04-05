const LoginShimmer = () => {
  return (
    <div className="p-6 max-w-md mx-auto mt-16 bg-gray-700 animate-pulse">
      <div className="text-2xl font-bold mb-6 text-center text-white">
        <div className="h-6 bg-gray-600 rounded w-1/3 mx-auto" />
      </div>

      <div className="bg-gray-800 shadow-md rounded-lg p-6 space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-600 rounded w-1/4" />
          <div className="h-10 bg-gray-700 rounded" />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-600 rounded w-1/4" />
          <div className="h-10 bg-gray-700 rounded" />
        </div>

        {/* Login Button */}
        <div className="h-10 bg-gray-600 rounded" />

        {/* Divider */}
        <div className="flex items-center">
          <div className="flex-1 h-px bg-gray-600" />
          <div className="w-6 h-4 bg-gray-600 mx-3 rounded" />
          <div className="flex-1 h-px bg-gray-600" />
        </div>

        {/* Google Login Button */}
        <div className="h-10 bg-gray-600 rounded" />

        {/* Signup Text */}
        <div className="h-4 bg-gray-600 rounded w-2/3 mx-auto mt-4" />
      </div>
    </div>
  );
};

export default LoginShimmer;
