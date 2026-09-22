function IDE({ width, height, tabs, code, lineCount }) {
  return (
    <div
      style={{ width, height }}
      className="overflow-hidden rounded-md bg-[#1e1e1e] text-sm text-[#cccccc] shadow-lg"
    >
      {" "}
      <div className="flex flex-1 flex-col">
        {/* Tabs */}
        <div className="flex h-10 bg-[#252526]">
          {tabs.map((tab, index) => (
            <div
              key={tab.name ?? index}
              className={`flex items-center gap-2 px-4 ${
                tab.active
                  ? "border-t-2 border-blue-400 bg-[#1e1e1e]"
                  : "text-[#858585]"
              }`}
            >
              <span className="text-blue-400">{tab.language}</span>
              <span>{tab.name}</span>
              <span className="ml-2 text-[#858585]">×</span>
            </div>
          ))}
        </div>

        {/* Breadcrumb */}
        <div className="h-7 border-b border-[#333333] bg-[#1e1e1e] px-4 py-1 text-xs text-[#858585]">
          {tabs.find((tab) => tab.active)?.name}
        </div>

        {/* Code */}
        <div className="flex flex-1 overflow-hidden bg-[#1e1e1e] font-mono text-xs">
          {/* Line numbers */}
          <div className="w-10 select-none pr-2 pt-4 text-right leading-5 text-[#5a5a5a]">
            {Array.from({ length: lineCount }, (_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>

          {/* Code */}
          <pre className="pt-4 leading-5">{code}</pre>
        </div>
      </div>
    </div>
  );
}

export default IDE;
