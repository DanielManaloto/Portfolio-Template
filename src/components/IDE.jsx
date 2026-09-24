function IDE({ width, height, tabs, code, lineCount }) {
  return (
    <div
      style={{ width, height, maxWidth: "100%" }}
      className="flex min-w-0 flex-col rounded-md bg-[#1e1e1e] text-sm text-[#cccccc] shadow-lg"
    >
      {/* Tabs */}
      {tabs.length > 0 && (
        <>
          <div className="flex h-10 shrink-0 overflow-x-auto bg-[#252526] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((tab, index) => (
              <div
                key={tab.name ?? index}
                className={`flex shrink-0 items-center gap-2 whitespace-nowrap px-4 ${
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
          <div className="h-7 shrink-0 truncate border-b border-[#333333] bg-[#1e1e1e] px-4 py-1 text-xs text-[#858585]">
            {tabs.find((tab) => tab.active)?.name}
          </div>
        </>
      )}

      {/* Code: one scroll container for both axes */}
      <div className="min-h-0 min-w-0 flex-1 overflow-auto bg-[#1e1e1e] font-mono text-xs">
        <div className="flex min-w-max">
          {/* Line numbers (stay pinned on horizontal scroll) */}
          <div className="sticky left-0 w-10 shrink-0 select-none bg-[#1e1e1e] pr-2 pt-4 text-right leading-5 text-[#5a5a5a]">
            {Array.from({ length: lineCount }, (_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>

          <pre className="pt-4 pr-4 leading-5">{code}</pre>
        </div>
      </div>
    </div>
  );
}

export default IDE;