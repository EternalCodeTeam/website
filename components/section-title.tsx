type SectionTitleProps = {
  title: string;
  description: string;
  id?: string;
};

export default function SectionTitle({ title, description, id }: Readonly<SectionTitleProps>) {
  return (
    <div className="flex flex-col items-center justify-between lg:flex-row" id={id}>
      <div className="lg:w-1/2">
        <h2 className="wrap-break-word mb-4 text-center font-extrabold text-4xl text-gray-900 tracking-tight lg:mr-8 lg:mb-0 lg:text-left dark:text-white">
          {title}
        </h2>
      </div>
      <div className="lg:w-1/2">
        <p className="wrap-break-word text-center font-light text-gray-500 text-xl lg:text-right dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}
