import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { useTheme } from '../hooks/useTheme';
import { MermaidRenderer } from './MermaidRenderer';

// @ts-ignore
import lightCss from 'github-markdown-css/github-markdown-light.css?raw';
// @ts-ignore
import darkCss from 'github-markdown-css/github-markdown-dark.css?raw';

interface MarkdownViewerProps {
    content: string;
    className?: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content, className = '' }) => {
    const { resolvedTheme } = useTheme();

    return (
        <div className={`markdown-body ${className}`} style={{ backgroundColor: 'transparent', padding: 0 }}>
            {/* Inject the exact GitHub specific markdown styling matching current theme context */}
            <style dangerouslySetInnerHTML={{ __html: resolvedTheme === 'dark' ? darkCss : lightCss }} />

            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                components={{
                    code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        if (!inline && match && match[1] === 'mermaid') {
                            return <MermaidRenderer chart={String(children).replace(/\n$/, '')} />;
                        }
                        return (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};
