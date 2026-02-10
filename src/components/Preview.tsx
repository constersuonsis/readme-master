import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PreviewProps {
  markdown: string;
}

const Preview: React.FC<PreviewProps> = ({ markdown }) => {
  const sanitizedMarkdown = useMemo(() => {
    return markdown;
  }, [markdown]);

  return (
    <div className="h-full overflow-auto overscroll-y-contain bg-white dark:bg-github-dark p-8 preview-scroll-container theme-transition">
      <div className="markdown-body">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({node, ...props}) => <a target="_blank" rel="noopener noreferrer" {...props} />,
            table: ({node, ...props}) => (
              <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
                <table {...props} />
              </div>
            ),
            code: ({node, className, children, ...props}) => {
              const isInline = !className;
              if (isInline) {
                return <code {...props}>{children}</code>;
              }
              return <code className={className} {...props}>{children}</code>;
            }
          }}
        >
          {sanitizedMarkdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Preview;
