interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
  buttonLabel?: string; // Optional button label text
  onButtonClick?: () => void; // Optional click handler for the button
  buttonIcon?: React.ReactNode;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  buttonLabel,
  onButtonClick,
  buttonIcon
}) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      <div className="pt-3 px-4 flex items-center">
        <div>
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            {title}
          </h3>

        </div>

        {buttonLabel && onButtonClick && (
          <button
            onClick={onButtonClick}
            className="ml-6 px-3 py-1 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            {buttonIcon && <span className="text-lg">{buttonIcon}</span>}
            {buttonLabel}
          </button>
        )}
      </div>

      <div className="px-4">
        {desc && (
                    <p className="mt-1 text-md text-gray-500 dark:text-gray-400">
                      {desc}
                    </p>
                  )}
      </div>

      {/* Card Body */}
      <div className="p-4 mt-3 border-t-2 border-gray-100 dark:border-gray-800 sm:p-6 sm:pb-4">
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
