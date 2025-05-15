interface ErrorBlockProps {
  errors?: string[];
}

export function ErrorBlock({ errors }: ErrorBlockProps) {
  return (
    !!errors && (
      <div className="rounded mt-4 p-2 bg-red-200 border border-red-400">
        {errors.join(", ")}
      </div>
    )
  );
}
