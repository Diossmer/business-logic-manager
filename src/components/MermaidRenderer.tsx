import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from '../hooks/useTheme';

mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
});

interface MermaidRendererProps {
    chart: string;
}

export const MermaidRenderer: React.FC<MermaidRendererProps> = ({ chart }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>('');
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        mermaid.initialize({
            theme: resolvedTheme === 'dark' ? 'dark' : 'default',
        });

        const renderChart = async () => {
            if (!chart) return;
            try {
                // Ensure unique ID for mermaid to render to in parallel scopes
                const id = `mermaid-${uuidv4()}`;
                const { svg } = await mermaid.render(id, chart);
                setSvg(svg);
            } catch (error) {
                console.error('Mermaid rendering failed', error);
                setSvg(`<div class="text-red-500 font-mono text-sm p-4 bg-red-50 dark:bg-red-900/10 rounded border border-red-200 dark:border-red-800">Syntax Error in Mermaid Diagram</div>`);
            }
        };
        renderChart();
    }, [chart, resolvedTheme]);

    return (
        <div
            ref={containerRef}
            className="mermaid-container my-6 flex justify-center bg-gray-50/50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700/50 overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
};
