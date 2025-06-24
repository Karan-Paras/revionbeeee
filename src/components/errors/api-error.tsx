interface ApiErrorProps {
  error: string;
}

export function ApiError({ error }: ApiErrorProps) {
  return (
    <div className="container mx-auto flex min-h-[400px] flex-col items-center justify-center bg-white px-10 py-16 text-center md:px-0">
      <p className="text-lg text-gray-600">
        {error || "Something Went Wrong!"}
      </p>
    </div>
  );
}
