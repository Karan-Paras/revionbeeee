interface ApiErrorProps {
  error: string;
}

export function ApiError({ error }: ApiErrorProps) {
  return (
    <div className="container mx-auto py-16 text-center md:px-0 px-10 bg-white rounded-xl shadow-lg min-h-[400px] flex flex-col items-center justify-center">
      <p className="text-lg text-gray-600">
        {error || "Something Went Wrong!"}
      </p>
    </div>
  );
}
