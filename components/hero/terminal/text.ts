const linesAndFormatting = [
    {
        line: "> eternalcode --help",
        formatting: "dark:text-gray-100 text-black-300 text-sm",
        endLine: true,
    },
    {
        line: "",
        formatting: "",
        endLine: true,
    },
    {
        line: "Help requested!",
        formatting: "text-slate-600 text-sm",
        endLine: true,
    },
    {
        line: "Try finding answers in our ",
        formatting: "text-slate-600 text-sm",
        endLine: false,
    },
    {
        line: "documentation",
        formatting: "text-blue-500 text-sm",
        special: true,
        url: "https://docs.eternalcode.pl/",
        endLine: true,
    },
    {
        line: "",
        formatting: "",
        endLine: true,
    },
    {
        line: "> eternalcode --tree",
        formatting: "dark:text-gray-100 text-black-300 text-sm",
        endLine: true,
    },
    {
        line: "",
        formatting: "",
        endLine: true,
    },
    {
        line: "├── 📁 ",
        formatting: "text-slate-600 text-sm",
        endLine: false,
    },
    {
        line: "Main site",
        formatting: "text-blue-500 text-sm",
        special: true,
        url: "/",
        endLine: true,
    },
    {
        line: "│   ├── 📁 ",
        formatting: "text-slate-600 text-sm",
        endLine: false,
    },
    {
        line: "Team",
        formatting: "text-blue-500 text-sm",
        special: true,
        url: "/team",
        endLine: true,
    },
    {
        line: "│   ├── 📁 ",
        formatting: "text-slate-600 text-sm",
        endLine: false,
    },
    {
        line: "Projects",
        formatting: "text-blue-500 text-sm",
        special: true,
        url: "/projects",
        endLine: true,
    },
    {
        line: "├── 📁 FAQ",
        formatting: "text-slate-600 text-sm",
        endLine: true,
    },
    {
        line: "│   │   ├── 📁 ",
        formatting: "text-slate-600 text-sm",
        endLine: false,
    },
    {
        line: "Docs",
        formatting: "text-blue-500 text-sm",
        special: true,
        locale: false,
        url: "https://docs.eternalcode.pl/",
        endLine: true,
    }

];

export default linesAndFormatting;
