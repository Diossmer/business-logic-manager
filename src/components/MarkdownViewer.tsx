import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import { useTheme } from '../hooks/useTheme';
import{ MermaidRenderer }from './MermaidRenderer';
import rehypeSlug from 'rehype-slug';

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
                rehypePlugins={[rehypeRaw, rehypeSlug]}
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
                    },
                    a({ node, href, children, ...props }: any) {
                        const isInternalAnchor = href?.startsWith('#');

                        if (isInternalAnchor) {
                            return (
                                <a
                                    href={href}
                                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const targetId = href.substring(1);
                                        // Need to decode URI component in case of spaces/special chars in id
                                        try {
                                            const decodedTargetId = decodeURIComponent(targetId);
                                            const element = document.getElementById(decodedTargetId) || document.getElementById(targetId);
                                            if (element) {
                                                element.scrollIntoView({ behavior: 'smooth' });
                                            }
                                        } catch (e) {
                                            const element = document.getElementById(targetId);
                                            if (element) {
                                                element.scrollIntoView({ behavior: 'smooth' });
                                            }
                                        }
                                    }}
                                    {...props}
                                >
                                    {children}
                                </a>
                            );
                        }

                        return (
                            <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors" {...props}>
                                {children}
                            </a>
                        );
                    },
                    img({ node, src, alt, ...props }: any) {
                        // Automatically render videos for markdown image syntax that points to standard video formats
                        const isVideo = src && /\.(mp4|webm|ogg)$/i.test(src);
                        if (isVideo) {
                            return (
                                <video controls preload="metadata" className="max-w-full h-auto rounded-lg shadow-sm my-4" style={{ maxHeight: '600px' }}>
                                    <source src={src} type={`video/${src.split('.').pop()?.toLowerCase()}`} />
                                    Your browser does not support the video tag.
                                </video>
                            );
                        }
                        
                        // Standard Image / GIF parsing logic
                        return (
                            <img src={src} alt={alt} className="max-w-full h-auto rounded-lg shadow-sm" loading="lazy" {...props} />
                        );
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};
